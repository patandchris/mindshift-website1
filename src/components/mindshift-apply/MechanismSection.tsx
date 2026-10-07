const steps = [
  {
    number: "1",
    title: "SEE",
    body: "Identify the beliefs, patterns and automatic responses that may be influencing how you think, decide and act. ",
  },
  {
    number: "2",
    title: "BUILD",
    body: "Define the future you actually want, understand why it matters, and build a clear path from where you are to where you want to go.",
  },
  {
    number: "3",
    title: "REMOVE",
    body: "Work on the self-talk, old rules and familiar responses that can quietly pull you back toward the patterns you're trying to leave behind.",
  },
  {
    number: "4",
    title: "REHEARSE",
    body: "Use guided exercises, visualization, NLP-based work and repetition to make new behaviors and internal standards more familiar.",
  },
  {
    number: "5",
    title: "HOLD",
    body: "Recognize old responses when they return, treat setbacks as feedback and keep reinforcing the behaviors that are actually moving you forward.",
  },
];

const MechanismSection = () => (
  <section id="mindshift-approach" className="section-padding bg-secondary/30 scroll-mt-24">
    <div className="container-premium">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4">
          Change the pattern.
          <span className="block text-accent">Change what happens next.</span>
        </h2>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={[
              "card-premium h-full",
              index === 3 ? "lg:col-span-2 lg:col-start-2" : "",
              index === 4 ? "lg:col-span-2 lg:col-start-4" : "",
              index === 3 || index === 4 ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-2",
            ].join(" ")}
          >
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
          MindShift isn't about thinking positively and waiting for life to change.
        </p>
        <p className="text-foreground">
          It's a structured process for understanding what's been running you, building a new direction, working on what keeps pulling you back, practicing new responses, and learning how to hold the change.
        </p>
      </div>
    </div>
  </section>
);

export default MechanismSection;
