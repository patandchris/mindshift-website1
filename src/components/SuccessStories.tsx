import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const SuccessStories = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marcus Thompson",
      title: "Executive Director",
      content: "The MindShift System completely transformed how I approach challenges. I went from feeling stuck to leading with confidence in just 12 weeks.",
      videoThumbnail: "/placeholder.svg",
      results: "40% Revenue Increase"
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "Senior Manager",
      content: "I finally broke through my limiting beliefs about money and success. This program gave me the tools to think and act like the leader I always wanted to be.",
      videoThumbnail: "/placeholder.svg",
      results: "Promoted to VP"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-accent">Real Results from Real Clients</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how ambitious professionals like you have transformed their mindset and achieved breakthrough results with The MindShift System.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card-premium bg-card border border-border rounded-xl overflow-hidden group hover:shadow-elegant transition-all duration-300">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={testimonial.videoThumbnail}
                  alt={`${testimonial.name} testimonial`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="rounded-full w-16 h-16 p-0">
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Results Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                  {testimonial.results}
                </div>

                <blockquote className="text-foreground mb-4 italic">
                  "{testimonial.content}"
                </blockquote>

                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;