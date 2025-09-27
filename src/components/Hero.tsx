import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import mindshiftLogo from "@/assets/mindshift-logo.png";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(48_96%_65%_/_0.1),transparent_70%)]" />
      </div>

      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
            The MindShift System
          </div>

          {/* Main Headlines */}
          <h1 className="mb-8">
            <span className="block text-accent text-5xl md:text-7xl font-bold">Always Be Improving.</span>
          </h1>

          {/* Logo/Visual */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold rounded-3xl blur-3xl opacity-20 scale-110" />
              <div className="relative bg-black border border-border rounded-3xl p-12 card-premium px-[36px]">
                <img src={mindshiftLogo} alt="The MindShift System" className="w-full max-w-md mx-auto" />
              </div>
            </div>
          </div>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-8">
            Transform your mindset with The MindShift System: The 12-Week Unconscious Upgrade.
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Eliminate limiting beliefs, build success habits, and unlock your focus with our proven system designed for ambitious professionals ready to break through their barriers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="xl" 
              className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
            >
              Start Your Transformation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="xl" className="group border-accent text-accent hover:bg-accent hover:text-black">
              <Play className="mr-2 h-5 w-5" />
              Watch Success Stories
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;