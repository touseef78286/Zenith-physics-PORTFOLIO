
import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants';

const PhysicsCursor: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const headGroupRef = useRef<SVGGElement>(null);
  const pointsRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const POINT_COUNT = 12;
  const STIFFNESS = 0.4;
  const DAMPING = 0.6;

  useEffect(() => {
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    pointsRef.current = Array.from({ length: POINT_COUNT }, () => ({
      x: initialX,
      y: initialY,
      vx: 0,
      vy: 0
    }));
    mouseRef.current = { x: initialX, y: initialY };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      const points = pointsRef.current;
      
      points[0].x += (mouseRef.current.x - points[0].x) * 0.5;
      points[0].y += (mouseRef.current.y - points[0].y) * 0.5;

      for (let i = 1; i < POINT_COUNT; i++) {
        const p = points[i];
        const prev = points[i - 1];
        const dx = prev.x - p.x;
        const dy = prev.y - p.y;
        p.vx += dx * STIFFNESS;
        p.vy += dy * STIFFNESS;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Calculate velocity for visual effects
      const velocity = Math.sqrt(
        (mouseRef.current.x - points[0].x) ** 2 + 
        (mouseRef.current.y - points[0].y) ** 2
      );

      // Render Trail with dynamic width
      if (pathRef.current) {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < POINT_COUNT - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          d += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
        }
        pathRef.current.setAttribute('d', d);
        
        // Trail gets thinner as it gets faster/stretched
        const trailWidth = Math.max(1.5, 4 - velocity / 20);
        pathRef.current.setAttribute('stroke-width', trailWidth.toString());
      }

      // Update Custom Cursor Head (The "Sign")
      if (headGroupRef.current) {
        headGroupRef.current.style.transform = `translate(${points[0].x}px, ${points[0].y}px)`;
        
        const brackets = headGroupRef.current.querySelectorAll('.cursor-bracket');
        const centerPoint = headGroupRef.current.querySelector('.cursor-center');

        // Dynamic properties based on velocity and interaction
        const expansion = Math.min(velocity / 5, 12);
        const rotation = velocity * 0.8;
        const scale = isMouseDown ? 0.7 : 1 + (velocity / 100);

        brackets.forEach((b: any, idx) => {
          // Expansion + Slight Rotation
          const offset = 8 + expansion;
          let tx = 0, ty = 0;
          if (idx === 0) { tx = -offset; ty = -offset; } // TL
          if (idx === 1) { tx = offset; ty = -offset; }  // TR
          if (idx === 2) { tx = -offset; ty = offset; }  // BL
          if (idx === 3) { tx = offset; ty = offset; }   // BR
          
          b.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotation}deg) scale(${scale})`;
          b.style.opacity = isMouseDown ? 0.9 : 0.6;
        });

        if (centerPoint) {
          (centerPoint as HTMLElement).style.transform = `scale(${isMouseDown ? 0.5 : 1})`;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isMouseDown]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] mix-blend-screen">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <filter id="cursor-glow-strong" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Trail */}
        <path
          ref={pathRef}
          fill="none"
          stroke={COLORS.cyan}
          strokeOpacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'url(#cursor-glow-strong)' }}
        />

        {/* The Zenith Crosshair Sign */}
        <g ref={headGroupRef} className="will-change-transform">
          {/* Central Point */}
          <circle
            className="cursor-center"
            r="2.5"
            fill={COLORS.cyan}
            style={{ filter: 'url(#cursor-glow-strong)', transition: 'transform 0.1s ease-out' }}
          />

          {/* Corner Brackets */}
          {[
            "M -4 0 V -4 H 0", // Top Left
            "M 4 0 V -4 H 0",  // Top Right
            "M -4 0 V 4 H 0",  // Bottom Left
            "M 4 0 V 4 H 0"   // Bottom Right
          ].map((d, i) => (
            <path
              key={i}
              className="cursor-bracket"
              d={d}
              fill="none"
              stroke={COLORS.cyan}
              strokeWidth="1.2"
              strokeLinecap="square"
              style={{ 
                transition: 'transform 0.1s ease-out, opacity 0.2s',
                filter: 'url(#cursor-glow-strong)'
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PhysicsCursor;
