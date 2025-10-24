import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BeTheFirstToKnow = () => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container-premium">
        <Card className="max-w-2xl mx-auto bg-card border border-border">
          <CardContent className="p-12 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-6">
              Still Feeling Stuck — Even After Trying Everything?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Book a free MindShift Breakthrough Session to uncover what's really holding you back — and get a clear plan to take back control of your life, career, and mindset.
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
              onClick={() => window.open('https://calendly.com/patandchris/30min', '_blank')}
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BeTheFirstToKnow;