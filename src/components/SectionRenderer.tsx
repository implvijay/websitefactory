// Section renderer with animation support and edit mode
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Section, Theme, ThemeVariant } from '../types';

interface SectionRendererProps {
  section: Section;
  theme: Theme | ThemeVariant;
  editMode?: boolean;
  onUpdate?: (updates: Partial<Section>) => void;
}

export function SectionRenderer({ section, theme, editMode, onUpdate }: SectionRendererProps) {
  const { type, content, animation } = section;
  const tokens = theme.tokens;

  const animationProps = animation && animation.type !== 'none' ? {
    initial: getInitialAnimation(animation.type),
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { 
      duration: (animation.duration || 500) / 1000,
      delay: (animation.delay || 0) / 1000,
    },
  } : {};

  const sectionStyle: React.CSSProperties = {
    padding: section.settings.padding || '4rem 2rem',
    backgroundColor: section.settings.backgroundColor || 'transparent',
    margin: section.settings.margin || '0',
  };

  const Wrapper = animation && animation.type !== 'none' ? motion.section : 'section';

  const renderContent = () => {
    switch (type) {
      case 'hero':
        return (
          <div style={{ 
            maxWidth: tokens.containerWidth, 
            margin: '0 auto', 
            textAlign: 'center',
            padding: '4rem 0',
          }}>
            {editMode && onUpdate ? (
              <EditableHeading
                value={content.heading || 'Welcome'}
                onChange={(value) => onUpdate({ content: { ...content, heading: value } })}
                style={{
                  fontFamily: tokens.typography.heading,
                  fontSize: '3rem',
                  fontWeight: tokens.typography.headingWeight || 700,
                  marginBottom: '1rem',
                  color: tokens.colors.text,
                }}
              />
            ) : (
              <h1 style={{
                fontFamily: tokens.typography.heading,
                fontSize: '3rem',
                fontWeight: tokens.typography.headingWeight || 700,
                marginBottom: '1rem',
                color: tokens.colors.text,
              }}>
                {content.heading || 'Welcome'}
              </h1>
            )}
            {editMode && onUpdate ? (
              <EditableText
                value={content.description || ''}
                onChange={(value) => onUpdate({ content: { ...content, description: value } })}
                style={{
                  fontFamily: tokens.typography.body,
                  fontSize: '1.25rem',
                  color: tokens.colors.textMuted,
                  marginBottom: '2rem',
                  maxWidth: '800px',
                  margin: '0 auto 2rem',
                }}
              />
            ) : (
              <p style={{
                fontFamily: tokens.typography.body,
                fontSize: '1.25rem',
                color: tokens.colors.textMuted,
                marginBottom: '2rem',
                maxWidth: '800px',
                margin: '0 auto 2rem',
              }}>
                {content.description || ''}
              </p>
            )}
            {content.buttonText && (
              <button style={{
                padding: '1rem 2rem',
                backgroundColor: tokens.colors.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: tokens.borderRadius.md,
                fontFamily: tokens.typography.body,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                {content.buttonText}
              </button>
            )}
          </div>
        );

      case 'features':
        return (
          <div style={{ maxWidth: tokens.containerWidth, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: tokens.typography.heading,
              fontSize: '2.5rem',
              fontWeight: tokens.typography.headingWeight || 700,
              textAlign: 'center',
              marginBottom: '3rem',
              color: tokens.colors.text,
            }}>
              {content.title || 'Features'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {(content.features || []).map((feature: any, i: number) => (
                <div key={i} style={{
                  backgroundColor: tokens.colors.surface,
                  padding: '2rem',
                  borderRadius: tokens.borderRadius.lg,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{
                    fontFamily: tokens.typography.heading,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: tokens.colors.text,
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontFamily: tokens.typography.body,
                    color: tokens.colors.textMuted,
                    lineHeight: 1.6,
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div style={{ maxWidth: tokens.containerWidth, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: tokens.typography.heading,
              fontSize: '2.5rem',
              fontWeight: tokens.typography.headingWeight || 700,
              textAlign: 'center',
              marginBottom: '1rem',
              color: tokens.colors.text,
            }}>
              {content.title || 'Our Services'}
            </h2>
            {content.description && (
              <p style={{
                fontFamily: tokens.typography.body,
                textAlign: 'center',
                marginBottom: '3rem',
                color: tokens.colors.textMuted,
                fontSize: '1.125rem',
              }}>
                {content.description}
              </p>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {(content.services || []).map((service: any, i: number) => (
                <div key={i} style={{
                  backgroundColor: tokens.colors.surface,
                  padding: '2rem',
                  borderRadius: tokens.borderRadius.lg,
                  border: `1px solid ${tokens.colors.border}`,
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
                  <h3 style={{
                    fontFamily: tokens.typography.heading,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: tokens.colors.text,
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontFamily: tokens.typography.body,
                    color: tokens.colors.textMuted,
                    lineHeight: 1.6,
                  }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div style={{ maxWidth: tokens.containerWidth, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: tokens.typography.heading,
              fontSize: '2.5rem',
              fontWeight: tokens.typography.headingWeight || 700,
              textAlign: 'center',
              marginBottom: '3rem',
              color: tokens.colors.text,
            }}>
              {content.title || 'Testimonials'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {(content.testimonials || []).map((testimonial: any, i: number) => (
                <div key={i} style={{
                  backgroundColor: tokens.colors.surface,
                  padding: '2rem',
                  borderRadius: tokens.borderRadius.lg,
                  border: `1px solid ${tokens.colors.border}`,
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    {'★'.repeat(testimonial.rating || 5)}
                  </div>
                  <p style={{
                    fontFamily: tokens.typography.body,
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                    color: tokens.colors.text,
                    lineHeight: 1.6,
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div style={{
                      fontFamily: tokens.typography.heading,
                      fontWeight: 600,
                      color: tokens.colors.text,
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontFamily: tokens.typography.body,
                      fontSize: '0.875rem',
                      color: tokens.colors.textMuted,
                    }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div style={{
            maxWidth: tokens.containerWidth,
            margin: '0 auto',
            textAlign: 'center',
            padding: '4rem 2rem',
            background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.secondary} 100%)`,
            borderRadius: tokens.borderRadius.lg,
            color: '#ffffff',
          }}>
            <h2 style={{
              fontFamily: tokens.typography.heading,
              fontSize: '2.5rem',
              fontWeight: tokens.typography.headingWeight || 700,
              marginBottom: '1rem',
            }}>
              {content.heading || 'Ready to Get Started?'}
            </h2>
            <p style={{
              fontFamily: tokens.typography.body,
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.95,
            }}>
              {content.description || ''}
            </p>
            {content.buttonText && (
              <button style={{
                padding: '1rem 2.5rem',
                backgroundColor: '#ffffff',
                color: tokens.colors.primary,
                border: 'none',
                borderRadius: tokens.borderRadius.md,
                fontFamily: tokens.typography.body,
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                {content.buttonText}
              </button>
            )}
          </div>
        );

      case 'text':
        return (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: tokens.typography.body,
            color: tokens.colors.text,
            lineHeight: 1.8,
            fontSize: '1.125rem',
          }}>
            {editMode && onUpdate ? (
              <EditableText
                value={content.content || ''}
                onChange={(value) => onUpdate({ content: { ...content, content: value } })}
                style={{ minHeight: '100px' }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content.content || '' }} />
            )}
          </div>
        );

      case 'contact':
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: tokens.typography.heading,
              fontSize: '2.5rem',
              fontWeight: tokens.typography.headingWeight || 700,
              textAlign: 'center',
              marginBottom: '1rem',
              color: tokens.colors.text,
            }}>
              {content.title || 'Contact Us'}
            </h2>
            {content.description && (
              <p style={{
                fontFamily: tokens.typography.body,
                textAlign: 'center',
                marginBottom: '3rem',
                color: tokens.colors.textMuted,
              }}>
                {content.description}
              </p>
            )}
            <div style={{
              backgroundColor: tokens.colors.surface,
              padding: '2rem',
              borderRadius: tokens.borderRadius.lg,
              border: `1px solid ${tokens.colors.border}`,
            }}>
              {content.email && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong style={{ color: tokens.colors.text }}>Email:</strong>
                  <p style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.body }}>
                    {content.email}
                  </p>
                </div>
              )}
              {content.phone && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong style={{ color: tokens.colors.text }}>Phone:</strong>
                  <p style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.body }}>
                    {content.phone}
                  </p>
                </div>
              )}
              {content.address && (
                <div>
                  <strong style={{ color: tokens.colors.text }}>Address:</strong>
                  <p style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.body }}>
                    {content.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div style={{
            maxWidth: tokens.containerWidth,
            margin: '0 auto',
            fontFamily: tokens.typography.body,
            color: tokens.colors.textMuted,
            textAlign: 'center',
            padding: '2rem',
          }}>
            Section: {type}
          </div>
        );
    }
  };

  return (
    <Wrapper {...animationProps} style={sectionStyle}>
      {renderContent()}
    </Wrapper>
  );
}

// Editable heading component
function EditableHeading({ value, onChange, style }: { value: string; onChange: (value: string) => void; style: React.CSSProperties }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          onChange(text);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange(text);
            setEditing(false);
          }
        }}
        style={{ ...style, border: '2px solid #4f46e5', padding: '0.5rem', width: '100%' }}
        autoFocus
      />
    );
  }

  return (
    <h1
      onClick={() => setEditing(true)}
      style={{ ...style, cursor: 'pointer' }}
      title="Click to edit"
    >
      {value}
    </h1>
  );
}

// Editable text component
function EditableText({ value, onChange, style }: { value: string; onChange: (value: string) => void; style?: React.CSSProperties }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          onChange(text);
          setEditing(false);
        }}
        style={{ ...style, border: '2px solid #4f46e5', padding: '0.5rem', width: '100%', minHeight: '100px' }}
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      style={{ ...style, cursor: 'pointer', minHeight: '100px' }}
      title="Click to edit"
    >
      {value || 'Click to edit...'}
    </div>
  );
}

// Animation helpers
function getInitialAnimation(type: string) {
  switch (type) {
    case 'fade':
      return { opacity: 0 };
    case 'slide':
      return { opacity: 0, y: 50 };
    case 'scale':
      return { opacity: 0, scale: 0.9 };
    case 'bounce':
      return { opacity: 0, y: -50 };
    default:
      return {};
  }
}
