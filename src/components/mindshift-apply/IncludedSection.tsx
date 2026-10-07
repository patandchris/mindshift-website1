import { BookOpen, Headphones, CalendarCheck, MessageCircle, Repeat, Target } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "Structured 12-Week Curriculum",
    body: "A structured week-by-week progression where each module builds on the work completed before it, supported by audio content, exercises and practical resources.",
  },
  {
    icon: Headphones,
    title: "Guided NLP & Hypnosis Audio",
    body: "Guided exercises used throughout the program to explore beliefs, internal patterns, future behaviors and personal responses, alongside progressive hypnosis audio.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly MindShift Check-In",
    body: "Pat & Chris personally follow each client's progress every week to help them reflect on what's changing, stay engaged with the process and keep moving forward.",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp Access to Pat & Chris",
    body: "Communicate directly with Pat & Chris throughout the program when you need clarification, guidance or support.",
  },
  {
    icon: Repeat,
    title: "Daily Implementation Routines",
    body: "Short journaling, affirmation and visualization practices that develop throughout the program, designed to turn insight into repeated daily practice.",
  },
  {
    icon: Target,
    title: "Reusable Toolkit Beyond Week 12",
    body: "MindShift doesn't end with the final module. You leave with guided exercises, routines and a practical framework for returning to the tools when new goals, stbacks or old patterns appear.",
  },
];

const IncludedSection = () => (
  <section className="section-padding">
    <div className="container-premium">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4">This is not just a library of content.</h2>
        <p className="text-lg text-muted-foreground">
          MindShift combines a structured 12-week progression with guided practice, direct human support and tools designed to keep being useful beyond Week 12.
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
