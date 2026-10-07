import MediaPlaceholder from "./MediaPlaceholder";
import chrisPhoto from "@/assets/chris-guitar.jpg.asset.json";
import patPhoto from "@/assets/pat-profile.png.asset.json";

const FoundersSection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-premium">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4">
          Two perspectives. <span className="text-accent">One shared obsession.</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Understanding why people stay stuck &mdash; and helping them work on the patterns that may be keeping
          them there.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* PAT */}
        <article>
          <div className="mb-6 aspect-[4/5] overflow-hidden rounded-2xl border border-accent/20">
            <img
              src={patPhoto.url}
              alt="Pat, co-founder of MindShift, standing at home"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            The lived journey
          </p>
          <h3 className="mb-4 text-3xl text-foreground">Pat</h3>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Pat&rsquo;s journey began with a question he couldn&rsquo;t ignore: was the stable
              life he had built really the limit of what was possible?
            </p>
            <p>
              Over the following decade, he studied personal development, success psychology and
              the way people respond to goals, opportunity and setbacks &mdash; while continuing to
              apply those ideas in his own career, business ventures and investments.
            </p>
            <p>
              Inside MindShift, Pat brings the lived journey: turning ideas into decisions, action,
              persistence and lessons from real setbacks.
            </p>
          </div>
        </article>

        {/* CHRIS */}
        <article>
          <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-accent/30 bg-card">
            <img
              src={chrisPhoto.url}
              alt="Chris playing guitar in the studio"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            The methodology
          </p>
          <h3 className="mb-4 text-3xl text-foreground">Chris</h3>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Chris became fascinated by a different question: why can someone consciously want
              change while still repeating the behaviors that keep them stuck?
            </p>
            <p>
              That curiosity led him deeper into personal development, behavior and structured
              change work. He pursued formal training and became an NLP Practitioner and Certified
              Hypnotist.
            </p>
            <p>
              Inside MindShift, Chris brings the methodology: the guided exercises, NLP-based work
              and hypnosis used throughout the 12-week process.
            </p>
          </div>
        </article>
      </div>

      <div className="mx-auto mt-14 max-w-3xl space-y-4 border-l-2 border-accent pl-6 text-lg leading-relaxed text-muted-foreground">
        <p className="text-foreground">
          Pat brings the lived journey. Chris brings the methodology.
        </p>
        <p>MindShift brings both together in one structured 12-week process.</p>
        <p>{"\n"}</p>
      </div>
    </div>
  </section>
);

export default FoundersSection;
