const phases = [
  {
    label: "Phase 1",
    weeks: "Weeks 1–4",
    title: "Understand what is running you",
    themes: ["beliefs", "vision", "goals", "action", "limiting behaviors", "direction"],
    description:
      "Begin by identifying the beliefs and patterns influencing your current life. Then define a clearer vision, create meaningful goals and begin translating intention into action.",
  },
  {
    label: "Phase 2",
    weeks: "Weeks 5–8",
    title: "Reinforce a new internal direction",
    themes: [
      "focus",
      "identity",
      "affirmations",
      "visualization",
      "subconscious patterns",
      "NLP exercises",
      "structured routines",
    ],
    description:
      "Work on reinforcing the thoughts, habits and identity that support the future you want to create.",
  },
  {
    label: "Phase 3",
    weeks: "Weeks 9–12",
    title: "Build the person who follows through",
    themes: [
      "responsibility",
      "self-talk",
      "productivity",
      "persistence",
      "learning from failure",
      "consistency",
      "long-term integration",
    ],
    description:
      "Focus on personal ownership, consistent action and creating behaviors designed to continue beyond the 12-week program.",
  },
];

const JourneySection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-premium">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4">
          12 weeks designed to move from{" "}
          <span className="text-accent">awareness to action.</span>
        </h2>
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
