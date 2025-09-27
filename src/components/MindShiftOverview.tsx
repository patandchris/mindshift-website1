import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, Target, Zap, ArrowRight } from "lucide-react";

const MindShiftOverview = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Eliminate Limiting Beliefs",
      description: "Identify and destroy the mental barriers holding you back from success"
    },
    {
      icon: Target,
      title: "Build Powerful Habits",
      description: "Create unstoppable routines that drive consistent progress toward your goals"
    },
    {
      icon: Zap,
      title: "Unlock Laser Focus",
      description: "Develop the mental clarity to prioritize what matters and execute with precision"
    }
  ];

  const outcomes = [
    "Break through your money ceiling and financial limitations",
    "Develop unshakeable confidence in high-pressure situations",
    "Master the art of consistent daily progress",
    "Create systems that generate results while you sleep",
    "Transform your relationship with failure and setbacks",
    "Build the mindset of a high-performing entrepreneur"
  ];

  return (
    <section className="section-padding" id="coaching">
      <div className="container-premium">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            12-Week Transformation Program
          </div>
          <h2 className="mb-6">
            The <span className="text-accent">MindShift System</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The proven system that's helped hundreds of ambitious men break through their barriers and achieve breakthrough results in just 12 weeks.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-premium text-center group hover:scale-105">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Program Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Outcomes List */}
          <div>
            <h3 className="text-2xl font-bold mb-8">What You'll Achieve:</h3>
            <div className="space-y-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="card-premium text-center">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform?</h3>
              <p className="text-muted-foreground mb-8">
                Join the elite group of men who've made the decision to break through their limitations and create the life they truly want.
              </p>
              <div className="space-y-4">
                <Button variant="hero" size="xl" className="w-full group">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Book a Strategy Call
                </Button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                Limited spots available • Next cohort starts soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindShiftOverview;