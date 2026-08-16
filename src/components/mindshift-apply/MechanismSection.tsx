const steps = [
  {
    number: "1",
    title: "Identify",
    body: "Recognize the beliefs, internal dialogue and recurring patterns influencing your current decisions and behavior.",
  },
  {
    number: "2",
    title: "Redefine",
    body: "Build a clear vision of the life you want and identify the goals and behaviors required to move toward it.",
  },
  {
    number: "3",
    title: "Reinforce",
    body: "Use structured exercises, reflection, visualization, NLP techniques, hypnosis audio and daily routines to reinforce more empowering patterns.",
  },
  {
    number: "4",
    title: "Act",
    body: "Turn internal change into real-world behavior through consistent action, accountability, focus and persistence.",
  },
];

const MechanismSection = () => (
  <section id="mindshift-approach" className="section-padding bg-secondary/30 scroll-mt-24">
    <div className="container-premium">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4">
          Change the pattern.
          <span className="block text-accent">Then change the result.</span>
        </h2>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.title} className="card-premium h-full">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-lg font-bold text-accent">
              {step.number}
            </span>
            <h3 className="mb-3 text-xl uppercase tracking-[0.14em] text-foreground md:text-xl">
              {step.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-12 max-w-3xl space-y-3 text-center text-lg text-muted-foreground">
        <p>
          MindShift is not about thinking positively and waiting for life to change.
        </p>
        <p className="text-foreground">
          It is about changing the way you think, decide and act &mdash; then repeatedly putting
          that change into practice.
        </p>
      </div>
    </div>
  </section>
);

export default MechanismSection;
