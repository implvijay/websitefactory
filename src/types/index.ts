// Complete type definitions for Website Factory

export type UserRole = 'administrator' | 'developer' | 'designer' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

export interface Session {
  token: string;
  userId: string;
  expiresAt: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  industry: string;
  themeId: string;
  themeVariantId?: string;
  pages: Page[];
  menus: Menu[];
  forms: Form[];
  settings: ProjectSettings;
  versions: Version[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  sections: Section[];
  layout: PageLayout;
  seo: PageSEO;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface PageLayout {
  type: 'full-width' | 'container' | 'sidebar-left' | 'sidebar-right';
  maxWidth: string;
  padding: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
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

export interface Menu {
  id: string;
  name: string;
  location: 'header' | 'footer' | 'sidebar';
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  type: 'page' | 'url' | 'anchor';
  target: string;
  order: number;
}

export interface Form {
  id: string;
  name: string;
  fields: FormField[];
  submitAction: 'email' | 'webhook' | 'none';
  submitConfig: Record<string, any>;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date' | 'file';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface Version {
  id: string;
  name: string;
  timestamp: string;
  snapshot: any;
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

export interface ComponentDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  variants: string[];
  defaultContent: Record<string, any>;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  suggestedPages: string[];
}
