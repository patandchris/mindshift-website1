import { Button } from "@/components/ui/button";

interface InvestmentSectionProps {
  onApplyClick: () => void;
}

const includes = [
  "the complete 12-week MindShift curriculum",
  "exercises and resources",
  "guided audio",
  "weekly check-ins",
  "direct WhatsApp access to Pat & Chris",
  "ongoing personal support and accountability",
];

const InvestmentSection = ({ onApplyClick }: InvestmentSectionProps) => (
  <section className="section-padding">
    <div className="container-premium">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-8">
          A serious commitment to the next{" "}
          <span className="text-accent">12 weeks of your life.</span>
        </h2>

        <div className="card-premium mx-auto">
          <p className="text-muted-foreground">The complete 12-week MindShift experience is:</p>
          <p className="my-4 text-5xl font-black text-accent md:text-6xl">$4,000</p>
          <p className="text-muted-foreground">Payment plans are available.</p>

          <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            Because Pat &amp; Chris are personally involved in the experience, MindShift has limited
            client capacity. Enrollment therefore begins with an application.
          </p>
          <p className="text-foreground">
            We are not looking for the largest number of participants. We are looking for people
            prepared to seriously engage with the process.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onApplyClick}
          className="mt-9 h-14 w-full bg-gradient-gold px-10 text-base font-bold text-primary-foreground transition-all duration-300 hover:shadow-glow sm:w-auto"
        >
          Apply for MindShift
        </Button>
      </div>
    </div>
  </section>
);

export default InvestmentSection;
