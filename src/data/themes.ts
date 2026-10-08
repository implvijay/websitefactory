// Complete theme definitions with variants
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
      surface: '#f8fafc',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb',
    },
    typography: { heading: 'Inter', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#1e293b',
      text: '#e2e8f0',
      textMuted: '#94a3b8',
      border: '#334155',
    },
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#ffffff',
      text: '#134e4a',
      textMuted: '#5f7a76',
      border: '#d1e7dd',
    },
    typography: { heading: 'Plus Jakarta Sans', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#fdf4ff',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb',
    },
    typography: { heading: 'Clash Display', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#f9fafb',
      text: '#111827',
      textMuted: '#6b7280',
      border: '#e5e7eb',
    },
    typography: { heading: 'DM Sans', body: 'DM Sans' },
    containerWidth: '1200px',
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
      surface: '#fef3c7',
      text: '#451a03',
      textMuted: '#78716c',
      border: '#d6d3d1',
    },
    typography: { heading: 'Playfair Display', body: 'Lora' },
    containerWidth: '1200px',
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
      surface: '#f3f4f6',
      text: '#111827',
      textMuted: '#6b7280',
      border: '#d1d5db',
    },
    typography: { heading: 'Oswald', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#f5f3ff',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb',
    },
    typography: { heading: 'Inter', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#dcfce7',
      text: '#064e3b',
      textMuted: '#4b7a6f',
      border: '#d1e7dd',
    },
    typography: { heading: 'Nunito', body: 'Nunito' },
    containerWidth: '1200px',
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
      surface: '#f5f5f4',
      text: '#1c1917',
      textMuted: '#57534e',
      border: '#d6d3d1',
    },
    typography: { heading: 'Cormorant Garamond', body: 'Lato' },
    containerWidth: '1200px',
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
      surface: '#fff1f2',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb',
    },
    typography: { heading: 'Poppins', body: 'Inter' },
    containerWidth: '1200px',
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
      surface: '#f5f0eb',
      text: '#1a202c',
      textMuted: '#4a5568',
      border: '#d4c5b0',
    },
    typography: { heading: 'Merriweather', body: 'Source Sans Pro' },
    containerWidth: '1200px',
  },
];

// Generate variants for each theme
export const themeVariants: ThemeVariant[] = themes.flatMap(theme => [
  {
    id: `${theme.id}-dark`,
    themeId: theme.id,
    name: `${theme.name} Dark`,
    colors: {
      ...theme.colors,
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      border: '#334155',
    },
    typography: theme.typography,
    containerWidth: theme.containerWidth,
  },
  {
    id: `${theme.id}-vibrant`,
    themeId: theme.id,
    name: `${theme.name} Vibrant`,
    colors: {
      ...theme.colors,
      primary: adjustColor(theme.colors.primary, 20),
      secondary: adjustColor(theme.colors.secondary, 20),
      accent: adjustColor(theme.colors.accent, 20),
    },
    typography: theme.typography,
    containerWidth: theme.containerWidth,
  },
  {
    id: `${theme.id}-soft`,
    themeId: theme.id,
    name: `${theme.name} Soft`,
    colors: {
      ...theme.colors,
      primary: lightenColor(theme.colors.primary, 30),
      secondary: lightenColor(theme.colors.secondary, 30),
      accent: lightenColor(theme.colors.accent, 30),
      background: '#fafafa',
      surface: '#ffffff',
    },
    typography: theme.typography,
    containerWidth: theme.containerWidth,
  },
]);

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.min(255, (num >> 16) + amt);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const b = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function getTheme(id: string): Theme | undefined {
  return themes.find(t => t.id === id);
}

export function getThemeVariant(id: string): ThemeVariant | undefined {
  return themeVariants.find(v => v.id === id);
}

export function getThemeVariants(themeId: string): ThemeVariant[] {
  return themeVariants.filter(v => v.themeId === themeId);
}

export function getActiveTheme(themeId: string, variantId?: string): Theme | ThemeVariant | undefined {
  if (variantId) {
    return getThemeVariant(variantId);
  }
  return getTheme(themeId);
}
