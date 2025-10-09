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
        const res = await fetch('https://rss.app/feeds/MCbM8cGxDw2hXcu5.xml');
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const items = Array.from(xml.querySelectorAll("item"));
        const grid = document.getElementById('podcast-feed');
        if (!grid) return;
        const isMobile = matchMedia("(max-width: 640px)").matches;
        const isTablet = matchMedia("(max-width: 992px)").matches;
        grid.style.gridTemplateColumns = isMobile ? "1fr" : (isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)");
        items.forEach(item => {
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
          grid.appendChild(card);
        });
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
              <p className="text-lg text-gray-300 mb-12 max-w-3xl">
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
                Subscribe on Spotify
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent text-accent hover:bg-accent hover:text-black"
              >
                Subscribe on Apple Podcasts
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-black font-semibold hover:shadow-glow transition-all duration-300"
                onClick={() => window.open('https://www.youtube.com/@patandchris', '_blank')}
              >
                Subscribe on YouTube
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
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Podcast;