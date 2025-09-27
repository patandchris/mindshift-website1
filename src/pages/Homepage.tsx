import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MindShiftOverview from "@/components/MindShiftOverview";
import Testimonials from "@/components/Testimonials";
import PodcastPromo from "@/components/PodcastPromo";
import Footer from "@/components/Footer";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MindShiftOverview />
        <Testimonials />
        <PodcastPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;