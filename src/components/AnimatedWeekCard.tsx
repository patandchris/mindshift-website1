import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface WeekCardProps {
  week: string;
  title: string;
  description: string;
  index: number;
}

const AnimatedWeekCard = ({ week, title, description, index }: WeekCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="bg-secondary border-2 border-accent/20 hover:border-accent/50 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 h-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-accent">{week}</span>
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30">
              <span className="text-sm font-bold text-accent">{index + 1}</span>
            </div>
          </div>
          <CardTitle className="text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimatedWeekCard;
