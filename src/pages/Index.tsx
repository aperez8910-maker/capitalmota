import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Lookbook from "@/components/Lookbook";
import About from "@/components/About";
import CultureBanner from "@/components/CultureBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CultureBanner />
      <Collection />
      <Lookbook />
      <About />
      <CultureBanner />
      <Footer />
    </div>
  );
};

export default Index;
