import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Users, TrendingUp } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const leadMagnetSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100, 'First name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters')
});

const LeadMagnetPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    email: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const validationResult = leadMagnetSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }
    
    // Here you would integrate with HubSpot
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const benefits = [
    "Identify and eliminate your money ceiling beliefs",
    "5 audio tracks to reprogram your unconscious mind",
    "Weekly action steps to build wealth-building habits",
    "Bonus: 30-day mindset transformation tracker"
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding">
          <div className="container-premium">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6">
                Check Your Email!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your free MindShift System: Break Your Money Ceiling Toolkit is on its way. 
                Check your inbox in the next few minutes.
              </p>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-foreground font-semibold mb-2">What's Next?</p>
                <p className="text-muted-foreground">
                  While you wait, explore our coaching program and see how we can help you 
                  transform your entire mindset in just 12 weeks.
                </p>
                <Button className="mt-4 bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300">
                  Learn About The MindShift System
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-background">
          <div className="container-premium">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                  <Download className="w-4 h-4 mr-2" />
                  Free Toolkit
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
                  Get Your Free MindShift System: Break Your Money Ceiling Toolkit
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  A powerful mix of PDFs & audio tracks to help you reprogram your beliefs and unlock financial freedom.
                </p>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>10,000+ Downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Average 40% Income Increase</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <Card className="bg-card border border-border">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Download Your Free Toolkit
                      </h2>
                      <p className="text-muted-foreground">
                        Enter your details below to get instant access
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                          className="bg-background border-border text-foreground"
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="bg-background border-border text-foreground"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                        size="lg"
                      >
                        Send Me the Toolkit
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LeadMagnetPage;