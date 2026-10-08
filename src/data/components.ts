// Component definitions for page builder
import type { ComponentDefinition } from '../types';

export const componentDefinitions: ComponentDefinition[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    category: 'Hero',
    icon: '🎯',
    variants: ['centered', 'split', 'video', 'fullscreen'],
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
    defaultContent: {
      content: 'Your text content goes here. Edit this to add your own text.',
    },
  },
  {
    id: 'image',
    name: 'Image',
    category: 'Media',
    icon: '🖼️',
    variants: ['full', 'rounded', 'shadow'],
    defaultContent: {
      src: 'https://via.placeholder.com/800x400',
      alt: 'Image description',
      caption: 'Image caption',
    },
  },
  {
    id: 'contact',
    name: 'Contact Form',
    category: 'Conversion',
    icon: '📧',
    variants: ['simple', 'detailed', 'split'],
    defaultContent: {
      title: 'Contact Us',
      description: 'Get in touch with us today.',
      email: 'info@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State',
    },
  },
  {
    id: 'stats',
    name: 'Statistics',
    category: 'Social Proof',
    icon: '📊',
    variants: ['horizontal', 'vertical', 'cards'],
    defaultContent: {
      title: 'Our Impact',
      stats: [
        { value: '500+', label: 'Happy Clients' },
        { value: '1200+', label: 'Projects Completed' },
        { value: '15+', label: 'Years Experience' },
        { value: '50+', label: 'Team Members' },
      ],
    },
  },
  {
    id: 'team',
    name: 'Team',
    category: 'People',
    icon: '👥',
    variants: ['grid', 'carousel', 'list'],
    defaultContent: {
      title: 'Meet Our Team',
      members: [
        { name: 'Alex Johnson', role: 'CEO', bio: 'Leading with vision', image: '' },
        { name: 'Maria Garcia', role: 'CTO', bio: 'Tech innovator', image: '' },
        { name: 'David Chen', role: 'Design Lead', bio: 'Creative mind', image: '' },
      ],
    },
  },
  {
    id: 'faq',
    name: 'FAQ',
    category: 'Content',
    icon: '❓',
    variants: ['accordion', 'grid', 'list'],
    defaultContent: {
      title: 'Frequently Asked Questions',
      questions: [
        { question: 'What services do you offer?', answer: 'We offer comprehensive services tailored to your needs.' },
        { question: 'How do I get started?', answer: 'Contact us to schedule a consultation.' },
        { question: 'What is your pricing?', answer: 'Pricing varies based on project scope. Contact us for a quote.' },
      ],
    },
  },
  {
    id: 'pricing',
    name: 'Pricing',
    category: 'Conversion',
    icon: '💰',
    variants: ['cards', 'table', 'comparison'],
    defaultContent: {
      title: 'Pricing Plans',
      plans: [
        { name: 'Basic', price: '$29', period: '/month', features: ['Feature 1', 'Feature 2'], highlighted: false },
        { name: 'Pro', price: '$79', period: '/month', features: ['Feature 1', 'Feature 2', 'Feature 3'], highlighted: true },
        { name: 'Enterprise', price: '$199', period: '/month', features: ['All features'], highlighted: false },
      ],
    },
  },
  {
    id: 'gallery',
    name: 'Gallery',
    category: 'Media',
    icon: '🎨',
    variants: ['grid', 'masonry', 'slider'],
    defaultContent: {
      title: 'Our Gallery',
      images: [
        { src: 'https://via.placeholder.com/400x300', alt: 'Image 1' },
        { src: 'https://via.placeholder.com/400x300', alt: 'Image 2' },
        { src: 'https://via.placeholder.com/400x300', alt: 'Image 3' },
      ],
    },
  },
  {
    id: 'blog',
    name: 'Blog Posts',
    category: 'Content',
    icon: '📰',
    variants: ['grid', 'list', 'featured'],
    defaultContent: {
      title: 'Latest Blog Posts',
      posts: [
        { title: 'Blog Post 1', excerpt: 'Excerpt of blog post 1', date: '2024-01-15', image: '' },
        { title: 'Blog Post 2', excerpt: 'Excerpt of blog post 2', date: '2024-01-10', image: '' },
        { title: 'Blog Post 3', excerpt: 'Excerpt of blog post 3', date: '2024-01-05', image: '' },
      ],
    },
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    category: 'Conversion',
    icon: '📬',
    variants: ['centered', 'split', 'banner'],
    defaultContent: {
      title: 'Subscribe to Our Newsletter',
      description: 'Stay updated with our latest news and offers.',
      buttonText: 'Subscribe',
      placeholder: 'Enter your email',
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
