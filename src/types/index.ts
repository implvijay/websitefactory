// Core type definitions for Website Factory

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'designer' | 'viewer';
}

export interface Theme {
  id: string;
  name: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface?: string;
    text: string;
    textMuted?: string;
    border?: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  containerWidth?: string;
}

export interface ThemeVariant {
  id: string;
  themeId: string;
  name: string;
  colors: Theme['colors'];
  typography: Theme['typography'];
  containerWidth?: string;
}

export interface Section {
  id: string;
  type: string;
  content: Record<string, any>;
  animation?: AnimationSettings;
  style?: SectionStyle;
}

export interface AnimationSettings {
  type: 'none' | 'fadeIn' | 'slideUp' | 'slideLeft' | 'scale' | 'bounce';
  duration: number;
  delay: number;
}

export interface SectionStyle {
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  sections: Section[];
  layout: PageLayout;
  variant?: string;
}

export interface PageLayout {
  type: 'full-width' | 'boxed' | 'sidebar-left' | 'sidebar-right';
  maxWidth: string;
  padding: string;
}

export interface PageVariant {
  id: string;
  pageId: string;
  name: string;
  layout: PageLayout;
  sections: Section[];
}

export interface MenuItem {
  id: string;
  label: string;
  type: 'page' | 'url' | 'anchor';
  target: string;
  children?: MenuItem[];
  order: number;
}

export interface Menu {
  id: string;
  name: string;
  location: 'header' | 'footer' | 'sidebar';
  items: MenuItem[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  themeId: string;
  themeVariantId?: string;
  pages: Page[];
  pageVariants: PageVariant[];
  menus: Menu[];
  createdAt: string;
  updatedAt: string;
}
