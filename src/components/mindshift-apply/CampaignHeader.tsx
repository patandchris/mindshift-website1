import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import patChrisLogo from "@/assets/pat-chris-logo.png";

interface CampaignHeaderProps {
  onApplyClick: () => void;
}

/** Funnel-only header: branding + a single CTA. No site navigation. */
const CampaignHeader = ({ onApplyClick }: CampaignHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/95 shadow-elegant backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-premium flex items-center justify-between gap-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <img
            src={patChrisLogo}
            alt="Pat &amp; Chris — MindShift"
            className="h-12 w-auto md:h-16"
          />
          <span className="hidden text-sm font-semibold uppercase tracking-[0.25em] text-accent sm:inline">
            MindShift
          </span>
        </div>

        <Button
          onClick={onApplyClick}
          className="bg-gradient-gold font-bold text-primary-foreground transition-all duration-300 hover:shadow-glow"
        >
          Apply for MindShift
        </Button>
      </div>
    </header>
  );
};

export default CampaignHeader;
