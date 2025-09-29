import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import mindshiftLogo from "@/assets/mindshift-logo.png";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes glow-pulse-1 {
          0%, 11.11%, 100% { color: hsl(48, 96%, 53%); }
          11.11%, 22.22% { color: white; }
          22.22%, 33.33% { color: hsl(48, 96%, 53%); }
        }
        @keyframes glow-pulse-2 {
          0%, 33.33% { color: hsl(48, 96%, 53%); }
          33.33%, 44.44% { color: white; }
          44.44%, 55.55% { color: hsl(48, 96%, 53%); }
          55.55%, 100% { color: hsl(48, 96%, 53%); }
        }
        @keyframes glow-pulse-3 {
          0%, 55.55% { color: hsl(48, 96%, 53%); }
          55.55%, 66.66% { color: white; }
          66.66%, 77.77% { color: hsl(48, 96%, 53%); }
          77.77%, 100% { color: hsl(48, 96%, 53%); }
        }
      `}</style>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(48_96%_65%_/_0.1),transparent_70%)]" />
      </div>

      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          

          {/* Main Headlines */}
          <h1 className="mb-8">
            <span className="block text-5xl font-bold md:text-6xl text-center whitespace-nowrap my-[60px] mx-0 px-[7px] py-[12px]">
              <span className="inline-block animate-[glow-pulse-1_9s_ease-in-out_infinite]">Break Free.</span>
              {" "}
              <span className="inline-block animate-[glow-pulse-2_9s_ease-in-out_infinite]">Rewire Your Mind.</span>
              {" "}
              <span className="inline-block animate-[glow-pulse-3_9s_ease-in-out_infinite]">Redesign Your Life</span>
            </span>
          </h1>

          {/* Intro Text */}
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
            You don't need another productivity hack. You need a unconscious reset. The MindShift System helps you shatter limiting beliefs, stop self-sabotage, and finally step into the life, wealth, and freedom you know you're capable of.
          </p>

          {/* Logo/Visual */}
          <div className="flex justify-center mb-4">
          <div className="p-12 px-[36px] my-0 mx-[100px] py-[48px]">
            <img src={mindshiftLogo} alt="The MindShift System" className="w-full max-w-2xl mx-auto" />
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
            <Link to="/coaching-program" className="my-[19px] px-0 mx-[15px] py-0">
              <Button variant="default" size="xl" className="group bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
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