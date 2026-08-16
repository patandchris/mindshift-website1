import { Check, X } from "lucide-react";

const fits = [
  "Your life looks fine from the outside but something still feels missing.",
  "You know you're capable of more.",
  "You're willing to examine your own beliefs and behaviors.",
  "You're prepared to take consistent action for 12 weeks.",
  "You're open to coaching, NLP exercises, hypnosis and structured personal-development work.",
  "You are looking for meaningful change rather than another motivational video.",
  "You are financially able to invest in a premium coaching experience.",
];

const notFits = [
  "You are looking for a quick fix.",
  "You expect Pat & Chris to change your life for you.",
  "You are unwilling to implement what you learn.",
  "You only want free personal-development content.",
  "You are currently unable to invest financially in a premium program.",
  "You are seeking medical, psychiatric or psychological treatment.",
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
