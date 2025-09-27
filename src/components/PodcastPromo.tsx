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
          {/* Podcast Info */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Headphones className="h-4 w-4 mr-2" />
              Weekly Podcast
            </div>
            
            <h2 className="mb-6">
              The <span className="text-accent">Middle-Aged & Miserable</span> Podcast
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Raw, unfiltered conversations about breaking through the barriers that keep ambitious men stuck in mediocrity.
            </p>

            {/* Podcast Logo */}
            <div className="mb-8">
              <img
                src={mamLogo}
                alt="The Middle-Aged & Miserable Podcast"
                className="h-24 w-auto"
              />
            </div>

            {/* Listen Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="lg" className="group">
                <Play className="mr-2 h-5 w-5" />
                Listen to Latest Episode
              </Button>
              <Button variant="outline" size="lg" className="group">
                <ExternalLink className="mr-2 h-5 w-5" />
                View on Spotify
              </Button>
            </div>

            {/* Subscribe CTA */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-accent font-medium mb-2">
                Never miss an episode
              </p>
              <p className="text-sm text-muted-foreground">
                Subscribe on your favorite platform and get notified when new episodes drop.
              </p>
            </div>
          </div>

          {/* Latest Episodes */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Latest Episodes</h3>
            <div className="space-y-4">
              {latestEpisodes.map((episode) => (
                <Card key={episode.id} className="card-premium group hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                        <Play className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {episode.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {episode.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{episode.duration}</span>
                          <span>•</span>
                          <span>{episode.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastPromo;