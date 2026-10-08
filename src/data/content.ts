// Rich content generation for themes
import type { Section } from '../types';

export interface ThemeContent {
  hero: {
    heading: string;
    description: string;
    buttonText: string;
  };
  about: {
    title: string;
    content: string;
  };
  services: {
    title: string;
    description: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  features: {
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  testimonials: {
    title: string;
    items: Array<{ name: string; role: string; text: string; rating: number }>;
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const themeContentLibrary: Record<string, ThemeContent> = {
  'corporate-blue': {
    hero: {
      heading: 'Transform Your Business with Strategic Innovation',
      description: 'We partner with forward-thinking organizations to drive sustainable growth, optimize operations, and navigate complex business challenges with confidence. Our proven methodology combines deep industry expertise with cutting-edge strategies.',
      buttonText: 'Schedule Consultation',
    },
    about: {
      title: 'About Meridian Consulting',
      content: 'For over two decades, Meridian Consulting has been the trusted advisor to Fortune 500 companies and emerging businesses alike. Our team of seasoned consultants brings deep industry expertise, analytical rigor, and a commitment to delivering measurable results.\n\nWe believe in building long-term partnerships based on transparency, integrity, and shared success. Our track record of success speaks to our unwavering commitment to excellence and continuous improvement.',
    },
    services: {
      title: 'Our Services',
      description: 'Comprehensive consulting solutions tailored to your unique business needs',
      items: [
        { icon: '📊', title: 'Strategic Consulting', description: 'Our strategic consulting service combines years of expertise with innovative approaches to deliver measurable results. We work closely with you to understand your unique challenges and develop tailored solutions that drive success.' },
        { icon: '📋', title: 'Digital Transformation', description: 'Leverage our proven methodology to transform your operations. Our team of experts brings deep industry knowledge and a commitment to excellence to every project, ensuring seamless digital integration.' },
        { icon: '🎯', title: 'Process Optimization', description: 'Experience the difference of working with industry leaders. Our comprehensive service includes detailed analysis, strategic planning, and hands-on implementation to ensure your success.' },
        { icon: '💼', title: 'Performance Analytics', description: 'Data-driven insights that empower informed decision-making. We help you understand your performance metrics and identify opportunities for growth and improvement.' },
        { icon: '🔧', title: 'Custom Solutions', description: 'Bespoke solutions designed specifically for your business needs. We don\'t believe in one-size-fits-all approaches—every solution is tailored to your unique requirements.' },
        { icon: '🎓', title: 'Expert Training', description: 'Comprehensive training programs that empower your team with the skills and knowledge they need to excel. Our training methodologies are proven to deliver lasting results.' },
      ],
    },
    features: {
      title: 'Why Choose Meridian',
      items: [
        { icon: '🏆', title: 'Proven Track Record', description: '20+ years of delivering exceptional results for clients across industries. Our success stories speak for themselves.' },
        { icon: '👥', title: 'Expert Team', description: 'Seasoned consultants with deep industry expertise and advanced credentials. Our team is our greatest asset.' },
        { icon: '📊', title: 'Data-Driven Approach', description: 'Rigorous analysis and evidence-based recommendations you can trust. Every decision is backed by solid data.' },
        { icon: '🤝', title: 'Partnership Focus', description: 'We work as an extension of your team, committed to your long-term success. Your goals are our goals.' },
        { icon: '🌍', title: 'Global Perspective', description: 'International experience and insights from markets around the world. We bring a global viewpoint to local challenges.' },
        { icon: '⚡', title: 'Agile Methodology', description: 'Flexible, responsive approach that adapts to your evolving needs. We move at the speed of your business.' },
      ],
    },
    testimonials: {
      title: 'What Our Clients Say',
      items: [
        { name: 'Sarah Johnson', role: 'CEO, Tech Innovations Inc.', text: 'Meridian transformed our operations completely. Their expertise and dedication exceeded our expectations. We\'ve seen a 40% improvement in efficiency since partnering with them.', rating: 5 },
        { name: 'Michael Chen', role: 'Director of Operations, Global Solutions', text: 'Working with Meridian was a game-changer for our business. Their strategic approach and attention to detail delivered results we didn\'t think were possible. Highly recommended!', rating: 5 },
        { name: 'Emily Rodriguez', role: 'Founder, Startup Accelerator', text: 'Meridian brings a unique combination of industry knowledge and innovative thinking. They understood our challenges immediately and delivered solutions that drove real business impact.', rating: 5 },
        { name: 'David Thompson', role: 'VP of Strategy, Enterprise Corp', text: 'The team at Meridian is exceptional. Their professionalism, expertise, and commitment to our success made all the difference. We\'ve achieved remarkable growth thanks to their guidance.', rating: 5 },
      ],
    },
    cta: {
      heading: 'Ready to Transform Your Business?',
      description: 'Join hundreds of satisfied clients who have transformed their businesses with Meridian. Schedule your free consultation today and discover how we can help you achieve your goals.',
      buttonText: 'Book Free Consultation',
    },
    contact: {
      title: 'Get in Touch',
      description: 'Have questions or ready to get started? Reach out to our team. We\'re here to help you succeed.',
      email: 'info@meridianconsulting.com',
      phone: '+1 (555) 234-5678',
      address: '350 Fifth Avenue, Suite 4500, New York, NY 10118',
    },
  },
  'tech-dark': {
    hero: {
      heading: 'Build the Future with Intelligent Software',
      description: 'Cutting-edge technology solutions that transform how businesses operate, innovate, and grow in the digital age. Our platform combines artificial intelligence, cloud computing, and data analytics to deliver unprecedented value.',
      buttonText: 'Start Free Trial',
    },
    about: {
      title: 'About Nexus Technologies',
      content: 'Founded in 2015, Nexus Technologies has been at the forefront of software innovation, helping companies harness the power of artificial intelligence, cloud computing, and data analytics. Our platform serves over 10,000 businesses worldwide, from startups to Fortune 500 enterprises.\n\nWe\'re passionate about building technology that makes a real difference. Our team of engineers, designers, and product experts work tirelessly to create solutions that are not just powerful, but also intuitive and enjoyable to use.',
    },
    services: {
      title: 'Our Solutions',
      description: 'Enterprise-grade technology solutions built for scale',
      items: [
        { icon: '🤖', title: 'AI & Machine Learning', description: 'Intelligent automation and predictive analytics powered by state-of-the-art AI models. Our machine learning solutions help you uncover insights, automate processes, and make smarter decisions faster than ever before.' },
        { icon: '☁️', title: 'Cloud Infrastructure', description: 'Scalable, secure cloud solutions with 99.99% uptime guarantee. Our cloud infrastructure is built on industry-leading platforms and designed to grow with your business, ensuring you always have the resources you need.' },
        { icon: '📊', title: 'Data Analytics', description: 'Real-time insights and business intelligence from your data. Our analytics platform transforms raw data into actionable insights, helping you understand your customers, optimize operations, and drive growth.' },
        { icon: '🔐', title: 'Cybersecurity', description: 'Enterprise-grade security to protect your digital assets. Our comprehensive security solutions include threat detection, incident response, and compliance management to keep your business safe.' },
        { icon: '⚡', title: 'API Integration', description: 'Seamless connectivity with 500+ business applications. Our API integration platform makes it easy to connect your systems, automate workflows, and create a unified technology ecosystem.' },
        { icon: '📱', title: 'Mobile Development', description: 'Native and cross-platform mobile apps that users love. Our mobile development team creates beautiful, performant apps that deliver exceptional user experiences on any device.' },
      ],
    },
    features: {
      title: 'Platform Features',
      items: [
        { icon: '⚡', title: 'Lightning Fast', description: 'Sub-100ms response times with global CDN and edge computing. Our platform is optimized for speed, ensuring your users get the best possible experience.' },
        { icon: '🔒', title: 'Enterprise Security', description: 'SOC 2 Type II certified with end-to-end encryption. Your data is protected by industry-leading security measures and best practices.' },
        { icon: '📈', title: 'Infinite Scale', description: 'Auto-scaling infrastructure that grows with your business. Whether you have 10 users or 10 million, our platform handles it seamlessly.' },
        { icon: '🔌', title: 'Easy Integration', description: 'RESTful APIs and webhooks for seamless connectivity. Connect your existing tools and systems in minutes, not months.' },
        { icon: '📊', title: 'Advanced Analytics', description: 'Real-time dashboards and custom reporting. Get the insights you need to make informed decisions and drive your business forward.' },
        { icon: '🌍', title: 'Global Reach', description: 'Deployed in 30+ regions worldwide. Serve your customers wherever they are with low latency and high availability.' },
      ],
    },
    testimonials: {
      title: 'What Developers Say',
      items: [
        { name: 'Alex Kumar', role: 'CTO, StartupXYZ', text: 'Nexus reduced our infrastructure costs by 60% while improving performance. The API is incredibly well-designed and the documentation is top-notch.', rating: 5 },
        { name: 'Jennifer Park', role: 'Lead Engineer, DataFlow', text: 'The documentation is excellent and the support team is responsive. Best developer experience I\'ve encountered in 15 years of software development.', rating: 5 },
        { name: 'Marcus Johnson', role: 'VP Engineering, ScaleUp', text: 'We migrated our entire platform to Nexus in 3 months. The ROI has been phenomenal—our team is more productive and our customers are happier.', rating: 5 },
        { name: 'Sarah Williams', role: 'Founder, TechVenture', text: 'Nexus is the backbone of our entire operation. The reliability and performance are unmatched. We\'ve scaled from 100 to 100,000 users without a single issue.', rating: 5 },
      ],
    },
    cta: {
      heading: 'Start Building Today',
      description: 'Join thousands of developers building the next generation of applications with Nexus. Start your free trial today—no credit card required.',
      buttonText: 'Get Started Free',
    },
    contact: {
      title: 'Contact Sales',
      description: 'Have questions? Our team is here to help. Reach out and we\'ll get back to you within 24 hours.',
      email: 'sales@nexustech.io',
      phone: '+1 (555) 987-6543',
      address: '100 Technology Drive, San Francisco, CA 94105',
    },
  },
  'healthcare-clean': {
    hero: {
      heading: 'Compassionate Care, Exceptional Results',
      description: 'Leading healthcare provider dedicated to your well-being with cutting-edge medical technology and personalized treatment plans. Our team of board-certified physicians and healthcare professionals is committed to delivering the highest quality care.',
      buttonText: 'Book Appointment',
    },
    about: {
      title: 'About Riverside Medical',
      content: 'For over 30 years, Riverside Medical has been providing exceptional healthcare to our community. Our team of board-certified physicians, specialists, and healthcare professionals is committed to delivering personalized, evidence-based care in a warm, welcoming environment.\n\nWe combine advanced medical technology with a human touch to ensure the best possible outcomes for our patients. Our state-of-the-art facilities are designed with your comfort and care in mind, featuring the latest medical equipment and technology.',
    },
    services: {
      title: 'Medical Services',
      description: 'Comprehensive healthcare services for you and your family',
      items: [
        { icon: '🫀', title: 'Cardiology', description: 'Advanced heart care including diagnostics, treatment, and preventive cardiology. Our cardiology team uses the latest technology to detect and treat heart conditions, from routine screenings to complex procedures.' },
        { icon: '🧠', title: 'Neurology', description: 'Expert care for brain, spine, and nervous system conditions. Our neurologists specialize in treating a wide range of neurological disorders, including migraines, epilepsy, stroke, and neurodegenerative diseases.' },
        { icon: '🦴', title: 'Orthopedics', description: 'Comprehensive musculoskeletal care from joint replacement to sports medicine. Our orthopedic surgeons are leaders in minimally invasive techniques, ensuring faster recovery and better outcomes.' },
        { icon: '👶', title: 'Pediatrics', description: 'Specialized healthcare for infants, children, and adolescents. Our pediatricians provide compassionate care for your child\'s unique needs, from newborn care to adolescent health.' },
        { icon: '🏥', title: 'Emergency Care', description: '24/7 emergency services with rapid response and expert treatment. Our emergency department is staffed by board-certified emergency physicians and equipped to handle any medical emergency.' },
        { icon: '🔬', title: 'Diagnostics', description: 'State-of-the-art imaging and laboratory services for accurate diagnosis. Our diagnostic center offers advanced imaging technologies including MRI, CT scans, ultrasound, and comprehensive laboratory testing.' },
      ],
    },
    features: {
      title: 'Why Choose Riverside',
      items: [
        { icon: '👨‍⚕️', title: 'Expert Physicians', description: 'Board-certified doctors with extensive training and experience. Our physicians are leaders in their fields, bringing years of expertise to your care.' },
        { icon: '🏆', title: 'Accredited Facility', description: 'Joint Commission accredited with highest safety standards. Our facility meets the most rigorous standards for quality and safety in healthcare.' },
        { icon: '⚡', title: 'Advanced Technology', description: 'Latest medical equipment and treatment methodologies. We invest in cutting-edge technology to provide you with the most effective and efficient care possible.' },
        { icon: '❤️', title: 'Patient-Centered', description: 'Personalized care plans tailored to your unique needs. We take the time to understand your health goals and create a care plan that\'s right for you.' },
        { icon: '🕐', title: 'Convenient Hours', description: 'Extended hours and same-day appointments available. We understand that health issues don\'t always happen during business hours, so we offer flexible scheduling.' },
        { icon: '💳', title: 'Insurance Accepted', description: 'We accept most major insurance plans and offer flexible payment options. Our billing team is here to help you navigate your insurance and payment options.' },
      ],
    },
    testimonials: {
      title: 'Patient Stories',
      items: [
        { name: 'Maria Gonzalez', role: 'Patient', text: 'The care I received at Riverside was exceptional. The doctors took time to explain everything and made me feel comfortable throughout my treatment. I couldn\'t have asked for better care.', rating: 5 },
        { name: 'Robert Johnson', role: 'Patient', text: 'After my knee replacement, the rehabilitation team was incredible. They pushed me to recover faster than I thought possible. I\'m back to doing all the activities I love.', rating: 5 },
        { name: 'Linda Chen', role: 'Patient', text: 'The pediatrics department is wonderful with children. My kids actually look forward to their check-ups! The staff is friendly, patient, and makes the experience stress-free.', rating: 5 },
        { name: 'James Wilson', role: 'Patient', text: 'I was nervous about my cardiac procedure, but the team at Riverside put me at ease from the start. Their expertise and compassion made all the difference. I\'m grateful for their care.', rating: 5 },
      ],
    },
    cta: {
      heading: 'Your Health is Our Priority',
      description: 'Schedule your appointment today and experience the difference of personalized, compassionate care. Our team is ready to help you achieve your health goals.',
      buttonText: 'Book Appointment',
    },
    contact: {
      title: 'Contact Us',
      description: 'We\'re here to help. Reach out with any questions or to schedule an appointment.',
      email: 'info@riversidemedical.com',
      phone: '+1 (555) 123-4567',
      address: '1200 Healthcare Boulevard, Riverside, CA 92501',
    },
  },
};

export function getThemeContent(themeId: string): ThemeContent {
  return themeContentLibrary[themeId] || themeContentLibrary['corporate-blue'];
}

export function generateDefaultSections(themeId: string): Section[] {
  const content = getThemeContent(themeId);
  
  return [
    {
      id: 'hero-1',
      type: 'hero',
      variant: 'centered',
      content: content.hero,
      settings: {},
      animation: { type: 'fade', duration: 600, delay: 0 },
      order: 0,
      visible: true,
    },
    {
      id: 'services-1',
      type: 'services',
      variant: 'grid',
      content: {
        title: content.services.title,
        description: content.services.description,
        services: content.services.items,
      },
      settings: {},
      animation: { type: 'slide', duration: 600, delay: 100 },
      order: 1,
      visible: true,
    },
    {
      id: 'features-1',
      type: 'features',
      variant: 'grid',
      content: {
        title: content.features.title,
        features: content.features.items,
      },
      settings: {},
      animation: { type: 'slide', duration: 600, delay: 200 },
      order: 2,
      visible: true,
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      variant: 'grid',
      content: {
        title: content.testimonials.title,
        testimonials: content.testimonials.items,
      },
      settings: {},
      animation: { type: 'fade', duration: 600, delay: 300 },
      order: 3,
      visible: true,
    },
    {
      id: 'cta-1',
      type: 'cta',
      variant: 'centered',
      content: content.cta,
      settings: {},
      animation: { type: 'scale', duration: 600, delay: 400 },
      order: 4,
      visible: true,
    },
    {
      id: 'contact-1',
      type: 'contact',
      variant: 'simple',
      content: content.contact,
      settings: {},
      animation: { type: 'fade', duration: 600, delay: 500 },
      order: 5,
      visible: true,
    },
  ];
}
