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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
              The MindShift System
            </div>

            {/* Main Headlines */}
            <h1 className="mb-6">
              <span className="block text-foreground">Rewire.</span>
              <span className="block text-foreground">Reshape.</span>
              <span className="block text-accent">Rise.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground mb-8">
              Always Be Improving.
            </p>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Transform your mindset, eliminate limiting beliefs, and unlock your potential with our proven 12-week system designed for ambitious men ready to break through their barriers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div>
          </div>

          {/* Logo/Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold rounded-3xl blur-3xl opacity-20 scale-110" />
              <div className="relative bg-black border border-border rounded-3xl p-12 card-premium px-[36px]">
                <img src={mindshiftLogo} alt="The MindShift System" className="w-full max-w-lg mx-auto" />
              </div>
            </div>
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