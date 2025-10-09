import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink, Download, Share, Calendar, Clock, Loader2, AlertCircle } from "lucide-react";
import mamLogo from "@/assets/mam-logo.png";
import mamInitialsLogo from "@/assets/mam-initials-logo.png";
import { usePodcastFeed } from "@/hooks/usePodcastFeed";

const Podcast = () => {
  const { episodes: rssEpisodes, loading, error } = usePodcastFeed();
  // Static fallback episodes
  const staticEpisodes = [{
    id: 1,
    title: "Breaking the Money Ceiling: Why Your Beliefs Keep You Broke",
    description: "In this episode, we dive deep into the unconscious beliefs that create financial limitations. Discover the hidden mental blocks preventing you from achieving true financial freedom and learn the exact process to rewire your money mindset.",
    duration: "32:15",
    date: "Mar 20, 2024",
    episode: 47,
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop",
    audioUrl: ""
  }, {
    id: 2,
    title: "The Discipline Paradox: Why Willpower Fails and Systems Win",
    description: "Stop relying on motivation and willpower. Learn why systems-based thinking is the key to consistent results and how to build unbreakable habits that drive success.",
    duration: "28:42",
    date: "Mar 13, 2024",
    episode: 46,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop",
    audioUrl: ""
  }, {
    id: 3,
    title: "From Stuck to Unstoppable: The 3 Phases of Masculine Growth",
    description: "Every man goes through three distinct phases of growth. Understanding where you are and what comes next is crucial for breakthrough results.",
    duration: "35:18",
    date: "Mar 6, 2024",
    episode: 45,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
    audioUrl: ""
  }, {
    id: 4,
    title: "The Modern Man's Dilemma: Comfort vs. Growth",
    description: "Society has made men soft. We explore the tension between comfort and growth, and why choosing the hard path is the only way to real fulfillment.",
    duration: "41:23",
    date: "Feb 27, 2024",
    episode: 44,
    thumbnail: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=225&fit=crop",
    audioUrl: ""
  }, {
    id: 5,
    title: "Building Your Inner Circle: The Power of High-Value Relationships",
    description: "You become who you spend time with. Learn how to audit your relationships and build a network that elevates your thinking and results.",
    duration: "29:56",
    date: "Feb 20, 2024",
    episode: 43,
    thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop",
    audioUrl: ""
  }, {
    id: 6,
    title: "The Masculinity Crisis: Reclaiming Your Power in a Soft World",
    description: "Traditional masculinity isn't toxic—it's essential. We discuss how to embody healthy masculine traits in a world that's trying to make you weak.",
    duration: "38:14",
    date: "Feb 13, 2024",
    episode: 42,
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop",
    audioUrl: ""
  }];

  // Use RSS episodes if available, otherwise fallback to static
  const episodes = rssEpisodes.length > 0 ? rssEpisodes : staticEpisodes;
  const isUsingRSS = rssEpisodes.length > 0;

  const platformLinks = [{
    name: "Spotify",
    href: "#",
    icon: "🎵"
  }, {
    name: "Apple Podcasts",
    href: "#",
    icon: "🎧"
  }, {
    name: "Google Podcasts",
    href: "#",
    icon: "🎙️"
  }, {
    name: "YouTube",
    href: "#",
    icon: "📺"
  }];
  return <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* RSS Feed Status Banner */}
        {loading && (
          <div className="bg-accent/10 border-b border-accent/20 py-3">
            <div className="container-premium flex items-center justify-center gap-2 text-accent">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading latest episodes from RSS feed...</span>
            </div>
          </div>
        )}
        {error && !isUsingRSS && (
          <div className="bg-destructive/10 border-b border-destructive/20 py-3">
            <div className="container-premium flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">RSS feed temporarily unavailable. Showing static content as fallback.</span>
            </div>
          </div>
        )}
        {isUsingRSS && (
          <div className="bg-green-500/10 border-b border-green-500/20 py-3">
            <div className="container-premium flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-sm">✓ Live episodes from RSS feed</span>
            </div>
          </div>
        )}
        {/* Hero Section */}
        <section className="py-12 bg-black">
          <div className="container-premium">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Podcast Logo */}
              <div className="mb-8">
                <img src={mamLogo} alt="The Middle-Aged & Miserable Podcast" className="w-full max-w-md mx-auto" />
              </div>

              {/* Title */}
              <h1 className="mb-4 text-4xl font-bold md:text-5xl text-accent">
                The Middle-Aged & Miserable Podcast
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-gray-300 mb-12 max-w-3xl">
                Raw, unfiltered conversations about breaking through the barriers that keep ambitious people stuck in mediocrity. No fluff. No BS. Just real talk for those ready to rise.
              </p>
            </div>
          </div>
        </section>

        {/* Episodes Grid */}
        <section className="py-12 bg-black">
          <div className="container-premium">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-4" />
                <p className="text-gray-300">Loading episodes...</p>
              </div>
            ) : error && !isUsingRSS ? (
              <div className="text-center py-12">
                <p className="text-gray-300 mb-6">
                  Podcast feed temporarily unavailable — please listen directly on Spotify, Apple Podcasts, or YouTube.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {episodes.slice(0, 6).map(episode => (
                  <Card key={episode.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-accent/50 transition-all">
                    <CardContent className="p-0">
                      {/* Episode Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={episode.thumbnail || mamInitialsLogo} 
                          alt={episode.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Episode Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                          {episode.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                          {episode.description}
                        </p>
                        
                        {isUsingRSS && episode.audioUrl ? (
                          <Button 
                            variant="default" 
                            size="sm"
                            className="w-full bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all"
                            onClick={() => window.open(episode.audioUrl, '_blank')}
                          >
                            Listen Now
                          </Button>
                        ) : (
                          <Button 
                            variant="default" 
                            size="sm"
                            className="w-full bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all"
                          >
                            Listen Now
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Subscribe Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('https://open.spotify.com/show/54LfdBGDiJrJtPSRAFVWyV?si=e1d3705155764e1a', '_blank')}
              >
                Subscribe on Spotify
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent text-accent hover:bg-accent hover:text-black"
              >
                Subscribe on Apple Podcasts
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('http://www.youtube.com/@patandchris', '_blank')}
              >
                Subscribe on YouTube
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Podcast;