import MediaPlaceholder from "./MediaPlaceholder";
import chrisPhoto from "@/assets/chris-guitar.jpg.asset.json";

const FoundersSection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-premium">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4">
          Two perspectives. <span className="text-accent">One shared obsession.</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Understanding why people stay stuck &mdash; and helping them change the patterns that keep
          them there.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* PAT */}
        <article>
          <MediaPlaceholder
            label="Pat profile — real photo"
            aspect="aspect-[4/5]"
            className="mb-6"
          />
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            The lived journey
          </p>
          <h3 className="mb-4 text-3xl text-foreground">Pat</h3>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Pat is in his mid-50s and has lived in the Seattle area for approximately 20 years.
            </p>
            <p>His background includes:</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "engineering",
                "Boeing",
                "entrepreneurship",
                "real-estate investing",
                "international experience",
                "years of personal-development study",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              At 45, Pat realized that although his life was objectively stable, he wanted far more
              possibility for himself and his family. That realization pushed him into years of
              study and personal application.
            </p>
            <p>Pat became particularly interested in:</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "how successful people think",
                "how beliefs influence possibility",
                "persistence",
                "opportunity",
                "how people react to failure",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              He continues to apply these ideas while balancing his professional career,
              entrepreneurship and investments.
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
            <p>Chris shares the same decade-long personal-development journey.</p>
            <p>
              He became deeply interested in understanding why people can consciously want change
              while still repeating behaviors that keep them stuck.
            </p>
            <p>
              Chris pursued formal training and is an{" "}
              <span className="font-semibold text-foreground">
                NLP Practitioner / Certified Hypnotist
              </span>
              .
            </p>
            <p>His background also includes:</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "entrepreneurship",
                "real-estate investing",
                "international experience",
                "extensive personal-development study",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Chris has read extensively on personal growth, mindset and behavior and became
              particularly interested in the methods used to help people identify and change
              internal patterns.
            </p>
          </div>
        </article>
      </div>

      <div className="mx-auto mt-14 max-w-3xl space-y-4 border-l-2 border-accent pl-6 text-lg leading-relaxed text-muted-foreground">
        <p className="text-foreground">
          MindShift is the result of what Pat &amp; Chris have spent years learning, applying and
          refining in their own lives.
        </p>
        <p>
          They did not create MindShift because they believed they had achieved a perfect life.
        </p>
        <p>
          They created it because their own journey changed the way they experience progress,
          possibility, setbacks and personal growth &mdash; and they wanted to share those tools
          with others.
        </p>
      </div>
    </div>
  </section>
);

export default FoundersSection;
