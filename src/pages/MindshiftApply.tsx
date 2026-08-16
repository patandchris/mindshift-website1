import { useCallback, useEffect, useRef, useState } from "react";
import CampaignHeader from "@/components/mindshift-apply/CampaignHeader";
import CampaignFooter from "@/components/mindshift-apply/CampaignFooter";
import HeroSection from "@/components/mindshift-apply/HeroSection";
import IdentificationSection from "@/components/mindshift-apply/IdentificationSection";
import PatStorySection from "@/components/mindshift-apply/StorySection";
import MechanismSection from "@/components/mindshift-apply/MechanismSection";
import ProofSection from "@/components/mindshift-apply/ProofSection";
import JourneySection from "@/components/mindshift-apply/JourneySection";
import IncludedSection from "@/components/mindshift-apply/IncludedSection";
import FoundersSection from "@/components/mindshift-apply/FoundersSection";
import MissionSection from "@/components/mindshift-apply/MissionSection";
import FitSection from "@/components/mindshift-apply/FitSection";
import InvestmentSection from "@/components/mindshift-apply/InvestmentSection";
import ApplicationForm from "@/components/mindshift-apply/ApplicationForm";
import { Button } from "@/components/ui/button";
import { captureAttribution } from "@/lib/attribution";
import { trackPageView, trackViewContent } from "@/lib/metaPixel";

/**
 * Standalone Meta Ads campaign landing page.
 * Deliberately isolated from the main site: no shared Header/Footer, no site nav.
 */
const MindshiftApply = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const viewContentFired = useRef(false);

  const scrollToApply = useCallback(() => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToApproach = useCallback(() => {
    document
      .getElementById("mindshift-approach")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // SEO metadata for this standalone page.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "MindShift — 12-Week Coaching by Pat & Chris";

    const description =
      "MindShift is a 12-week personal transformation coaching program by Pat & Chris for people who know they're capable of more. Application required.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href ?? null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/mindshift-apply`;

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) meta.content = previousDescription;
      if (canonical && previousCanonical !== null) canonical.href = previousCanonical;
    };
  }, []);

  // Attribution + Meta Pixel PageView
  useEffect(() => {
    captureAttribution();
    trackPageView();
  }, []);

  // Sticky mobile CTA + ViewContent when the application comes into view
  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });

    const applySection = document.getElementById("apply");
    let observer: IntersectionObserver | undefined;
    if (applySection) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !viewContentFired.current) {
            viewContentFired.current = true;
            trackViewContent();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(applySection);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <CampaignHeader onApplyClick={scrollToApply} />

      <main>
        <HeroSection onApplyClick={scrollToApply} />
        <IdentificationSection />
        <PatStorySection onExploreClick={scrollToApproach} />
        <MechanismSection />
        <ProofSection />
        <JourneySection />
        <IncludedSection />
        <FoundersSection />
        <MissionSection />
        <FitSection />
        <InvestmentSection onApplyClick={scrollToApply} />
        <ApplicationForm />
      </main>

      <CampaignFooter />

      {/* Sticky mobile CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-lg transition-transform duration-300 lg:hidden ${
          showStickyCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Button
          onClick={scrollToApply}
          className="h-12 w-full bg-gradient-gold text-base font-bold text-primary-foreground"
        >
          Apply for MindShift
        </Button>
      </div>
    </div>
  );
};

export default MindshiftApply;
