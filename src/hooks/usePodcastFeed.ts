import { useEffect, useState } from 'react';
import Parser from 'rss-parser';

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

const RSS_FEED_URL = 'https://feeds.buzzsprout.com/2418156.rss';

export const usePodcastFeed = () => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastFeed = async () => {
      try {
        setLoading(true);
        const parser = new Parser({
          customFields: {
            item: [
              ['itunes:duration', 'duration'],
              ['itunes:episode', 'episode'],
              ['itunes:image', 'image'],
            ],
          },
        });

        // Use a CORS proxy for RSS feed
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_FEED_URL)}`;
        const feed = await parser.parseURL(proxyUrl);

        const parsedEpisodes: PodcastEpisode[] = feed.items.map((item: any, index: number) => {
          // Parse duration from seconds or HH:MM:SS format
          let formattedDuration = '0:00';
          if (item.duration) {
            const duration = item.duration as string;
            if (duration.includes(':')) {
              formattedDuration = duration;
            } else {
              const seconds = parseInt(duration);
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              formattedDuration = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
          }

          return {
            id: item.guid || `episode-${index}`,
            title: item.title || 'Untitled Episode',
            description: item.contentSnippet || item.content || '',
            duration: formattedDuration,
            date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : '',
            episode: parseInt(item.episode as string) || index + 1,
            audioUrl: item.enclosure?.url || '',
            thumbnail: item.image?.['@_href'] || undefined,
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
  }, []);

  return { episodes, loading, error };
};
