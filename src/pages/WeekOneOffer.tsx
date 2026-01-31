import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, Moon, Target, Sparkles } from "lucide-react";
import mindshiftLogo from "@/assets/mindshift-logo-new.png";

const WeekOneOffer = () => {
  const weekOneIncludes = [
    {
      title: "A Guide to Beliefs",
      description: "Understand how beliefs are formed, why they operate automatically, and how they silently dictate your confidence, income, and results.",
      icon: Brain
    },
    {
      title: "Guided Hypnosis",
      description: "Begin upgrading your unconscious programming at the point where resistance is lowest, allowing new empowering beliefs to take hold naturally.",
      icon: Moon
    },
    {
      title: "Belief Awareness Exercise",
      description: "Simple, structured questions designed to expose where you may be unknowingly limiting your own success.",
      icon: Target
    },
    {
      title: "NLP Change Pattern",
      description: "A Neuro Linguistic Programming change pattern designed to rewire your unconscious programming towards success.",
      icon: Sparkles
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
      <Header hideNavAndCta />
      
      <main className="pt-24">
        {/* CTA Section - Moved to Top */}
        <section className="py-10">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 tracking-wide">
                <p className="text-2xl md:text-3xl font-bold text-foreground">FOR A LIMITED TIME ONLY !</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">GET WEEK 1 OF THE MINDSHIFT SYSTEM 12 WEEK PROGRAM</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground">FREE</p>
              </div>

              <Button 
                variant="premium" 
                size="xl"
                className="mb-4"
                onClick={() => window.location.href = '/week-one-access'}
              >
                Start Week One Now
              </Button>
              
              <p className="text-sm text-muted-foreground">
                This limited-time offer will be removed soon. No long-term commitment required.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Section with MindShift Logo */}
        <section className="py-2">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto text-center">
              {/* MindShift Logo */}
              <div className="flex justify-center">
                <div className="px-8 py-2">
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
        <section className="py-6 bg-card/50">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-muted-foreground">
                During week 1, you will begin the process of:
              </h3>
              
              <div className="max-w-xl mx-auto space-y-4 mb-8">
                {beliefProcessPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-lg text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* What's Included Section */}
        <section className="py-14">
          <div className="container-premium">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-muted-foreground">
                What's Included in <span className="text-accent">Week 1</span>?
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
                          <h3 className="text-xl font-bold mb-3 text-accent">{item.title}</h3>
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

        {/* Bottom CTA Section */}
        <section className="py-14">
          <div className="container-premium">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-bold text-muted-foreground mb-8">
                Click below for your free access to week 1
              </p>
              
              <Button 
                variant="premium" 
                size="xl"
                onClick={() => window.location.href = '/week-one-access'}
              >
                Start Week One Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer minimal />
    </div>
  );
};

export default WeekOneOffer;
