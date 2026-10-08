// Theme variants - 36 variants (3 per base theme)
import type { ThemeVariant } from '../types';
import { themes } from './themes';

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

export const themeVariants: ThemeVariant[] = themes.flatMap(theme => [
  // Dark variant
  {
    id: `${theme.id}-dark`,
    themeId: theme.id,
    name: `${theme.name} Dark`,
    variantType: 'dark' as const,
    tokens: {
      ...theme.tokens,
      colors: {
        ...theme.tokens.colors,
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
        textMuted: '#94a3b8',
        border: '#334155',
      },
    },
    description: `Dark mode variant of ${theme.name}`,
  },
  // Vibrant variant
  {
    id: `${theme.id}-vibrant`,
    themeId: theme.id,
    name: `${theme.name} Vibrant`,
    variantType: 'vibrant' as const,
    tokens: {
      ...theme.tokens,
      colors: {
        ...theme.tokens.colors,
        primary: adjustColor(theme.tokens.colors.primary, 20),
        secondary: adjustColor(theme.tokens.colors.secondary, 20),
        accent: adjustColor(theme.tokens.colors.accent, 20),
      },
    },
    description: `Vibrant color variant of ${theme.name}`,
  },
  // Soft variant
  {
    id: `${theme.id}-soft`,
    themeId: theme.id,
    name: `${theme.name} Soft`,
    variantType: 'soft' as const,
    tokens: {
      ...theme.tokens,
      colors: {
        ...theme.tokens.colors,
        primary: lightenColor(theme.tokens.colors.primary, 30),
        secondary: lightenColor(theme.tokens.colors.secondary, 30),
        accent: lightenColor(theme.tokens.colors.accent, 30),
        background: '#fafafa',
        surface: '#ffffff',
      },
    },
    description: `Soft pastel variant of ${theme.name}`,
  },
]);

export function getThemeVariant(id: string): ThemeVariant | undefined {
  return themeVariants.find(v => v.id === id);
}

export function getThemeVariants(themeId: string): ThemeVariant[] {
  return themeVariants.filter(v => v.themeId === themeId);
}

export function getActiveTheme(themeId: string, variantId?: string): any {
  if (variantId) {
    return getThemeVariant(variantId);
  }
  return themes.find(t => t.id === themeId);
}
