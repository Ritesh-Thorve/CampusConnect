'use client';

import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlatformFeatures from '@/components/PlatformFeatures';
import FeaturedContent from '@/components/FeaturedContent';
import Footer from '@/components/Footer';

// Motion variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Desktop Navbar */}
      <div className="hidden md:block sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Mobile Header */}
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
      <main className="flex-1 pb-20 space-y-16">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <PlatformFeatures />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FeaturedContent />
        </motion.div>
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
