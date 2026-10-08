// Theme Engine Service - Theme management with variants
import type { Theme, ThemeVariant } from '../../types';
import { themes } from '../../data/themes';
import { themeVariants, getThemeVariant, getThemeVariants } from '../../data/themeVariants';

export class ThemeEngine {
  async getAllThemes(): Promise<Theme[]> {
    return themes;
  }

  async getTheme(themeId: string): Promise<Theme | null> {
    return themes.find(t => t.id === themeId) || null;
  }

  async getAllVariants(): Promise<ThemeVariant[]> {
    return themeVariants;
  }

  async getVariant(variantId: string): Promise<ThemeVariant | null> {
    return getThemeVariant(variantId) || null;
  }

  async getVariantsForTheme(themeId: string): Promise<ThemeVariant[]> {
    return getThemeVariants(themeId);
  }

  async getActiveTheme(themeId: string, variantId?: string): Promise<Theme | ThemeVariant | null> {
    if (variantId) {
      return getThemeVariant(variantId) || null;
    }
    return themes.find(t => t.id === themeId) || null;
  }

  generateCSSVariables(theme: Theme | ThemeVariant): string {
    const tokens = theme.tokens;
    return `
:root {
  --color-primary: ${tokens.colors.primary};
  --color-primary-light: ${tokens.colors.primaryLight || tokens.colors.primary};
  --color-primary-dark: ${tokens.colors.primaryDark || tokens.colors.primary};
  --color-secondary: ${tokens.colors.secondary};
  --color-accent: ${tokens.colors.accent};
  --color-background: ${tokens.colors.background};
  --color-surface: ${tokens.colors.surface};
  --color-text: ${tokens.colors.text};
  --color-text-muted: ${tokens.colors.textMuted};
  --color-border: ${tokens.colors.border};
  
  --font-heading: ${tokens.typography.heading}, sans-serif;
  --font-body: ${tokens.typography.body}, sans-serif;
  --font-weight-heading: ${tokens.typography.headingWeight || 700};
  --font-weight-body: ${tokens.typography.bodyWeight || 400};
  
  --spacing-xs: ${tokens.spacing.xs};
  --spacing-sm: ${tokens.spacing.sm};
  --spacing-md: ${tokens.spacing.md};
  --spacing-lg: ${tokens.spacing.lg};
  --spacing-xl: ${tokens.spacing.xl};
  --spacing-2xl: ${tokens.spacing['2xl']};
  
  --radius-none: ${tokens.borderRadius.none};
  --radius-sm: ${tokens.borderRadius.sm};
  --radius-md: ${tokens.borderRadius.md};
  --radius-lg: ${tokens.borderRadius.lg};
  --radius-xl: ${tokens.borderRadius.xl};
  --radius-full: ${tokens.borderRadius.full};
  
  --shadow-sm: ${tokens.shadows.sm};
  --shadow-md: ${tokens.shadows.md};
  --shadow-lg: ${tokens.shadows.lg};
  --shadow-xl: ${tokens.shadows.xl};
  
  --container-width: ${tokens.containerWidth};
}
    `.trim();
  }
}

export const themeEngine = new ThemeEngine();
