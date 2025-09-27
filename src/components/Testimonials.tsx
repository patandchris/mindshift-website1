import { Card, CardContent } from "@/components/ui/card";
import { Play, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Rodriguez",
      title: "Real Estate Investor",
      content: "The MindShift System completely transformed how I think about money and success. I went from struggling to close deals to consistently hitting 7-figures. The mindset work is everything.",
      videoThumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop&crop=face",
      results: "Increased income by 300% in 6 months"
    },
    {
      id: 2,
      name: "David Chen",
      title: "Tech Entrepreneur",
      content: "I was stuck in analysis paralysis for years. Pat and Chris helped me break through the mental barriers that were keeping me small. Now I'm scaling my SaaS to $1M ARR.",
      videoThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=face",
      results: "Launched and scaled to $1M ARR"
    }
  ];

  return (
    <section className="section-padding bg-card/50">
      <div className="container-premium">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            Success Stories
          </div>
          <h2 className="mb-6">
            Real Results from <span className="text-accent">Real Men</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how ambitious men like you have transformed their lives and businesses with The MindShift System.
          </p>
        </div>

        {/* Video Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-premium group overflow-hidden">
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={testimonial.videoThumbnail}
                    alt={`${testimonial.name} testimonial`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="h-8 w-8 text-accent-foreground ml-1" />
                    </div>
                  </div>
                  
                  {/* Results Badge */}
                  <div className="absolute top-4 left-4 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.results}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Testimonials CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more success stories?
          </p>
          <button className="text-accent hover:text-accent/80 font-medium transition-colors">
            View All Case Studies →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;