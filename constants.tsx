
import React from 'react';
import { Layout, Cpu, Globe, Zap, Mail, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { Project } from './types';

export const COLORS = {
  base: '#050505',
  surface: '#121212',
  cyan: '#00F2FF',
  pink: '#FF0055',
  gold: '#FFD700',
  white: '#FFFFFF'
};

export const PROJECTS: Project[] = [
  {
    id: 'prj-1',
    title: 'Aura UI',
    category: 'Design System',
    description: 'A gravity-based component library for high-end web apps.',
    color: COLORS.cyan,
    icon: 'layout'
  },
  {
    id: 'prj-2',
    title: 'Synapse',
    category: 'Neural Engine',
    description: 'Real-time data visualization of neural network pathways.',
    color: COLORS.pink,
    icon: 'cpu'
  },
  {
    id: 'prj-3',
    title: 'Ethereal',
    category: 'E-commerce',
    description: 'Luxury shopping experience with fluid transitions.',
    color: COLORS.gold,
    icon: 'globe'
  }
];

export const ICONS: Record<string, React.ReactNode> = {
  layout: <Layout className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  mail: <Mail className="w-6 h-6" />,
  github: <Github className="w-6 h-6" />,
  twitter: <Twitter className="w-6 h-6" />,
  linkedin: <Linkedin className="w-6 h-6" />,
  external: <ExternalLink className="w-4 h-4" />
};
