import { useEffect, useState } from 'react';

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

export const usePodcastFeed = (feedUrl: string) => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastFeed = async () => {
      try {
        setLoading(true);
        
        // Use a CORS proxy for RSS feed
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
        const response = await fetch(proxyUrl);
        const xmlText = await response.text();
        
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
            description: getElementText(item, 'description') || '',
            duration: formattedDuration,
            date: pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : '',
            episode: parseInt(episodeNumber) || index + 1,
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
