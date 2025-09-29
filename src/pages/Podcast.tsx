import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink, Download, Share, Calendar, Clock } from "lucide-react";
import mamLogo from "@/assets/mam-logo.png";
import mamInitialsLogo from "@/assets/mam-initials-logo.png";
const Podcast = () => {
  const episodes = [{
    id: 1,
    title: "Breaking the Money Ceiling: Why Your Beliefs Keep You Broke",
    description: "In this episode, we dive deep into the unconscious beliefs that create financial limitations. Discover the hidden mental blocks preventing you from achieving true financial freedom and learn the exact process to rewire your money mindset.",
    duration: "32:15",
    date: "Mar 20, 2024",
    episode: 47,
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop"
  }, {
    id: 2,
    title: "The Discipline Paradox: Why Willpower Fails and Systems Win",
    description: "Stop relying on motivation and willpower. Learn why systems-based thinking is the key to consistent results and how to build unbreakable habits that drive success.",
    duration: "28:42",
    date: "Mar 13, 2024",
    episode: 46,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop"
  }, {
    id: 3,
    title: "From Stuck to Unstoppable: The 3 Phases of Masculine Growth",
    description: "Every man goes through three distinct phases of growth. Understanding where you are and what comes next is crucial for breakthrough results.",
    duration: "35:18",
    date: "Mar 6, 2024",
    episode: 45,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop"
  }, {
    id: 4,
    title: "The Modern Man's Dilemma: Comfort vs. Growth",
    description: "Society has made men soft. We explore the tension between comfort and growth, and why choosing the hard path is the only way to real fulfillment.",
    duration: "41:23",
    date: "Feb 27, 2024",
    episode: 44,
    thumbnail: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=225&fit=crop"
  }, {
    id: 5,
    title: "Building Your Inner Circle: The Power of High-Value Relationships",
    description: "You become who you spend time with. Learn how to audit your relationships and build a network that elevates your thinking and results.",
    duration: "29:56",
    date: "Feb 20, 2024",
    episode: 43,
    thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop"
  }, {
    id: 6,
    title: "The Masculinity Crisis: Reclaiming Your Power in a Soft World",
    description: "Traditional masculinity isn't toxic—it's essential. We discuss how to embody healthy masculine traits in a world that's trying to make you weak.",
    duration: "38:14",
    date: "Feb 13, 2024",
    episode: 42,
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop"
  }];
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
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-card/50">
          <div className="container-premium">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              {/* Podcast Artwork */}
              <div className="mb-8">
                <div className="bg-background rounded-3xl p-8 mx-[4px] my-[50px]">
                  <img src={mamLogo} alt="The Middle-Aged & Miserable Podcast" className="w-full max-w-sm mx-auto" />
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">Bi-Weekly Podcast</div>
                
                <h1 className="mb-6 text-5xl font-bold md:text-5xl">
                  The <span className="text-accent">Middle-Aged & Miserable</span> Podcast
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Raw, unfiltered conversations about breaking through the barriers that keep ambitious men stuck in mediocrity. No fluff, no BS—just actionable insights for the man who's ready to level up.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">47</div>
                    <div className="text-sm text-muted-foreground">Episodes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">50K+</div>
                    <div className="text-sm text-muted-foreground">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">4.9</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="default" size="lg" className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300">
                    <span className="mr-2 text-lg">🎵</span>
                    Subscribe on Spotify
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-black">
                    <span className="mr-2 text-lg">🎧</span>
                    Subscribe on Apple Podcasts
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Episode Featured */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Latest <span className="text-accent">Episode</span>
              </h2>
            </div>

            <Card className="card-premium max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                   {/* Episode Art */}
                   <div className="relative aspect-video rounded-lg overflow-hidden group">
                     <img src={mamInitialsLogo} alt={episodes[0].title} className="w-full h-full object-contain bg-black" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                       <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg cursor-pointer">
                         <Play className="h-10 w-10 text-accent-foreground ml-1" />
                       </div>
                     </div>
                   </div>

                  {/* Episode Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="bg-accent/10 px-3 py-1 rounded-full text-accent font-medium">
                        Episode {episodes[0].episode}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{episodes[0].date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{episodes[0].duration}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{episodes[0].title}</h3>
                    <p className="text-muted-foreground mb-6">{episodes[0].description}</p>

                     <div className="flex flex-col sm:flex-row gap-4">
                       <Button variant="default" size="lg" className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300">
                         <Play className="mr-2 h-5 w-5" />
                         Play Episode
                       </Button>
                       <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-black">
                         <Download className="mr-2 h-5 w-5" />
                         Download
                       </Button>
                       <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-accent">
                         <Share className="mr-2 h-5 w-5" />
                         Share
                       </Button>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Episodes */}
        <section className="section-padding bg-card/50">
          <div className="container-premium">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">
                All <span className="text-accent">Episodes</span>
              </h2>
               <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black">
                 Load More Episodes
               </Button>
            </div>

            <div className="grid gap-6">
              {episodes.slice(1).map(episode => <Card key={episode.id} className="card-premium group hover:scale-[1.01] cursor-pointer">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      {/* Episode Thumbnail */}
                       <div className="relative aspect-video rounded-lg overflow-hidden">
                         <img src={mamInitialsLogo} alt={episode.title} className="w-full h-full object-contain bg-black" />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                           <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Play className="h-6 w-6 text-accent-foreground ml-1" />
                           </div>
                         </div>
                       </div>

                      {/* Episode Details */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-2 text-sm text-muted-foreground">
                          <span className="bg-accent/10 px-2 py-1 rounded text-accent font-medium">
                            Ep {episode.episode}
                          </span>
                          <span>{episode.date}</span>
                          <span>{episode.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                          {episode.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {episode.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Podcast;