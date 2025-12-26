
import React, { useEffect, useRef } from 'react';
import PhysicsCursor from './components/PhysicsCursor';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center pointer-events-none">
    <div className="pointer-events-auto">
      <h1 className="text-xl font-bold heading-font tracking-tighter group cursor-pointer">
        OREWA_<span className="text-cyan-400 group-hover:text-pink-500 transition-colors">ZENITH</span>
      </h1>
    </div>
    <div className="flex gap-8 pointer-events-auto items-center">
      {['Work', 'Engine', 'Contact'].map(link => (
        <a 
          key={link} 
          href={`#${link.toLowerCase()}`}
          className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
        >
          {link}
        </a>
      ))}
      <button className="glass px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300">
        Hire Me
      </button>
    </div>
  </nav>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Performance log
  useEffect(() => {
    console.log("%c[ZENITH PHYSICS] System Initialized at 60FPS", "color: #00F2FF; font-weight: bold; font-size: 14px;");
    console.log("%c[USER AGENT] " + navigator.userAgent, "color: #666; font-size: 10px;");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 origin-left z-[1000]"
        style={{ scaleX }}
      />
      
      <PhysicsCursor />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        <div id="work" className="py-20">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <h2 className="text-5xl font-black heading-font flex items-center gap-4">
              <span className="text-cyan-400">01.</span> THE LAB
            </h2>
            <p className="text-gray-500 mt-4 max-w-md">
              A curated selection of experiments in gravity, motion, and high-end aesthetics. 
              <span className="block italic text-gray-600">Tip: Try dragging the blocks or throwing them into the Zenith Void.</span>
            </p>
          </div>
          <BentoGrid />
        </div>

        {/* Footer */}
        <footer className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-600 mb-2">Designed & Engineered by</p>
              <h3 className="text-2xl font-black heading-font">TOUSEEF PANJTAN</h3>
              <p className="text-gray-500 text-sm">© 2024 Zenith Physics. All rights reserved.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-xs font-mono text-cyan-400/50"># obsidian_glass_v1.0.4</span>
              <div className="flex gap-6 text-gray-400">
                <span className="hover:text-white cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest">Github</span>
                <span className="hover:text-white cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest">Twitter</span>
                <span className="hover:text-white cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest">LinkedIn</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Background Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default App;
