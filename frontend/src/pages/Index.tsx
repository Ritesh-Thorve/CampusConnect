
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlatformFeatures from '@/components/PlatformFeatures';
import FeaturedContent from '@/components/FeaturedContent';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PlatformFeatures />
      <FeaturedContent />
      <Footer />
    </div>
  );
};

export default Index;
