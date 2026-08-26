import { Button } from "@/components/ui/button";
import patStoryPhoto from "@/assets/pat-story.jpg.asset.json";

interface StorySectionProps {
  onExploreClick: () => void;
}

const studies = [
  "personal development",
  "success psychology",
  "beliefs",
  "behavior",
  "NLP",
  "subconscious patterns",
  "the thinking patterns of highly successful people",
];

const shifts = [
  "goals",
  "opportunity",
  "money",
  "failure",
  "setbacks",
  "persistence",
  "what they believed was possible",
];

const PatStorySection = ({ onExploreClick }: StorySectionProps) => (
  <section className="section-padding">
    <div className="container-premium">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <MediaPlaceholder
            label="Pat story — real Pat photo"
            aspect="aspect-[4/5]"
            caption="Replace with a real photograph of Pat."
          />
        </div>

        <div>
          <h2 className="mb-8">
            At 45, Pat had a realization he couldn&rsquo;t ignore.
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              What started as his question became a decade-long journey for both of them.
              <br /><br />
              Pat had a good career, a family and a stable life.
            </p>
            <p>
              Then one day, sitting at his desk, he opened a retirement calculator.
            </p>
            <p>
              If nothing changed, he realized he could still be working into his 70s, living within many of the same financial limits and assumptions he had accepted for years.
            </p>
            <p>There was nothing &ldquo;wrong&rdquo; with his life.</p>
            <p>But he wanted more for himself and his family.</p>
            <p className="border-l-2 border-accent pl-6 text-xl text-foreground">
              That day, he made a decision: Something had to change.
            </p>
            <p>
              What began as Pat's personal search soon became a journey he shared with Chris.
            </p>
            <p>Together, they became fascinated by one question:</p>
            <p className="text-xl italic text-accent">
              Why do some people keep creating new opportunities while others work just as hard and remain stuck?
            </p>
            <p>Over the next decade, they studied:</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {studies.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              They began applying what they learned to their own lives.
            </p>
            <p>
              Chris went deeper into the methodology, becoming an{" "}
              <span className="font-semibold text-foreground">
                NLP Practitioner and Certified Hypnotist
              </span>
              .
            </p>
            <p>
              Together, they began changing the way they approached goals, money, opportunities, failure, setbacks and what they believed was possible.
              <br /><br />
              They experienced setbacks too. Some of their real-estate investments didn't go as planned, but instead of treating failure as a reason to stop, they learned to treat it as feedback.
            </p>
            <p className="border-l-2 border-accent pl-6 text-xl text-foreground">
              Knowing what to do is not the same as becoming the person who consistently does it.
            </p>
            <p>That journey eventually became the foundation of MindShift</p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={onExploreClick}
            className="mt-9 h-13 border-accent/50 text-base font-semibold text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Explore the MindShift Approach
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PatStorySection;