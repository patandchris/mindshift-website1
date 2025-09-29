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
          

          {/* Main Headlines */}
          <h1 className="mb-8">
            <span className="block text-5xl font-bold md:text-5xl text-amber-400">Always Be Improving.</span>
          </h1>

          {/* Logo/Visual */}
          <div className="flex justify-center mb-8">
            <div className="bg-background rounded-3xl p-12 px-[36px] my-0 mx-[100px] py-[48px]">
              <img src={mindshiftLogo} alt="The MindShift System" className="w-full max-w-md mx-auto" />
            </div>
          </div>

          {/* Sub-headline */}
          <p className="text-xl font-semibold text-foreground mb-8 px-[8px] md:text-2xl my-[3px] mx-[13px]">
            Transform your mindset with The MindShift System: The 12-Week Unconscious Upgrade.
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Eliminate limiting beliefs, build success habits, and unlock your focus with our proven system designed for ambitious professionals ready to break through their barriers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300">
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