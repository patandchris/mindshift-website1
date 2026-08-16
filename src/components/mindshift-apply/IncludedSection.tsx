import { BookOpen, Headphones, CalendarCheck, MessageCircle, Repeat, Target } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "Structured 12-Week Curriculum",
    body: "Weekly audio content, exercises and PDF resources built around the MindShift progression.",
  },
  {
    icon: Headphones,
    title: "Guided NLP & Hypnosis Audio",
    body: "Structured guided exercises used throughout the program as tools for belief, identity and behavioral work.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly MindShift Check-In",
    body: "Pat & Chris personally follow each client's progress every week. The objective is to prevent clients from simply consuming content and disappearing.",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp Access to Pat & Chris",
    body: "Clients can communicate directly with Pat & Chris during the program when they need clarification, guidance or support.",
  },
  {
    icon: Repeat,
    title: "Daily Implementation Routines",
    body: "Short journaling, affirmation and visualization routines designed to turn ideas into repeated practice.",
  },
  {
    icon: Target,
    title: "Personal Accountability",
    body: "MindShift requires action. The program encourages clients to repeatedly connect what they learn to the real decisions and actions they take in their lives.",
  },
];

const IncludedSection = () => (
  <section className="section-padding">
    <div className="container-premium">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4">This is not just a library of content.</h2>
        <p className="text-lg text-muted-foreground">
          MindShift combines a structured 12-week process with ongoing human support from Pat &amp;
          Chris.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="card-premium h-full">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40">
              <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </span>
            <h3 className="mb-3 text-xl text-foreground md:text-xl">{item.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default IncludedSection;
