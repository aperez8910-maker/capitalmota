import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import About from "@/components/About";
import CultureBanner from "@/components/CultureBanner";
import Culture from "@/components/Culture";
import VideoLookbook from "@/components/VideoLookbook";
import ShippingInfo from "@/components/ShippingInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CultureBanner />
      <Collection />
      <VideoLookbook />
      <Culture />
      <About />
      <ShippingInfo />
      <FAQ />
      <CultureBanner />
      <Footer />
    </div>
  );
};

export default Index;
