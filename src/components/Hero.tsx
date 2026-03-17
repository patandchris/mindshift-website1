import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import mindshiftLogo from "@/assets/mindshift-logo-new.png";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          

          {/* Main Headlines */}
          <h1 className="mb-8 mt-24 text-center">
            <span className="block text-3xl font-bold md:text-4xl text-accent">
              <span className="block md:inline">Break Free.</span>{" "}
              <span className="block md:inline">Rewire Your Mind.</span>{" "}
              <span className="block md:inline">Redesign Your Life</span>
            </span>
          </h1>

          {/* Intro Text */}
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
            You don't need another productivity hack. You need a unconscious reset. The MindShift System helps you shatter limiting beliefs, stop self-sabotage, and finally step into the life, wealth, and freedom you know you're capable of.
          </p>

          {/* Logo/Visual */}
          <div className="flex justify-center mb-4">
            <div className="p-12 px-[36px] my-0 mx-[100px] py-[48px]">
              <img 
                src={mindshiftLogo} 
                alt="The MindShift System" 
                className="w-full max-w-2xl mx-auto md:max-w-3xl" 
              />
            </div>
          </div>

          {/* Sub-headline */}
          <p className="text-xl font-semibold text-muted-foreground mb-8 px-[8px] md:text-2xl my-[3px] mx-[13px]">
            Transform your mindset with The MindShift System: The 12-Week Unconscious Upgrade.
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Eliminate limiting beliefs, build success habits, and unlock your focus with our proven system designed for ambitious professionals ready to break through their barriers.
          </p>

{/* CTA Buttons */}
<div className="flex justify-center">
  <Link to="/week-one-offer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <Button variant="default" size="lg" className="group bg-gradient-gold text-background font-bold hover:shadow-glow transition-all duration-300">
      Start Week One Free
      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Button>
  </Link>
</div>
        </div>

      </div>
    </section>;
};
export default Hero;
