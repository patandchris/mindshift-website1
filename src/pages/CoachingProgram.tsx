import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Users, TrendingUp, Clock, Target, Brain, Zap } from "lucide-react";
import mindshiftLogo from "@/assets/mindshift-logo.png";
const CoachingProgram = () => {
  const programWeeks = [{
    week: "Weeks 1-2",
    title: "Foundation & Assessment",
    description: "Identify limiting beliefs and establish your baseline"
  }, {
    week: "Weeks 3-4",
    title: "Belief Rewiring",
    description: "Begin the unconscious reprogramming process"
  }, {
    week: "Weeks 5-6",
    title: "Habit Installation",
    description: "Build success habits that compound over time"
  }, {
    week: "Weeks 7-8",
    title: "Focus Optimization",
    description: "Master attention and eliminate distractions"
  }, {
    week: "Weeks 9-10",
    title: "Integration & Acceleration",
    description: "Combine all elements for maximum impact"
  }, {
    week: "Weeks 11-12",
    title: "Mastery & Maintenance",
    description: "Lock in your transformation permanently"
  }];
  const outcomes = [{
    icon: Brain,
    title: "Eliminate Limiting Beliefs",
    description: "Identify and remove the unconscious blocks holding you back"
  }, {
    icon: Target,
    title: "Build Success Habits",
    description: "Install powerful daily routines that drive results"
  }, {
    icon: Zap,
    title: "Unlock Laser Focus",
    description: "Master your attention and eliminate distractions"
  }, {
    icon: TrendingUp,
    title: "Accelerate Growth",
    description: "Experience compound results in all areas of life"
  }];
  const testimonials = [{
    name: "Haroldo Chacon",
    title: "Structural Engineer",
    content: "By applying all aspects covered by this MindShift Coaching Program, I've noticed significant changes in the way I think, my actions and beliefs. This is bringing me unexpected results in areas that I never thought possible before. It's really changed my behaviors and my life!",
    result: "Started 2 new business ventures"
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-background">
          <div className="container-premium">
            <div className="flex flex-col items-center text-center">
              {/* Logo/Visual */}
              <div className="mb-6">
                <div className="bg-background rounded-3xl p-8 mx-0 px-[26px] py-0 my-[30px]">
                  <img src={mindshiftLogo} alt="The MindShift System" className="w-full max-w-2xl mx-auto" />
                </div>
              </div>

              {/* Content */}
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-accent mb-4 my-[30px]">
                  The MindShift System: 12-Week Unconscious Upgrade
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  The definitive program for ambitious professionals ready to eliminate limiting beliefs, 
                  build success habits, and unlock their true potential.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                  <Button variant="default" size="lg" className="bg-gradient-gold text-background font-bold hover:shadow-glow transition-all duration-300" onClick={() => window.open('https://calendly.com/patandchris/30min', '_blank')}>
                    Book a Discovery Call
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>12 Weeks to the New You</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="container-premium">
          <Separator className="bg-gradient-to-r from-transparent via-accent to-transparent h-[2px]" />
        </div>

        {/* Program Breakdown */}
        <section className="section-padding bg-background pt-8">
          <div className="container-premium">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                Your 12-Week Transformation Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A systematic approach to rewiring your unconscious mind and unlocking your full potential.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programWeeks.map((week, index) => <Card key={index} className="bg-card border border-border hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-accent">{week.week}</span>
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">{index + 1}</span>
                      </div>
                    </div>
                    <CardTitle className="text-foreground">{week.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{week.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="container-premium">
          <Separator className="bg-gradient-to-r from-transparent via-accent to-transparent h-[2px]" />
        </div>

        {/* Outcomes */}
        <section className="section-padding bg-background">
          <div className="container-premium">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                What You'll Achieve
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your mindset and unlock breakthrough results in every area of your life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4 border border-border">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-accent mb-3">{outcome.title}</h3>
                    <p className="text-muted-foreground">{outcome.description}</p>
                  </div>;
            })}
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="container-premium">
          <Separator className="bg-gradient-to-r from-transparent via-accent to-transparent h-[2px]" />
        </div>

        {/* Testimonials */}
        <section id="testimonials" className="section-padding bg-background">
          <div className="container-premium">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                Real Results from Real People
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how professionals like you have transformed their lives with The MindShift System.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {testimonials.map((testimonial, index) => <Card key={index} className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                      {testimonial.result}
                    </div>
                    <blockquote className="text-foreground mb-4 italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="container-premium">
          <Separator className="bg-gradient-to-r from-transparent via-accent to-transparent h-[2px]" />
        </div>

        {/* CTA Section */}
        <section className="section-padding bg-background">
          <div className="container-premium">
            <Card className="max-w-2xl mx-auto bg-secondary border border-border">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-accent mb-6">
                  Book a free MindShift Breakthrough Session
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                  Uncover what's really holding you back and get a clear plan to take back control of your life, career and success!
                </p>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="group bg-gradient-gold text-background font-bold hover:shadow-glow transition-all duration-300"
                  onClick={() => window.open('https://calendly.com/patandchris/30min', '_blank')}
                >
                  Book a Discovery Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default CoachingProgram;