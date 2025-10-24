import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import mamLogo from "@/assets/mam-logo.png";
import { useState } from "react";
import { usePodcastFeed } from "@/hooks/usePodcastFeed";
import { Loader2 } from "lucide-react";

const Podcast = () => {
  const { episodes, loading, error } = usePodcastFeed('https://feeds.buzzsprout.com/2418156.rss');
  const [displayCount, setDisplayCount] = useState(6);
  return <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
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
              <p className="text-lg text-gray-300 mb-4 max-w-3xl">
                Raw, unfiltered conversations about breaking through the barriers that keep ambitious people stuck in mediocrity. No fluff. No BS. Just real talk for those ready to rise.
              </p>
            </div>
          </div>
        </section>

        {/* Subscribe Buttons */}
        <section className="py-4 bg-black">
          <div className="container-premium">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('https://open.spotify.com/show/54LfdBGDiJrJtPSRAFVWyV?si=e1d3705155764e1a', '_blank')}
              >
                Listen on Spotify
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent text-accent hover:bg-accent hover:text-black"
                onClick={() => window.open('https://podcasts.apple.com/us/podcast/the-middle-aged-miserable-podcast/id1780040120', '_blank')}
              >
                Listen on Apple Podcasts
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('https://www.youtube.com/@patandchris', '_blank')}
              >
                Watch on YouTube
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Episodes Section */}
        <section className="py-6 bg-black">
          <div className="container-premium">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-accent">
              Latest Episodes
            </h2>
            
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Failed to load podcast feed. Please try again later.</p>
              </div>
            )}
            
            {/* Episodes Grid */}
            {!loading && !error && episodes.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                  {episodes.slice(0, displayCount).map((episode) => (
                    <a
                      key={episode.id}
                      href={episode.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-black border border-gray-800 rounded-xl p-4 transition-transform hover:-translate-y-1 no-underline"
                    >
                      <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                        <img
                          src={episode.thumbnail || '/mam-logo-initials.png'}
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg leading-tight mb-2 text-white">
                        {episode.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-3">
                        {episode.description}
                      </p>
                      <button className="bg-gradient-gold text-black font-semibold py-2 px-4 rounded-lg hover:shadow-glow transition-all">
                        Listen Now
                      </button>
                    </a>
                  ))}
                </div>
                
                {/* Load More Button */}
                {displayCount < episodes.length && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                      onClick={() => setDisplayCount(episodes.length)}
                    >
                      Click for More Episodes
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Podcast;