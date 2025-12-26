
// Fix: Import React to resolve 'Cannot find namespace React' for React.ReactNode
import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  color: string;
  icon: string;
}

export interface BentoItemProps {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  className?: string;
  onFlickIntoHole?: (id: string) => void;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}
