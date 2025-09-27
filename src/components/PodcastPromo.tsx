import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Headphones, ExternalLink } from "lucide-react";
import mamLogo from "@/assets/mam-logo.png";

const PodcastPromo = () => {
  const latestEpisodes = [
    {
      id: 1,
      title: "Breaking the Money Ceiling: Why Your Beliefs Keep You Broke",
      description: "Discover the hidden mental blocks preventing you from achieving financial freedom.",
      duration: "32 min",
      date: "3 days ago"
    },
    {
      id: 2,
      title: "The Discipline Paradox: Why Willpower Fails and Systems Win",
      description: "Learn why relying on motivation is killing your progress and what to do instead.",
      duration: "28 min",
      date: "1 week ago"
    },
    {
      id: 3,
      title: "From Stuck to Unstoppable: The 3 Phases of Masculine Growth",
      description: "The roadmap every man needs to evolve from where he is to where he wants to be.",
      duration: "35 min",
      date: "2 weeks ago"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="mb-6 text-accent">Listen to The Middle-Aged & Miserable Podcast</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join us weekly for real conversations about breaking through midlife stagnation, transforming your mindset, and creating the life you actually want. No fluff, just actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Subscribe on Spotify
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent text-accent hover:bg-accent hover:text-black"
              >
                Subscribe on Apple Podcasts
              </Button>
            </div>
          </div>

          {/* Podcast Visual */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold rounded-3xl blur-3xl opacity-20 scale-110" />
              <div className="relative bg-black border border-border rounded-3xl p-8 card-premium">
                <img 
                  src={mamLogo} 
                  alt="The Middle-Aged & Miserable Podcast" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastPromo;