import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import mamLogo from "@/assets/mam-logo.png";
import { useEffect } from "react";

const Podcast = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (async () => {
        const res = await fetch('https://feeds.buzzsprout.com/2418156.rss');
        if (!res.ok) {
          console.error('RSS Feed Error:', res.status, res.statusText);
          const errorText = await res.text();
          console.error('Error details:', errorText);
          const grid = document.getElementById('podcast-feed');
          if (grid) {
            grid.innerHTML = '<div style="color:#ff4444;padding:20px;text-align:center;">Failed to load podcast feed. Error: ' + res.status + ' ' + res.statusText + '</div>';
          }
          return;
        }
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const items = Array.from(xml.querySelectorAll("item"));
        const grid = document.getElementById('podcast-feed');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const btnContainer = document.getElementById('load-more-container');
        
        if (!grid) return;
        grid.innerHTML = '';
        
        const isMobile = matchMedia("(max-width: 640px)").matches;
        const isTablet = matchMedia("(max-width: 992px)").matches;
        grid.style.gridTemplateColumns = isMobile ? "1fr" : (isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)");
        
        const createCard = (item) => {
          const title = item.querySelector("title")?.textContent ?? "Episode";
          const link = item.querySelector("link")?.textContent ?? "#";
          const desc = (item.querySelector("description")?.textContent ?? "").replace(/<[^>]*>/g,'').slice(0,180) + '…';
          const img = item.querySelector("itunes\\\\:image, image, enclosure[url*='.jpg'], enclosure[url*='.png']")?.getAttribute('href')
                   || item.querySelector("enclosure")?.getAttribute('url') || '';
          const card = document.createElement('a');
          card.href = link; card.target = "_blank"; card.rel="noopener";
          card.style = "display:block;background:#0a0a0a;border:1px solid #222;border-radius:12px;padding:16px;text-decoration:none;color:#fff;transition:transform 0.2s;";
          card.onmouseenter = () => card.style.transform = "translateY(-4px)";
          card.onmouseleave = () => card.style.transform = "translateY(0)";
          card.innerHTML = \`
            <div style="aspect-ratio:1/1;background:#111;border-radius:10px;overflow:hidden;margin-bottom:12px;display:flex;align-items:center;justify-content:center;">
              \${img ? \`<img src="\${img}" alt="" style="width:100%;height:100%;object-fit:cover;">\` : \`<img src="/mam-logo-initials.png" alt="MAM Podcast" style="width:100%;height:100%;object-fit:cover;">\`}
            </div>
            <div style="font-weight:700;font-size:18px;line-height:1.3;margin-bottom:8px;color:#fff;">\${title}</div>
            <div style="font-size:14px;color:#c0c0c0;margin-bottom:12px;">\${desc}</div>
            <button style="background:#d4af37;color:#000;border:none;border-radius:8px;padding:10px 14px;font-weight:700;cursor:pointer;">Listen Now</button>
          \`;
          return card;
        };
        
        // Display first 6 episodes
        const initialItems = items.slice(0, 6);
        const remainingItems = items.slice(6);
        
        initialItems.forEach(item => {
          grid.appendChild(createCard(item));
        });
        
        // Show button only if there are more episodes
        if (remainingItems.length > 0 && btnContainer) {
          btnContainer.style.display = 'flex';
          
          loadMoreBtn.onclick = () => {
            remainingItems.forEach(item => {
              grid.appendChild(createCard(item));
            });
            btnContainer.style.display = 'none';
          };
        } else if (btnContainer) {
          btnContainer.style.display = 'none';
        }
      })();
    `;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-black">
          <div className="container-premium">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Podcast Logo */}
              <div className="mb-8">
                <img src={mamLogo} alt="The Middle-Aged & Miserable Podcast" className="w-full max-w-md mx-auto" />
              </div>

              {/* Title */}
              <h1 className="mb-4 text-4xl font-bold md:text-5xl text-accent">
                The Middle-Aged & Miserable Podcast
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-gray-300 mb-4 max-w-3xl">
                Raw, unfiltered conversations about breaking through the barriers that keep ambitious people stuck in mediocrity. No fluff. No BS. Just real talk for those ready to rise.
              </p>
            </div>
          </div>
        </section>

        {/* Subscribe Buttons */}
        <section className="py-4 bg-black">
          <div className="container-premium">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('https://open.spotify.com/show/54LfdBGDiJrJtPSRAFVWyV?si=e1d3705155764e1a', '_blank')}
              >
                Listen on Spotify
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent text-accent hover:bg-accent hover:text-black"
                onClick={() => window.open('https://podcasts.apple.com/us/podcast/the-middle-aged-miserable-podcast/id1780040120', '_blank')}
              >
                Listen on Apple Podcasts
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('https://www.youtube.com/@patandchris', '_blank')}
              >
                Watch on YouTube
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Episodes Section */}
        <section className="py-6 bg-black">
          <div className="container-premium">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#D4AF37' }}>
              Latest Episodes
            </h2>
            <div 
              id="podcast-feed" 
              style={{
                display: 'grid',
                gap: '24px',
                gridTemplateColumns: 'repeat(3, 1fr)',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '24px'
              }}
            ></div>
            
            {/* Load More Button */}
            <div 
              id="load-more-container"
              style={{
                display: 'none',
                justifyContent: 'center',
                marginTop: '32px'
              }}
            >
              <Button 
                id="load-more-btn"
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
              >
                Click for More Episodes
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Podcast;