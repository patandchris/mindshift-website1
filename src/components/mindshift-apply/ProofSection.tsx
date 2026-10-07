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
            “In order to get different results, you have to think, act and believe differently, and that's what I've been doing since starting Mindshift.”
          </blockquote>
          <p className="mb-8 text-base italic text-muted-foreground">
            Haroldo Chacon - Mindshift Client
          </p>

          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>Haroldo moved to the United States from Brazil and built a career and life in the U.S.</p>
            <p>
              When he started Mindshift, one of the areas he wanted to work on was his confidence and the way he approached his future.
            </p>
            <p>
              Throughout the program, Haroldo described noticing changes in the way he thinks, acts and responds to opportunities - changes that became noticeable to the people around him too.
            </p>
            <p>
              
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProofSection;
