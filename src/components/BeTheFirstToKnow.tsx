import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BeTheFirstToKnow = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <Card className="max-w-2xl mx-auto bg-card border border-border">
          <CardContent className="p-12 flex justify-center">
            <Link to="/coaching-program" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button variant="default" size="lg" className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BeTheFirstToKnow;