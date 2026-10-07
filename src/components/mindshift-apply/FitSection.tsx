import { Check, X } from "lucide-react";

const fits = [
  "Your life looks fine from the outside, but you know you’re capable of more.",
  "You’re willing to honestly examine your beliefs, patterns and behaviors.",
  "You’re prepared to consistently apply what you learn for 12 weeks.",
  "You’re open to coaching, guided NLP-based exercises, hypnosis and structured personal-development work.",
  "You want a process you can actively practice — not just more information.",
];

const notFits = [
  "You’re looking for a quick fix or guaranteed outcome.",
  "You expect Pat & Chris to do the work for you.",
  "You’re unwilling to examine your own patterns and decisions.",
  "You’re not prepared to consistently put what you learn into practice.",
  "You’re looking only for content to consume rather than a structured coaching process.",
];

const FitSection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-premium">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-premium">
          <h3 className="mb-6 text-2xl text-accent">MindShift may be a fit if:</h3>
          <ul className="space-y-4">
            {fits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-premium">
          <h3 className="mb-6 text-2xl text-muted-foreground">
            MindShift is probably not a fit if:
          </h3>
          <ul className="space-y-4">
            {notFits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
        MindShift is a coaching and personal-development program and is not a substitute for
        medical, psychological or mental-health treatment.
      </p>
    </div>
  </section>
);

export default FitSection;
