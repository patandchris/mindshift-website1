import haroldoVideo from "@/assets/haroldo-testimonial.mp4.asset.json";

const ProofSection = () => (
  <section className="section-padding">
    <div className="container-premium">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-accent/30 bg-card">
            <video
              src={haroldoVideo.url}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label="Haroldo Chacon MindShift client testimonial video"
            />
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Real client video.
          </p>
        </div>


        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Real client
          </p>
          <h2 className="mb-6 text-accent">
            &ldquo;Before achieving my future goals, first I had to change myself.&rdquo;
          </h2>

          <blockquote className="mb-4 border-l-2 border-accent pl-6 text-lg leading-relaxed text-foreground">
            &ldquo;To get different results, I realized I had to think, act and believe differently.
            Since starting MindShift, I&rsquo;ve noticed significant changes in the way I think, my
            actions and my beliefs.&rdquo;
          </blockquote>
          <p className="mb-8 text-base italic text-muted-foreground">
            Haroldo Chacon &mdash; MindShift Client
          </p>

          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>Haroldo moved to the United States from Brazil.</p>
            <p>
              Although he had built a life and career in the U.S., he had struggled with confidence
              and with fully feeling like he belonged.
            </p>
            <p>
              Through MindShift, Haroldo describes changing the way he thinks, acts and approaches
              opportunities. He became noticeably more confident and positive.
            </p>
            <p>
              The change became visible enough that even his wife noticed a meaningful difference in
              him. MindShift also influenced how he approached leadership and difficult situations
              in other areas of his life.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProofSection;
