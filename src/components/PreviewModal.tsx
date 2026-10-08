// Full website preview modal
import { useState } from 'react';
import type { Project, Theme, ThemeVariant } from '../types';
import { SectionRenderer } from './SectionRenderer';

interface PreviewModalProps {
  project: Project;
  theme: Theme | ThemeVariant;
  onClose: () => void;
}

export function PreviewModal({ project, theme, onClose }: PreviewModalProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = project.pages[currentPageIndex];

  if (!currentPage) return null;

  const headerMenu = project.menus.find(m => m.location === 'header');
  const footerMenu = project.menus.find(m => m.location === 'footer');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Website Preview</h2>
            <select
              value={currentPageIndex}
              onChange={(e) => setCurrentPageIndex(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              {project.pages.map((page, idx) => (
                <option key={page.id} value={idx}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-y-auto">
          <div style={{ 
            fontFamily: theme.typography.body,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          }}>
            {/* Header */}
            <header style={{ 
              backgroundColor: theme.colors.surface,
              borderBottom: `1px solid ${theme.colors.border}`,
              padding: '1rem 2rem',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}>
              <div style={{ 
                maxWidth: theme.containerWidth,
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ 
                  fontFamily: theme.typography.heading,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}>
                  {project.settings.siteTitle || project.name}
                </div>
                <nav style={{ display: 'flex', gap: '2rem' }}>
                  {headerMenu?.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const pageIndex = project.pages.findIndex(p => p.slug === item.target);
                        if (pageIndex !== -1) setCurrentPageIndex(pageIndex);
                      }}
                      style={{
                        color: theme.colors.text,
                        fontFamily: theme.typography.body,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                    >
                      {item.label}
                    </button>
                  )) || project.pages.map((page, idx) => (
                    <button
                      key={page.id}
                      onClick={() => setCurrentPageIndex(idx)}
                      style={{
                        color: currentPageIndex === idx ? theme.colors.primary : theme.colors.text,
                        fontFamily: theme.typography.body,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                    >
                      {page.title}
                    </button>
                  ))}
                </nav>
              </div>
            </header>

            {/* Page content */}
            <main>
              {currentPage.sections.map(section => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  theme={theme}
                />
              ))}
            </main>

            {/* Footer */}
            <footer style={{
              backgroundColor: theme.colors.text,
              color: theme.colors.background,
              padding: '3rem 2rem',
              marginTop: '4rem',
            }}>
              <div style={{ 
                maxWidth: theme.containerWidth,
                margin: '0 auto',
              }}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '2rem',
                  marginBottom: '2rem',
                }}>
                  <div>
                    <h3 style={{ 
                      fontFamily: theme.typography.heading,
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      color: theme.colors.background,
                    }}>
                      {project.settings.siteTitle || project.name}
                    </h3>
                    <p style={{ 
                      fontFamily: theme.typography.body,
                      color: theme.colors.background,
                      opacity: 0.8,
                    }}>
                      {project.settings.siteDescription || 'Professional website'}
                    </p>
                  </div>
                  {footerMenu && (
                    <div>
                      <h4 style={{ 
                        fontFamily: theme.typography.heading,
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: theme.colors.background,
                      }}>
                        Quick Links
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {footerMenu.items.map(item => (
                          <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                            <button
                              onClick={() => {
                                const pageIndex = project.pages.findIndex(p => p.slug === item.target);
                                if (pageIndex !== -1) setCurrentPageIndex(pageIndex);
                              }}
                              style={{
                                color: theme.colors.background,
                                opacity: 0.8,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                fontFamily: theme.typography.body,
                              }}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 style={{ 
                      fontFamily: theme.typography.heading,
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      color: theme.colors.background,
                    }}>
                      Contact
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {project.settings.contactEmail && (
                        <li style={{ marginBottom: '0.5rem', opacity: 0.8 }}>
                          {project.settings.contactEmail}
                        </li>
                      )}
                      {project.settings.contactPhone && (
                        <li style={{ marginBottom: '0.5rem', opacity: 0.8 }}>
                          {project.settings.contactPhone}
                        </li>
                      )}
                      {project.settings.address && (
                        <li style={{ opacity: 0.8 }}>
                          {project.settings.address}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div style={{
                  textAlign: 'center',
                  paddingTop: '2rem',
                  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
                  opacity: 0.6,
                  fontFamily: theme.typography.body,
                }}>
                  © {new Date().getFullYear()} {project.settings.siteTitle || project.name}. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
