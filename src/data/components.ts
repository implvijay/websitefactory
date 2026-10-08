// Component definitions for page builder
import type { ComponentDefinition } from '../types';

export const componentDefinitions: ComponentDefinition[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    category: 'Hero',
    icon: '🎯',
    variants: ['centered', 'split', 'video', 'fullscreen'],
    description: 'Large hero banner with heading and call-to-action',
    defaultContent: {
      heading: 'Welcome to Our Website',
      description: 'We provide excellent services for your business needs.',
      buttonText: 'Get Started',
      buttonUrl: '#contact',
      backgroundImage: '',
    },
  },
  {
    id: 'features',
    name: 'Features',
    category: 'Content',
    icon: '⭐',
    variants: ['grid', 'list', 'cards'],
    description: 'Feature highlights with icons and descriptions',
    defaultContent: {
      title: 'Our Features',
      features: [
        { icon: '⚡', title: 'Fast', description: 'Lightning fast performance' },
        { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
        { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
      ],
    },
  },
  {
    id: 'services',
    name: 'Services',
    category: 'Content',
    icon: '🔧',
    variants: ['grid', 'list', 'cards'],
    description: 'Service offerings with icons and descriptions',
    defaultContent: {
      title: 'Our Services',
      description: 'Comprehensive solutions tailored to your needs',
      services: [
        { icon: '📊', title: 'Service One', description: 'Detailed description of service one' },
        { icon: '📋', title: 'Service Two', description: 'Detailed description of service two' },
        { icon: '🎯', title: 'Service Three', description: 'Detailed description of service three' },
      ],
    },
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    category: 'Social Proof',
    icon: '💬',
    variants: ['carousel', 'grid', 'slider'],
    description: 'Customer testimonials with ratings',
    defaultContent: {
      title: 'What Our Clients Say',
      testimonials: [
        { name: 'John Doe', role: 'CEO, Company', text: 'Excellent service! Highly recommended.', rating: 5 },
        { name: 'Jane Smith', role: 'Director, Corp', text: 'Professional and reliable team.', rating: 5 },
      ],
    },
  },
  {
    id: 'cta',
    name: 'Call to Action',
    category: 'Conversion',
    icon: '📢',
    variants: ['centered', 'split', 'banner'],
    description: 'Call-to-action section with button',
    defaultContent: {
      heading: 'Ready to Get Started?',
      description: 'Contact us today to learn more about our services.',
      buttonText: 'Contact Us',
      buttonUrl: '#contact',
    },
  },
  {
    id: 'text',
    name: 'Text Block',
    category: 'Content',
    icon: '📝',
    variants: ['left', 'center', 'right'],
    description: 'Rich text content block',
    defaultContent: {
      content: 'Your text content goes here. Edit this to add your own text.',
    },
  },
  {
    id: 'contact',
    name: 'Contact Info',
    category: 'Conversion',
    icon: '📧',
    variants: ['simple', 'detailed', 'split'],
    description: 'Contact information display',
    defaultContent: {
      title: 'Contact Us',
      description: 'Get in touch with us today.',
      email: 'info@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State',
    },
  },
];

export function getComponentDefinition(type: string): ComponentDefinition | undefined {
  return componentDefinitions.find(c => c.id === type);
}

export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return componentDefinitions.filter(c => c.category === category);
}

export function getComponentCategories(): string[] {
  return Array.from(new Set(componentDefinitions.map(c => c.category)));
}
