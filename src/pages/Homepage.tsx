import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import BeTheFirstToKnow from "@/components/BeTheFirstToKnow";
import PodcastPromo from "@/components/PodcastPromo";
import Footer from "@/components/Footer";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <SuccessStories />
        <BeTheFirstToKnow />
        <PodcastPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;