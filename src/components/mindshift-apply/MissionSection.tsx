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
              For Pat &amp; Chris, personal development was never just about achieving another goal.
            </p>
            <p className="text-foreground">
              Over time, it changed the way they approached possibility, setbacks and the journey
              itself.
            </p>
            <p>
              As they began seeing meaningful changes in other people too, the reason for MindShift
              became clearer:
            </p>
            <p className="border-l-2 border-accent pl-6 text-xl text-foreground">
              Help people who know they’re capable of more understand what may be holding them back
              — and build the patterns, behaviors and internal standards needed to move forward.
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
