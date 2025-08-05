import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlatformFeatures from '@/components/PlatformFeatures';
import FeaturedContent from '@/components/FeaturedContent';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Desktop Navbar (hidden on mobile) */}
      <div className="hidden md:block sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Mobile Header (shown only on mobile) */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img 
            src="/compus-connect_logo.png"
            alt="Campus Connect"
            className="h-6 w-6 mr-2"
          />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Hero />
        <PlatformFeatures />
        <FeaturedContent />
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
