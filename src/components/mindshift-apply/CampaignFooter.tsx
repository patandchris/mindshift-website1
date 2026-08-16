import patChrisLogo from "@/assets/pat-chris-logo.png";

/** Minimal funnel footer — no outbound site navigation. */
const CampaignFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-premium py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <img src={patChrisLogo} alt="Pat &amp; Chris Coaching" className="h-16 w-auto" loading="lazy" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            MindShift by Pat &amp; Chris
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            MindShift is a coaching and personal-development program. Results vary between
            individuals and depend heavily on participation, consistency and personal
            circumstances. No specific financial, professional or personal outcome is guaranteed.
          </p>
          <p className="text-sm text-muted-foreground">
            © {year} Pat &amp; Chris Coaching. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CampaignFooter;
