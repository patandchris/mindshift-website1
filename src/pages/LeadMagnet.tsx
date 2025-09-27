import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Mail, Lock, Gift } from "lucide-react";
import mindshiftLogo from "@/assets/mindshift-logo.png";

const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email marketing platform
    console.log("Email submitted:", email);
    setIsSubmitted(true);
  };

  const benefits = [
    "Identify and eliminate the 7 most common money ceiling beliefs",
    "Use the 'Belief Audit' worksheet to uncover your hidden limitations",
    "Apply the 'Neural Rewiring' technique to install new success patterns",
    "Follow the 21-day implementation roadmap for lasting change",
    "Access bonus audio training: 'The Millionaire Mindset Activation'"
  ];

  const whatYouGet = [
    {
      title: "The MindShift System PDF Guide",
      description: "Complete 47-page system breakdown with step-by-step instructions",
      icon: Download
    },
    {
      title: "Belief Audit Worksheet",
      description: "Identify exactly which beliefs are holding you back from success",
      icon: CheckCircle
    },
    {
      title: "Neural Rewiring Audio Training",
      description: "25-minute guided audio session to install new success programming",
      icon: Gift
    },
    {
      title: "21-Day Implementation Plan",
      description: "Daily action steps to ensure you get real results, not just information",
      icon: CheckCircle
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-24">
          <section className="section-padding">
            <div className="container-premium">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-10 w-10 text-accent" />
                </div>
                
                <h1 className="text-4xl font-bold mb-6">
                  Check Your <span className="text-accent">Email!</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Your MindShift System toolkit is on its way to your inbox. Make sure to check your spam folder and add us to your contacts.
                </p>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-accent mb-2">What happens next?</h3>
                  <div className="text-left space-y-2 text-sm text-muted-foreground">
                    <p>✓ Download arrives in your inbox within 5 minutes</p>
                    <p>✓ Start with the Belief Audit worksheet</p>
                    <p>✓ Listen to the Neural Rewiring audio session</p>
                    <p>✓ Follow the 21-day implementation plan</p>
                  </div>
                </div>

                <Button variant="hero" size="lg" asChild>
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                  <Gift className="h-4 w-4 mr-2" />
                  Free Resource
                </div>
                
                <h1 className="mb-6">
                  Break Your <span className="text-accent">Money Ceiling</span> Toolkit
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  The same system that's helped hundreds of ambitious men eliminate their financial limitations and break through to new income levels.
                </p>

                {/* Value Proposition */}
                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lock className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold mb-2">Usually $297 • Today: FREE</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete system including PDF guide, worksheets, audio training, and implementation roadmap.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="text-left space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opt-in Form */}
              <div className="card-premium">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <img
                      src={mindshiftLogo}
                      alt="The MindShift System"
                      className="h-16 mx-auto mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-4">
                      Get Instant Access
                    </h3>
                    <p className="text-muted-foreground">
                      Enter your email below and get immediate access to the complete toolkit.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-center"
                      />
                    </div>
                    
                    <Button variant="hero" size="lg" type="submit" className="w-full">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Me The Toolkit
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="section-padding bg-card/50">
          <div className="container-premium">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">
                What's <span className="text-accent">Inside</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to identify, eliminate, and replace the beliefs that are keeping you stuck at your current income level.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whatYouGet.map((item, index) => (
                <Card key={index} className="card-premium">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Join <span className="text-accent">Thousands</span> of Men Getting Results
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">2,500+</div>
                <p className="text-muted-foreground">Downloads This Month</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">89%</div>
                <p className="text-muted-foreground">Report Income Increase</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LeadMagnet;