import { Button } from "@/components/ui/button";
import patChrisHero from "@/assets/pat-chris-studio.jpg.asset.json";

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection = ({ onApplyClick }: HeroSectionProps) => (
  <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.16),transparent_60%)]" />
    <div className="container-premium relative">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            A 12-week coaching program by Pat &amp; Chris
          </p>
          <h1 className="mb-6 text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
            Your life isn&rsquo;t bad.
            <span className="block text-accent">But you know you&rsquo;re capable of more.</span>
          </h1>

          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              You may have a career, responsibilities and a life that looks successful from the
              outside.
            </p>
            <p>Yet somewhere underneath it all, you know something needs to change.</p>
            <p>
              MindShift is a 12-week coaching experience designed to help you identify and change the
              beliefs and patterns keeping you from moving toward the life you actually want.
            </p>
          </div>

          <div className="mt-9">
            <Button
              size="lg"
              onClick={onApplyClick}
              className="h-14 w-full bg-gradient-gold px-8 text-base font-bold text-primary-foreground transition-all duration-300 hover:shadow-glow sm:w-auto"
            >
              See If MindShift Is Right for You
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Application required &bull; 12-week program &bull; Payment plans available
            </p>
          </div>
        </div>

        <div className="lg:pl-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-accent/30 bg-card">
            <img
              src={patChrisHero.url}
              alt="Pat and Chris recording the podcast together in studio"
              className="h-full w-full object-cover object-top"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
