import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlatformFeatures from '@/components/PlatformFeatures';
import FeaturedContent from '@/components/FeaturedContent';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top (hidden on mobile) */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Main content with padding adjusted for mobile bottom nav */}
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <PlatformFeatures />
        <FeaturedContent />
      </main>
      
      {/* Footer - hidden on mobile since we have bottom nav */}
      <div className="hidden md:block">
        <Footer />
      </div>
      
      {/* Mobile bottom nav (shown only on mobile) */}
      <div className="md:hidden fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Index;