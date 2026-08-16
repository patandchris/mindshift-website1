const statements = [
  "You feel like you're operating below your potential.",
  "You keep waiting for the \u201cright time\u201d to make an important change.",
  "You've achieved things, but something still feels incomplete.",
  "You want more confidence, direction or purpose.",
  "You make progress, then fall back into old patterns.",
  "You know your next chapter needs to look different from your last one.",
];

const IdentificationSection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-premium">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6">
          You know what you should be doing.
          <span className="block text-accent">So why does change still feel so difficult?</span>
        </h2>
        <div className="space-y-3 text-lg text-muted-foreground">
          <p>Maybe you&rsquo;ve read the books.</p>
          <p>Maybe you&rsquo;ve listened to the podcasts.</p>
          <p>Maybe you&rsquo;ve set goals before.</p>
          <p>Maybe you already know what you want to change.</p>
          <p>
            And yet you still find yourself returning to the same thoughts, habits, doubts or
            behaviors.
          </p>
        </div>
      </div>

      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statements.map((statement) => (
          <li
            key={statement}
            className="card-premium flex items-start gap-3 text-base leading-relaxed text-foreground"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{statement}</span>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 max-w-2xl border-l-2 border-accent pl-6 text-left">
        <p className="text-xl leading-relaxed text-foreground">
          Sometimes the problem isn&rsquo;t a lack of information.
        </p>
        <p className="text-xl leading-relaxed text-accent">
          It&rsquo;s the patterns underneath the information.
        </p>
      </div>
    </div>
  </section>
);

export default IdentificationSection;
