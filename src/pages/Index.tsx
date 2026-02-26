import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import About from "@/components/About";
import CultureBanner from "@/components/CultureBanner";
import VideoLookbook from "@/components/VideoLookbook";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CultureBanner />
      <Collection />
      <VideoLookbook />
      <About />
      <CultureBanner />
      <Footer />
    </div>
  );
};

export default Index;
