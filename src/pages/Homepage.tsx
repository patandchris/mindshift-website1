import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import BeTheFirstToKnow from "@/components/BeTheFirstToKnow";
import PodcastPromo from "@/components/PodcastPromo";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="container-premium py-8">
          <Separator className="bg-gradient-gold h-[2px]" />
        </div>
        <SuccessStories />
        <div className="container-premium py-8">
          <Separator className="bg-gradient-gold h-[2px]" />
        </div>
        <BeTheFirstToKnow />
        <div className="container-premium py-12">
          <Separator className="bg-gradient-gold h-[2px]" />
        </div>
        <PodcastPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;