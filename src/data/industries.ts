// Industry definitions
import type { Industry } from '../types';

export const industries: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    description: 'Medical practices, clinics, hospitals, and wellness centers',
    suggestedPages: ['Home', 'About', 'Services', 'Doctors', 'Patient Portal', 'FAQ', 'Contact', 'Privacy Policy'],
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Software companies, IT services, and tech startups',
    suggestedPages: ['Home', 'About', 'Products', 'Solutions', 'Pricing', 'Case Studies', 'Blog', 'Contact'],
  },
  {
    id: 'saas',
    name: 'SaaS',
    icon: '☁️',
    description: 'Software-as-a-Service platforms and applications',
    suggestedPages: ['Home', 'Features', 'Pricing', 'Integrations', 'Customers', 'Documentation', 'Blog', 'Contact'],
  },
  {
    id: 'digital-agency',
    name: 'Digital Agency',
    icon: '🎨',
    description: 'Marketing agencies, design studios, and creative firms',
    suggestedPages: ['Home', 'About', 'Services', 'Portfolio', 'Case Studies', 'Team', 'Blog', 'Contact'],
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: '📊',
    description: 'Business consultants, strategy firms, and advisors',
    suggestedPages: ['Home', 'About', 'Services', 'Industries', 'Insights', 'Team', 'Careers', 'Contact'],
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    description: 'Schools, universities, training centers, and online courses',
    suggestedPages: ['Home', 'About', 'Programs', 'Admissions', 'Faculty', 'Campus Life', 'News', 'Contact'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: '🏭',
    description: 'Industrial manufacturers, production facilities, and factories',
    suggestedPages: ['Home', 'About', 'Products', 'Capabilities', 'Quality', 'Certifications', 'Careers', 'Contact'],
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: '🏠',
    description: 'Real estate agencies, property management, and developers',
    suggestedPages: ['Home', 'Properties', 'About', 'Agents', 'Neighborhoods', 'Buyers Guide', 'Sellers Guide', 'Contact'],
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Hospitality',
    icon: '🍽️',
    description: 'Restaurants, cafes, hotels, and hospitality businesses',
    suggestedPages: ['Home', 'Menu', 'About', 'Reservations', 'Gallery', 'Events', 'Reviews', 'Contact'],
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: '⚖️',
    description: 'Law firms, accounting, financial advisory services',
    suggestedPages: ['Home', 'About', 'Practice Areas', 'Attorneys', 'Resources', 'Testimonials', 'Blog', 'Contact'],
  },
  {
    id: 'local-business',
    name: 'Local Business',
    icon: '🏪',
    description: 'Local shops, service providers, and community businesses',
    suggestedPages: ['Home', 'About', 'Services', 'Gallery', 'Reviews', 'FAQ', 'Locations', 'Contact'],
  },
  {
    id: 'creative-portfolio',
    name: 'Creative & Portfolio',
    icon: '✨',
    description: 'Designers, photographers, artists, and creative professionals',
    suggestedPages: ['Home', 'Portfolio', 'About', 'Services', 'Process', 'Testimonials', 'Blog', 'Contact'],
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: '🏗️',
    description: 'Construction companies, contractors, and building services',
    suggestedPages: ['Home', 'About', 'Services', 'Projects', 'Safety', 'Careers', 'Testimonials', 'Contact'],
  },
  {
    id: 'finance',
    name: 'Finance & Legal',
    icon: '💰',
    description: 'Banks, insurance, financial advisors, and legal services',
    suggestedPages: ['Home', 'About', 'Services', 'Team', 'Insights', 'Resources', 'Careers', 'Contact'],
  },
];

export function getIndustry(id: string): Industry | undefined {
  return industries.find(i => i.id === id);
}
