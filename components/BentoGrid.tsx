
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Project, BentoItemProps } from '../types';
import { COLORS, PROJECTS, ICONS } from '../constants';

const BlackHole: React.FC<{ active: boolean }> = ({ active }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: active ? 1.5 : 1, 
      opacity: active ? 1 : 0.4,
      rotate: 360 
    }}
    transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
    className="fixed bottom-10 right-10 w-24 h-24 rounded-full flex items-center justify-center z-50 overflow-hidden pointer-events-none"
    style={{
      background: `radial-gradient(circle, #000 30%, ${COLORS.cyan} 70%, transparent 100%)`,
      boxShadow: active ? `0 0 50px ${COLORS.cyan}` : 'none'
    }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle,_#00F2FF22_1px,_transparent_1px)] bg-[size:10px_10px]" />
    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 opacity-60">Zenith Void</span>
  </motion.div>
);

const BentoItem: React.FC<BentoItemProps & { onDragEnd: (id: string, info: any) => void }> = ({ 
  id, title, subtitle, content, className, onDragEnd 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  return (
    <motion.div
      layout
      drag
      dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      dragElastic={0.05}
      whileDrag={{ scale: 1.02, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.01 }}
      onDragEnd={(_, info) => onDragEnd(id, info)}
      style={{ x, y, rotateX, rotateY, perspective: 1200 }}
      className={`glass rounded-[2rem] p-8 cursor-grab relative group overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -inset-px rounded-[2rem] border border-white/10 group-hover:border-cyan-400/30 transition-colors pointer-events-none" />
      
      <div className="relative z-10 w-full">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400/60 mb-3 block">{subtitle}</span>
        <h3 className="text-3xl font-bold heading-font tracking-tight mb-4 group-hover:text-cyan-400 transition-colors duration-500">{title}</h3>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {content}
      </div>
    </motion.div>
  );
};

const BentoGrid: React.FC = () => {
  const [items, setItems] = useState<Project[]>(PROJECTS);
  const [isHoveringHole, setIsHoveringHole] = useState(false);

  const handleDragEnd = (id: string, info: any) => {
    const HOLE_SIZE = 140;
    const holeX = window.innerWidth - 80;
    const holeY = window.innerHeight - 80;
    const distance = Math.sqrt(Math.pow(info.point.x - holeX, 2) + Math.pow(info.point.y - holeY, 2));

    if (distance < HOLE_SIZE) {
      setItems(prev => prev.filter(item => item.id !== id));
      setIsHoveringHole(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[340px]">
        
        {/* About Section - Large Anchor */}
        <BentoItem
          id="about"
          title="The Zenith Identity"
          subtitle="Engineering Masterpiece"
          className="md:col-span-8"
          onDragEnd={handleDragEnd}
          content={
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl font-light">
              Architecting digital experiences at the intersection of <span className="text-white font-medium">premium aesthetics</span> and <span className="text-white font-medium">complex physics</span>. 
              Pushing boundaries under the <span className="text-cyan-400 font-bold">Zenith</span> banner.
            </p>
          }
        />

        {/* First Project in Row 1 */}
        {items[0] && (
          <BentoItem
            key={items[0].id}
            id={items[0].id}
            title={items[0].title}
            subtitle={items[0].category}
            className="md:col-span-4"
            onDragEnd={handleDragEnd}
            content={
              <div className="space-y-6">
                <p className="text-sm text-gray-500 leading-relaxed">{items[0].description}</p>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl glass text-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
                    {ICONS[items[0].icon]}
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase py-3 px-6 rounded-full glass hover:bg-white/10 transition-all">
                    Explore {ICONS.external}
                  </button>
                </div>
              </div>
            }
          />
        )}

        {/* Row 2: Projects 2, 3 and Contact Block (All equal size) */}
        <AnimatePresence mode="popLayout">
          {items.slice(1).map((project) => (
            <BentoItem
              key={project.id}
              id={project.id}
              title={project.title}
              subtitle={project.category}
              className="md:col-span-4"
              onDragEnd={handleDragEnd}
              content={
                <div className="space-y-6">
                  <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-4 rounded-2xl glass" 
                      style={{ color: project.color, boxShadow: `0 0 25px ${project.color}15` }}
                    >
                      {ICONS[project.icon]}
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase py-3 px-6 rounded-full glass hover:bg-white/10 transition-all">
                      Explore {ICONS.external}
                    </button>
                  </div>
                </div>
              }
            />
          ))}

          {/* Contact Block to fill the grid if items are removed or present */}
          <BentoItem
            id="contact"
            title="Let's Build"
            subtitle="Secure Node"
            className="md:col-span-4"
            onDragEnd={handleDragEnd}
            content={
              <div className="flex flex-col gap-6">
                <a href="mailto:touseefpanjtan52@gmail.com" className="text-lg text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                  {ICONS.mail} touseefpanjtan52@gmail.com
                </a>
                <div className="flex gap-6 items-center">
                  {[ICONS.github, ICONS.linkedin, ICONS.twitter].map((icon, i) => (
                    <div key={i} className="text-gray-500 hover:text-cyan-400 transition-all cursor-pointer hover:scale-110">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </AnimatePresence>

      </div>
      <BlackHole active={isHoveringHole} />
    </div>
  );
};

export default BentoGrid;
