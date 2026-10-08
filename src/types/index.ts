// Core type definitions for Website Factory

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

// Theme System
export interface DesignTokens {
  colors: {
    primary: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary: string;
    secondaryLight?: string;
    secondaryDark?: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  typography: {
    heading: string;
    body: string;
    headingWeight?: number;
    bodyWeight?: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  containerWidth: string;
}

export interface Theme {
  id: string;
  name: string;
  category: string;
  industry: string;
  tokens: DesignTokens;
  description: string;
  previewImage?: string;
}

export interface ThemeVariant {
  id: string;
  themeId: string;
  name: string;
  variantType: 'default' | 'dark' | 'vibrant' | 'soft';
  tokens: DesignTokens;
  description: string;
}

// Animation System
export interface AnimationConfig {
  type: 'none' | 'fade' | 'slide' | 'scale' | 'bounce';
  duration: number; // milliseconds
  delay: number; // milliseconds
  easing?: string;
}

// Section System
export interface Section {
  id: string;
  type: string;
  variant: string;
  content: Record<string, any>;
  settings: SectionSettings;
  animation: AnimationConfig;
  order: number;
  visible: boolean;
}

export interface SectionSettings {
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  maxWidth?: string;
  alignment?: 'left' | 'center' | 'right';
  customClass?: string;
}

// Page System
export interface Page {
  id: string;
  title: string;
  slug: string;
  sections: Section[];
  seo: PageSEO;
  status: 'draft' | 'published';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Menu System
export interface Menu {
  id: string;
  name: string;
  location: 'primary' | 'utility' | 'footer' | 'mobile' | 'sidebar';
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  type: 'page' | 'url' | 'anchor' | 'email' | 'phone' | 'file';
  target: string;
  children: MenuItem[];
  enabled: boolean;
  openInNewTab: boolean;
  order: number;
}

// Form System
export interface Form {
  id: string;
  name: string;
  fields: FormField[];
  submitAction: 'email' | 'webhook' | 'none';
  submitConfig: Record<string, any>;
  successMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date' | 'file';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: FormValidation;
  order: number;
}

export interface FormValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

// Media System
export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  title?: string;
  uploadedAt: string;
}

// Version System
export interface Version {
  id: string;
  name: string;
  description: string;
  snapshot: ProjectSnapshot;
  createdAt: string;
  createdBy: string;
}

export interface ProjectSnapshot {
  pages: Page[];
  menus: Menu[];
  forms: Form[];
  themeId: string;
  themeVariantId?: string;
  settings: ProjectSettings;
}

// Project (Root Entity)
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
  media: MediaItem[];
  versions: Version[];
  settings: ProjectSettings;
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
    youtube?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    metaPixelId?: string;
    customScripts?: string;
  };
  favicon?: string;
}

// Industry
export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  suggestedPages: string[];
  suggestedTheme: string;
}

// Component Definition
export interface ComponentDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  variants: string[];
  defaultContent: Record<string, any>;
  description: string;
}

// Export Types
export type ExportFormat = 'html' | 'laravel' | 'react';

export interface ExportOptions {
  format: ExportFormat;
  minify: boolean;
  includeSitemap: boolean;
  includeRobots: boolean;
  projectName: string;
}

export interface ExportResult {
  success: boolean;
  files: Record<string, string>;
  errors: string[];
  warnings: string[];
}

// Validation
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number;
}

export interface ValidationError {
  code: string;
  message: string;
  path?: string;
  severity: 'error';
}

export interface ValidationWarning {
  code: string;
  message: string;
  path?: string;
  severity: 'warning';
}
