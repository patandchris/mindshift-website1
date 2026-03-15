import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  episode: number;
  audioUrl: string;
  thumbnail?: string;
}

const getElementText = (element: Element | null, tagName: string): string => {
  return element?.querySelector(tagName)?.textContent || '';
};

const getElementAttribute = (element: Element | null, tagName: string, attribute: string): string => {
  return element?.querySelector(tagName)?.getAttribute(attribute) || '';
};

const stripHtmlTags = (html: string): string => {
  // Use DOMParser for safe HTML text extraction - avoids innerHTML XSS risks
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const usePodcastFeed = (feedUrl: string) => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastFeed = async () => {
      try {
        setLoading(true);
        
        // Use edge function to fetch the podcast feed
        const { data, error: fnError } = await supabase.functions.invoke('fetch-podcast-feed', {
          body: { feedUrl }
        });
        
        if (fnError) {
          throw new Error(fnError.message);
        }
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        const xmlText = data.xml;
        
        // Parse XML using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        const parsedEpisodes: PodcastEpisode[] = Array.from(items).map((item, index) => {
          // Parse duration from seconds or HH:MM:SS format
          const durationText = getElementText(item, 'itunes\\:duration') || getElementText(item, 'duration');
          let formattedDuration = '0:00';
          if (durationText) {
            if (durationText.includes(':')) {
              formattedDuration = durationText;
            } else {
              const seconds = parseInt(durationText);
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              formattedDuration = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
          }

          const episodeNumber = getElementText(item, 'itunes\\:episode') || getElementText(item, 'episode');
          const pubDate = getElementText(item, 'pubDate');
          const thumbnail = getElementAttribute(item, 'itunes\\:image', 'href') || getElementAttribute(item, 'image', 'href');

          return {
            id: getElementText(item, 'guid') || `episode-${index}`,
            title: getElementText(item, 'title') || 'Untitled Episode',
            description: stripHtmlTags(getElementText(item, 'description')) || '',
            duration: formattedDuration,
            date: pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : '',
            episode: parseInt(episodeNumber) || (items.length - index),
            audioUrl: getElementAttribute(item, 'enclosure', 'url'),
            thumbnail: thumbnail || undefined,
          };
        });

        // Sort by episode number (newest first)
        parsedEpisodes.sort((a, b) => b.episode - a.episode);

        setEpisodes(parsedEpisodes);
        setError(null);
      } catch (err) {
        console.error('Error fetching podcast feed:', err);
        setError('Failed to load podcast episodes');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastFeed();
  }, [feedUrl]);

  return { episodes, loading, error };
};
