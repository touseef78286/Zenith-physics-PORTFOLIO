
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../constants';

type AnimationStage = 'alias' | 'dispersing' | 'main';

const Hero: React.FC = () => {
  const [stage, setStage] = useState<AnimationStage>('alias');
  
  useEffect(() => {
    const aliasTimer = setTimeout(() => setStage('dispersing'), 2000);
    const mainTimer = setTimeout(() => setStage('main'), 2600);
    
    return () => {
      clearTimeout(aliasTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  const firstName = "Touseef";
  const lastName = "Panjtan";
  const alias = "OREWA_ZENITH";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const letterVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.9,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const particleVariants = {
    exit: (i: number) => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      opacity: 0,
      scale: 0,
      rotate: Math.random() * 360,
      filter: 'blur(20px)',
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-32 pb-20">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          scale: stage === 'alias' ? 1 : 1.5,
          opacity: stage === 'alias' ? 0.05 : 0.08
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500 blur-[180px] pointer-events-none rounded-full" 
      />
      
      <div className="relative z-10 text-center w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 inline-block py-1.5 px-5 glass rounded-full"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400">
            Defining the Zenith of Digital Engineering
          </span>
        </motion.div>

        {/* Increased min-height for name container to prevent collision */}
        <div className="relative min-h-[300px] md:min-h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {stage === 'alias' && (
              <motion.div
                key="alias-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full"
              >
                <h1 
                  data-text={alias}
                  className="glitch text-5xl md:text-9xl font-black heading-font tracking-tighter"
                >
                  {alias}
                </h1>
              </motion.div>
            )}

            {stage === 'dispersing' && (
              <motion.div
                key="dispersing-stage"
                className="flex items-center justify-center flex-wrap w-full"
              >
                {alias.split('').map((char, i) => (
                  <motion.span
                    key={`p-${i}`}
                    custom={i}
                    variants={particleVariants}
                    animate="exit"
                    className="text-5xl md:text-9xl font-black heading-font tracking-tighter inline-block text-cyan-400"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {stage === 'main' && (
              <motion.div
                key="main-stage"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center gap-2 md:gap-6 w-full"
              >
                {/* First Name Row */}
                <div className="flex flex-wrap justify-center">
                  {firstName.split('').map((char, i) => (
                    <motion.span
                      key={`first-${i}`}
                      variants={letterVariants}
                      className="text-7xl md:text-[10rem] font-black heading-font tracking-tight text-white leading-none"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                
                {/* Last Name Row */}
                <div className="flex flex-wrap justify-center">
                  {lastName.split('').map((char, i) => (
                    <motion.span
                      key={`last-${i}`}
                      variants={letterVariants}
                      className="text-7xl md:text-[10rem] font-black heading-font tracking-tight text-white leading-none"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Increased Top Margin for Breathing Room */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: stage === 'main' ? 1 : 0, y: stage === 'main' ? 0 : 30 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 md:mt-32" 
        >
          <p className="text-xl md:text-3xl text-gray-500 font-light max-w-3xl mx-auto italic leading-relaxed">
            Architecting systems that breathe through <span className="text-cyan-400">Gravity & Light</span>.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="mt-20 text-[10px] tracking-[0.5em] uppercase font-bold text-gray-600 flex items-center gap-6 justify-center"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gray-800" />
            Scroll to explore
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gray-800" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0" />
      </motion.div>
    </section>
  );
};

export default Hero;
