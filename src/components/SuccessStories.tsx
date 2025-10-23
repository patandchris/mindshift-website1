import { Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SuccessStories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const videoUrl = "https://onbxflybhvpksyxpsdxm.supabase.co/storage/v1/object/public/testimonials//6gi88eyrjhi.mp4";

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section id="success-stories" className="section-padding" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Title with Animated Underline */}
        <div className="text-center mb-16">
          <h2 className="mb-3 text-4xl md:text-5xl font-bold" style={{ color: '#D4AF37' }}>
            Real Results from Real Clients
          </h2>
          <div className="flex justify-center mb-6">
            <div 
              className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-1000"
              style={{ 
                width: isVisible ? '200px' : '0px',
                boxShadow: '0 0 10px #D4AF37'
              }}
            />
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#FFFFFF' }}>
            See how ambitious professionals like you have transformed their mindset and achieved breakthrough results with The MindShift System.
          </p>
        </div>

        {/* Featured Video Testimonial */}
        <div 
          ref={sectionRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
            {/* Video Container - Left on Desktop */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#D4AF37' }}>
                Client Success Story
              </h3>
              <div 
                className="relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group max-w-sm mx-auto lg:mx-0"
                style={{ 
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
                }}
                onClick={handleVideoClick}
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  controls={isPlaying}
                  controlsList="nodownload"
                />
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300"
                    onClick={handlePlayClick}
                  >
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        border: '3px solid #D4AF37',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      <Play className="w-8 h-8 ml-1" style={{ color: '#D4AF37' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Text Testimonial - Right on Desktop */}
            <div className="w-full lg:w-1/2">
              <blockquote className="text-lg leading-relaxed mb-6" style={{ color: '#FFFFFF' }}>
                "Thanks to the MindShift coaching program, I learned that to achieve my future goals, first I have to change myself. I have to think, act and believe differently, and that's what I've been doing since starting MindShift.
                <br /><br />
                By applying all aspects covered by this MindShift Coaching Program, I've been noticing significant changes regarding the way I think, my actions and beliefs. This is bringing me unexpected results, awareness, and new knowledge in areas that I've never thought possible before. It's like opening a treasure chest every day, and it's really changing my behaviors and my life!"
              </blockquote>
              <p className="italic text-lg" style={{ color: '#D4AF37' }}>
                – Haroldo Chacon, Aerospace Structural Engineer
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;