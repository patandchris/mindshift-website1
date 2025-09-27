import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const BeTheFirstToKnow = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    preference: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-background">
        <div className="container-premium">
          <Card className="max-w-2xl mx-auto text-center bg-card border border-border">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">You're All Set!</h3>
              <p className="text-muted-foreground">
                Thank you for signing up! You'll be the first to know about our latest resources and events.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <Card className="max-w-2xl mx-auto bg-card border border-border">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h2 className="mb-4 text-accent">Be the First to Know</h2>
              <p className="text-lg text-muted-foreground">
                Sign up to get the latest on our best resources and events.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
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
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What kind of information would you like to receive?
                </label>
                <Select onValueChange={(value) => handleInputChange("preference", value)}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="mindset-tips">Mindset & Success Tips</SelectItem>
                    <SelectItem value="program-updates">Program Updates & Events</SelectItem>
                    <SelectItem value="podcast-episodes">New Podcast Episodes</SelectItem>
                    <SelectItem value="free-resources">Free Resources & Tools</SelectItem>
                    <SelectItem value="all">All of the Above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Sign Me Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BeTheFirstToKnow;