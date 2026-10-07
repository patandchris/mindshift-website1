import missionPhoto from "@/assets/pat-chris-mission.png.asset.json";

const MissionSection = () => (
  <section className="section-padding">
    <div className="container-premium">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-6">
            Why <span className="text-accent">MindShift</span> exists
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              For Pat &amp; Chris, personal development did not simply become a way to chase another
              goal.
            </p>
            <p className="text-foreground">It changed the experience of the journey itself.</p>
            <p>
              They describe themselves today as happier, more optimistic about possibility and
              better equipped to deal with setbacks than they were before they began this journey.
            </p>
            <p>Seeing those changes in other people became even more meaningful.</p>
            <p>
              When people like Haroldo began describing how MindShift had affected their confidence,
              thinking and everyday behavior, Pat &amp; Chris realized how powerful it was to help
              another person experience meaningful change.
            </p>
            <p>Their objective with MindShift is simple:</p>
            <p className="border-l-2 border-accent pl-6 text-xl text-foreground">
              Help people who know they are capable of more start becoming the person capable of
              creating more.
            </p>
          </div>
        </div>

        <div className="lg:order-first">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-accent/30">
            <img
              src={missionPhoto.url}
              alt="Pat and Chris smiling at each other while recording in their studio"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MissionSection;
