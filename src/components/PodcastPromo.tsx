import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Headphones, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import mamLogo from "@/assets/mam-logo.png";
const PodcastPromo = () => {
  const latestEpisodes = [{
    id: 1,
    title: "Breaking the Money Ceiling: Why Your Beliefs Keep You Broke",
    description: "Discover the hidden mental blocks preventing you from achieving financial freedom.",
    duration: "32 min",
    date: "3 days ago"
  }, {
    id: 2,
    title: "The Discipline Paradox: Why Willpower Fails and Systems Win",
    description: "Learn why relying on motivation is killing your progress and what to do instead.",
    duration: "28 min",
    date: "1 week ago"
  }, {
    id: 3,
    title: "From Stuck to Unstoppable: The 3 Phases of Masculine Growth",
    description: "The roadmap every man needs to evolve from where he is to where he wants to be.",
    duration: "35 min",
    date: "2 weeks ago"
  }];
  return <section className="section-padding">
      <div className="container-premium">
        <div className="text-center max-w-3xl mx-auto">
          {/* Podcast Visual */}
          <div className="flex justify-center mb-8">
            <Link to="/podcast" className="block">
              <div className="bg-background rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <img src={mamLogo} alt="The Middle-Aged & Miserable Podcast" className="w-full max-w-md mx-auto" />
              </div>
            </Link>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="mb-6 text-accent">Listen to The Middle-Aged & Miserable Podcast</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join us weekly for real conversations about breaking through midlife stagnation, transforming your mindset, and creating the life you actually want. No fluff, just actionable insights.
            </p>
          </div>

          {/* Listen Now Button */}
          <div className="flex justify-center">
            <Link to="/podcast" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button 
                className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300" 
                size="lg"
              >
                Listen Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default PodcastPromo;