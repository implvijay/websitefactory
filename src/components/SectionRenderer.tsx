// Section renderer - renders all section types with animations
import { motion } from 'framer-motion';
import type { Section, Theme, ThemeVariant } from '../types';

interface SectionRendererProps {
  section: Section;
  theme: Theme | ThemeVariant;
  isEditing?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

const animationVariants = {
  none: {},
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideUp: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
  slideLeft: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
  bounce: { 
    initial: { opacity: 0, y: -50 }, 
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 10 }
  },
};

export function SectionRenderer({ section, theme, isEditing, onClick, isSelected }: SectionRendererProps) {
  const animation = section.animation || { type: 'none', duration: 0.5, delay: 0 };
  const animProps = animationVariants[animation.type as keyof typeof animationVariants] || {};
  
  const style: React.CSSProperties = {
    ...section.style,
    cursor: isEditing ? 'pointer' : 'default',
    border: isSelected ? `2px solid ${theme.colors.primary}` : 'none',
  };

  const content = renderSectionContent(section, theme);

  if (isEditing) {
    return (
      <div onClick={onClick} style={style} className="relative group">
        <motion.div
          {...animProps}
          transition={{ duration: animation.duration, delay: animation.delay }}
        >
          {content}
        </motion.div>
        {isSelected && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg">
            <span className="text-xs font-medium px-2">Selected</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      {...animProps}
      transition={{ duration: animation.duration, delay: animation.delay }}
      style={style}
    >
      {content}
    </motion.div>
  );
}

function renderSectionContent(section: Section, theme: Theme | ThemeVariant) {
  const { type, content } = section;
  const colors = theme.colors;
  const typography = theme.typography;

  switch (type) {
    case 'hero':
      return (
        <section style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: '#ffffff',
          padding: '6rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h1 style={{ 
              fontFamily: typography.heading,
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            }}>
              {content.heading}
            </h1>
            <p style={{ 
              fontFamily: typography.body,
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.95,
              maxWidth: '800px',
              margin: '0 auto 2rem',
            }}>
              {content.description}
            </p>
            {content.buttonText && (
              <a
                href={content.buttonUrl}
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  backgroundColor: '#ffffff',
                  color: colors.primary,
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                }}
              >
                {content.buttonText}
              </a>
            )}
          </div>
        </section>
      );

    case 'features':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {content.features?.map((feature: any, i: number) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.surface,
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{ 
                    fontFamily: typography.heading,
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: colors.text,
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontFamily: typography.body,
                    color: colors.textMuted,
                    lineHeight: '1.6',
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'services':
      return (
        <section style={{ 
          backgroundColor: colors.surface,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            {content.description && (
              <p style={{ 
                fontFamily: typography.body,
                textAlign: 'center',
                marginBottom: '3rem',
                color: colors.textMuted,
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
              {content.services?.map((service: any, i: number) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.background,
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
                  <h3 style={{ 
                    fontFamily: typography.heading,
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: colors.text,
                  }}>
                    {service.title}
                  </h3>
                  <p style={{ 
                    fontFamily: typography.body,
                    color: colors.textMuted,
                    lineHeight: '1.6',
                  }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {content.testimonials?.map((testimonial: any, i: number) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.surface,
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    {'★'.repeat(testimonial.rating || 5)}
                  </div>
                  <p style={{ 
                    fontFamily: typography.body,
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                    color: colors.text,
                    lineHeight: '1.6',
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div style={{ 
                      fontFamily: typography.heading,
                      fontWeight: '600',
                      color: colors.text,
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{ 
                      fontFamily: typography.body,
                      fontSize: '0.875rem',
                      color: colors.textMuted,
                    }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: '#ffffff',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
            }}>
              {content.heading}
            </h2>
            <p style={{ 
              fontFamily: typography.body,
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.95,
              maxWidth: '700px',
              margin: '0 auto 2rem',
            }}>
              {content.description}
            </p>
            {content.buttonText && (
              <a
                href={content.buttonUrl}
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  backgroundColor: '#ffffff',
                  color: colors.primary,
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                }}
              >
                {content.buttonText}
              </a>
            )}
          </div>
        </section>
      );

    case 'text':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '4rem 2rem',
        }}>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: typography.body,
            color: colors.text,
            lineHeight: '1.8',
            fontSize: '1.125rem',
          }}>
            {content.content}
          </div>
        </section>
      );

    case 'image':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '4rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <img
              src={content.src}
              alt={content.alt}
              style={{
                width: '100%',
                borderRadius: '0.75rem',
              }}
            />
            {content.caption && (
              <p style={{ 
                fontFamily: typography.body,
                textAlign: 'center',
                marginTop: '1rem',
                color: colors.textMuted,
                fontStyle: 'italic',
              }}>
                {content.caption}
              </p>
            )}
          </div>
        </section>
      );

    case 'contact':
      return (
        <section style={{ 
          backgroundColor: colors.surface,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            {content.description && (
              <p style={{ 
                fontFamily: typography.body,
                textAlign: 'center',
                marginBottom: '3rem',
                color: colors.textMuted,
              }}>
                {content.description}
              </p>
            )}
            <div style={{ 
              backgroundColor: colors.background,
              padding: '2rem',
              borderRadius: '0.75rem',
              border: `1px solid ${colors.border}`,
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: colors.text }}>Email:</strong>
                <p style={{ color: colors.textMuted, fontFamily: typography.body }}>
                  {content.email}
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: colors.text }}>Phone:</strong>
                <p style={{ color: colors.textMuted, fontFamily: typography.body }}>
                  {content.phone}
                </p>
              </div>
              <div>
                <strong style={{ color: colors.text }}>Address:</strong>
                <p style={{ color: colors.textMuted, fontFamily: typography.body }}>
                  {content.address}
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case 'stats':
      return (
        <section style={{ 
          backgroundColor: colors.primary,
          color: '#ffffff',
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}>
              {content.stats?.map((stat: any, i: number) => (
                <div key={i}>
                  <div style={{ 
                    fontFamily: typography.heading,
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontFamily: typography.body,
                    fontSize: '1.125rem',
                    opacity: 0.9,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'team':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}>
              {content.members?.map((member: any, i: number) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.surface,
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div style={{ 
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '2.5rem',
                    fontFamily: typography.heading,
                    fontWeight: 'bold',
                  }}>
                    {member.name?.charAt(0) || '?'}
                  </div>
                  <h3 style={{ 
                    fontFamily: typography.heading,
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: colors.text,
                  }}>
                    {member.name}
                  </h3>
                  <div style={{ 
                    fontFamily: typography.body,
                    color: colors.primary,
                    fontWeight: '600',
                    marginBottom: '1rem',
                  }}>
                    {member.role}
                  </div>
                  <p style={{ 
                    fontFamily: typography.body,
                    color: colors.textMuted,
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                  }}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'faq':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {content.questions?.map((qa: any, i: number) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.surface,
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <h3 style={{ 
                    fontFamily: typography.heading,
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: colors.text,
                  }}>
                    {qa.question}
                  </h3>
                  <p style={{ 
                    fontFamily: typography.body,
                    color: colors.textMuted,
                    lineHeight: '1.6',
                  }}>
                    {qa.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'pricing':
      return (
        <section style={{ 
          backgroundColor: colors.surface,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}>
              {content.plans?.map((plan: any, i: number) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.background,
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    border: plan.highlighted ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
                    position: 'relative',
                  }}
                >
                  {plan.highlighted && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: colors.primary,
                      color: '#ffffff',
                      padding: '0.25rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                    }}>
                      Most Popular
                    </div>
                  )}
                  <h3 style={{ 
                    fontFamily: typography.heading,
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: colors.text,
                  }}>
                    {plan.name}
                  </h3>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ 
                      fontFamily: typography.heading,
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: colors.text,
                    }}>
                      {plan.price}
                    </span>
                    <span style={{ 
                      fontFamily: typography.body,
                      color: colors.textMuted,
                    }}>
                      {plan.period}
                    </span>
                  </div>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '2rem',
                  }}>
                    {plan.features?.map((feature: string, j: number) => (
                      <li
                        key={j}
                        style={{
                          fontFamily: typography.body,
                          padding: '0.5rem 0',
                          color: colors.text,
                          borderBottom: j < plan.features.length - 1 ? `1px solid ${colors.border}` : 'none',
                        }}
                      >
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: plan.highlighted ? colors.primary : colors.surface,
                      color: plan.highlighted ? '#ffffff' : colors.text,
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      fontFamily: typography.body,
                      cursor: 'pointer',
                    }}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {content.images?.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    borderRadius: '0.75rem',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'blog':
      return (
        <section style={{ 
          backgroundColor: colors.surface,
          padding: '5rem 2rem',
        }}>
          <div style={{ maxWidth: theme.containerWidth, margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              color: colors.text,
            }}>
              {content.title}
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {content.posts?.map((post: any, i: number) => (
                <article
                  key={i}
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ 
                      fontFamily: typography.body,
                      fontSize: '0.875rem',
                      color: colors.textMuted,
                      marginBottom: '0.5rem',
                    }}>
                      {post.date}
                    </div>
                    <h3 style={{ 
                      fontFamily: typography.heading,
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: colors.text,
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ 
                      fontFamily: typography.body,
                      color: colors.textMuted,
                      lineHeight: '1.6',
                    }}>
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 'newsletter':
      return (
        <section style={{ 
          backgroundColor: colors.primary,
          color: '#ffffff',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: typography.heading,
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}>
              {content.title}
            </h2>
            <p style={{ 
              fontFamily: typography.body,
              marginBottom: '2rem',
              opacity: 0.95,
            }}>
              {content.description}
            </p>
            <div style={{ 
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              <input
                type="email"
                placeholder={content.placeholder}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontFamily: typography.body,
                }}
              />
              <button
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#ffffff',
                  color: colors.primary,
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontFamily: typography.body,
                  cursor: 'pointer',
                }}
              >
                {content.buttonText}
              </button>
            </div>
          </div>
        </section>
      );

    default:
      return (
        <section style={{ 
          backgroundColor: colors.background,
          padding: '4rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{ 
            maxWidth: theme.containerWidth,
            margin: '0 auto',
            fontFamily: typography.body,
            color: colors.textMuted,
          }}>
            Unknown section type: {type}
          </div>
        </section>
      );
  }
}
