import type { Theme, ThemeVariant } from '../types';

export const themes: Theme[] = [
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'Corporate',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  {
    id: 'tech-dark',
    name: 'Tech Dark',
    category: 'Technology',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#0f172a',
      text: '#e2e8f0',
    },
    typography: {
      heading: 'Space Grotesk',
      body: 'Inter',
    },
  },
  {
    id: 'healthcare-clean',
    name: 'Healthcare Clean',
    category: 'Healthcare',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#10b981',
      background: '#f0fdfa',
      text: '#134e4a',
    },
    typography: {
      heading: 'Plus Jakarta Sans',
      body: 'Inter',
    },
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    category: 'Creative',
    colors: {
      primary: '#ec4899',
      secondary: '#a855f7',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      heading: 'Clash Display',
      body: 'Inter',
    },
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    category: 'Minimal',
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#2563eb',
      background: '#ffffff',
      text: '#111827',
    },
    typography: {
      heading: 'DM Sans',
      body: 'DM Sans',
    },
  },
  {
    id: 'warm-earth',
    name: 'Warm Earth',
    category: 'Hospitality',
    colors: {
      primary: '#92400e',
      secondary: '#d97706',
      accent: '#dc2626',
      background: '#fffbeb',
      text: '#451a03',
    },
    typography: {
      heading: 'Playfair Display',
      body: 'Lora',
    },
  },
  {
    id: 'industrial-strong',
    name: 'Industrial Strong',
    category: 'Industrial',
    colors: {
      primary: '#1f2937',
      secondary: '#f59e0b',
      accent: '#dc2626',
      background: '#ffffff',
      text: '#111827',
    },
    typography: {
      heading: 'Oswald',
      body: 'Inter',
    },
  },
  {
    id: 'saas-gradient',
    name: 'SaaS Gradient',
    category: 'SaaS',
    colors: {
      primary: '#7c3aed',
      secondary: '#2563eb',
      accent: '#06b6d4',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  {
    id: 'nature-green',
    name: 'Nature Green',
    category: 'Education',
    colors: {
      primary: '#065f46',
      secondary: '#10b981',
      accent: '#f59e0b',
      background: '#f0fdf4',
      text: '#064e3b',
    },
    typography: {
      heading: 'Nunito',
      body: 'Nunito',
    },
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    category: 'Luxury',
    colors: {
      primary: '#1c1917',
      secondary: '#d4af37',
      accent: '#78716c',
      background: '#fafaf9',
      text: '#1c1917',
    },
    typography: {
      heading: 'Cormorant Garamond',
      body: 'Lato',
    },
  },
  {
    id: 'startup-vibrant',
    name: 'Startup Vibrant',
    category: 'Startup',
    colors: {
      primary: '#f43f5e',
      secondary: '#fb923c',
      accent: '#8b5cf6',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      heading: 'Poppins',
      body: 'Inter',
    },
  },
  {
    id: 'classic-serif',
    name: 'Classic Serif',
    category: 'Professional',
    colors: {
      primary: '#1e3a5f',
      secondary: '#2c5282',
      accent: '#c9a961',
      background: '#faf8f5',
      text: '#1a202c',
    },
    typography: {
      heading: 'Merriweather',
      body: 'Source Sans Pro',
    },
  },
];

export const themeVariants: ThemeVariant[] = [
  // Corporate Blue Variants
  {
    id: 'corporate-blue-dark',
    themeId: 'corporate-blue',
    name: 'Corporate Blue Dark',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      background: '#0f172a',
      text: '#e2e8f0',
    },
    typography: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  {
    id: 'corporate-blue-vibrant',
    themeId: 'corporate-blue',
    name: 'Corporate Blue Vibrant',
    colors: {
      primary: '#2563eb',
      secondary: '#60a5fa',
      accent: '#fbbf24',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  {
    id: 'corporate-blue-soft',
    themeId: 'corporate-blue',
    name: 'Corporate Blue Soft',
    colors: {
      primary: '#3b82f6',
      secondary: '#93c5fd',
      accent: '#fcd34d',
      background: '#f8fafc',
      text: '#334155',
    },
    typography: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  
  // Tech Dark Variants
  {
    id: 'tech-dark-light',
    themeId: 'tech-dark',
    name: 'Tech Dark Light',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      heading: 'Space Grotesk',
      body: 'Inter',
    },
  },
  {
    id: 'tech-dark-vibrant',
    themeId: 'tech-dark',
    name: 'Tech Dark Vibrant',
    colors: {
      primary: '#818cf8',
      secondary: '#a78bfa',
      accent: '#22d3ee',
      background: '#0f172a',
      text: '#f1f5f9',
    },
    typography: {
      heading: 'Space Grotesk',
      body: 'Inter',
    },
  },
  {
    id: 'tech-dark-soft',
    themeId: 'tech-dark',
    name: 'Tech Dark Soft',
    colors: {
      primary: '#a5b4fc',
      secondary: '#c4b5fd',
      accent: '#67e8f9',
      background: '#1e293b',
      text: '#cbd5e1',
    },
    typography: {
      heading: 'Space Grotesk',
      body: 'Inter',
    },
  },
  
  // Healthcare Clean Variants
  {
    id: 'healthcare-clean-dark',
    themeId: 'healthcare-clean',
    name: 'Healthcare Clean Dark',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#10b981',
      background: '#0f172a',
      text: '#e2e8f0',
    },
    typography: {
      heading: 'Plus Jakarta Sans',
      body: 'Inter',
    },
  },
  {
    id: 'healthcare-clean-vibrant',
    themeId: 'healthcare-clean',
    name: 'Healthcare Clean Vibrant',
    colors: {
      primary: '#38bdf8',
      secondary: '#22d3ee',
      accent: '#34d399',
      background: '#f0fdfa',
      text: '#134e4a',
    },
    typography: {
      heading: 'Plus Jakarta Sans',
      body: 'Inter',
    },
  },
  {
    id: 'healthcare-clean-soft',
    themeId: 'healthcare-clean',
    name: 'Healthcare Clean Soft',
    colors: {
      primary: '#7dd3fc',
      secondary: '#67e8f9',
      accent: '#6ee7b7',
      background: '#ffffff',
      text: '#475569',
    },
    typography: {
      heading: 'Plus Jakarta Sans',
      body: 'Inter',
    },
  },
];

export function getTheme(id: string): Theme | undefined {
  return themes.find(t => t.id === id);
}

export function getThemeVariant(id: string): ThemeVariant | undefined {
  return themeVariants.find(v => v.id === id);
}

export function getThemeVariants(themeId: string): ThemeVariant[] {
  return themeVariants.filter(v => v.themeId === themeId);
}
