const phases = [
  {
    label: "Phase 1",
    weeks: "Weeks 1–6",
    title: "BUILD THE NEW",
    themes: ["beliefs", "vision", "goals", "action", "focus", "identity"],
    description:
      "Start by identifying the beliefs and patterns that may be influencing your current decisions. Then define the future you actually want, turn it into meaningful goals, take action and begin directing your focus toward the life you’re building.",
  },
  {
    label: "Phase 2",
    weeks: "Weeks 7–9",
    title: "REMOVE WHAT PULLS YOU BACK",
    themes: ["self-talk", "worth", "ownership", "family stories", "old rules"],
    description:
      "Once the new direction is clear, go deeper into the internal scripts that can quietly pull you back toward what feels familiar — from self-talk and worth to personal responsibility, family narratives and old conclusions.",
  },
  {
    label: "Phase 3",
    weeks: "Weeks 10–12",
    title: "REHEARSE, INTEGRATE & HOLD THE NEW",
    themes: [
      "visualization",
      "future identity",
      "setbacks as feedback",
      "consistency",
      "integration",
      "forward commitment",
    ],
    description:
      "Practice how the person you’re becoming thinks, decides and acts. Learn to recognize old responses when they return, treat setbacks as feedback and leave with routines and tools designed to help you keep moving after Week 12.",
  },
];

const JourneySection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-premium">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4">12 weeks. Three stages. One clear progression.</h2>
        <p className="text-lg text-accent">
          Build the new. Work on what pulls you back. Learn to hold what you’ve built.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {phases.map((phase) => (
          <article key={phase.label} className="card-premium flex h-full flex-col">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {phase.label}
              </span>
              <span className="text-sm text-muted-foreground">{phase.weeks}</span>
            </div>
            <h3 className="mb-4 text-2xl text-foreground">{phase.title}</h3>
            <ul className="mb-5 flex flex-wrap gap-2">
              {phase.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-full border border-accent/30 px-3 py-1 text-xs text-muted-foreground"
                >
                  {theme}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed text-muted-foreground">{phase.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default JourneySection;
