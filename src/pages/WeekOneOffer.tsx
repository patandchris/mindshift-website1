import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, Moon, Target, Lightbulb } from "lucide-react";
import mindshiftLogo from "@/assets/mindshift-logo-new.png";
import patChrisLogo from "@/assets/pat-chris-logo.png";

const WeekOneOffer = () => {
  const weekOneIncludes = [
    {
      title: "Success Fundamentals: Beliefs",
      description: "Understand how beliefs are formed, why they operate automatically, and how they silently dictate your confidence, income, and results.",
      icon: Brain
    },
    {
      title: "Guided Hypnosis (Night and Day Versions)",
      description: "Begin upgrading your unconscious programming at the point where resistance is lowest, allowing new empowering beliefs to take hold naturally.",
      icon: Moon
    },
    {
      title: "Belief Awareness Exercises",
      description: "Simple, structured questions designed to expose where you may be unknowingly limiting your own success.",
      icon: Target
    },
    {
      title: "Mindset Focus for the Week",
      description: "A practical awareness shift that trains you to notice limiting self-talk, internal resistance, and unconscious patterns as they occur.",
      icon: Lightbulb
    }
  ];

  const beliefProcessPoints = [
    "Identifying unconscious beliefs that cap your success",
    "Understanding where those beliefs were formed",
    "Loosening the certainty that keeps those beliefs in place",
    "Installing more empowering internal standards"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section with Logos */}
        <section className="py-12">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto text-center">
              {/* Pat & Chris Logo */}
              <div className="flex justify-center mb-8">
                <img
                  src={patChrisLogo}
                  alt="Pat & Chris Coaching"
                  className="h-20 w-auto"
                />
              </div>
              
              {/* MindShift Logo */}
              <div className="flex justify-center mb-8">
                <div className="p-12 px-[36px] my-0 mx-[100px] py-[48px]">
                  <img
                    src={mindshiftLogo}
                    alt="The MindShift System"
                    className="w-full max-w-2xl mx-auto md:max-w-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Week One Does Section */}
        <section className="py-12 bg-card/50">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                What Week One of <span className="text-accent">MindShift</span> Does
              </h2>
              
              <p className="text-xl text-muted-foreground text-center mb-8">
                This week is focused on beliefs — because beliefs shape everything else.
              </p>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                During Week One, you will begin the process of:
              </h3>
              
              <div className="space-y-4 mb-8">
                {beliefProcessPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-lg text-foreground">{point}</p>
                  </div>
                ))}
              </div>

              {/* This is not positive thinking box */}
              <Card className="bg-[hsl(225_44%_12%)] border-accent/30 mt-12">
                <CardContent className="p-8 text-center">
                  <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    This is not positive thinking.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-accent">
                    This is unconscious reprogramming.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* What's Included Section */}
        <section className="py-16">
          <div className="container-premium">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                What's Included in <span className="text-accent">Week One</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {weekOneIncludes.map((item, index) => (
                  <Card key={index} className="bg-[hsl(225_44%_12%)] border-border hover:border-accent/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* CTA Section */}
        <section className="py-16 bg-card/50">
          <div className="container-premium">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Week One of <span className="text-accent">MindShift</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-4">
                This is where change actually begins.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Not by trying harder — but by upgrading what's running beneath the surface.
              </p>

              <div className="bg-background border border-accent/20 rounded-xl p-8 mb-8">
                <p className="text-lg text-foreground mb-4">
                  For a limited time only, Week One of the MindShift System is available as a standalone entry point.
                </p>
                <p className="text-muted-foreground">
                  If you are ready to stop operating from old limits and start building from a stronger internal foundation, begin with Week One now.
                </p>
              </div>

              <Button 
                variant="hero" 
                size="xl"
                className="mb-4"
                onClick={() => window.open('https://calendly.com/chris-the-mindshift-system/discovery-call', '_blank')}
              >
                Start Week One Now
              </Button>
              
              <p className="text-sm text-muted-foreground">
                This limited-time offer will be removed soon. No long-term commitment required.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WeekOneOffer;
