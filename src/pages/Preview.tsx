// Full website preview page
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project, Theme, ThemeVariant } from '../types';
import { getProject } from '../storage/BrowserStorage';
import { getActiveTheme } from '../data/themes';
import { SectionRenderer } from '../components/SectionRenderer';

export function Preview() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (projectId) {
      const p = getProject(projectId);
      if (p) {
        setProject(p);
      }
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Project not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const theme = getActiveTheme(project.themeId, project.themeVariantId);
  if (!theme) {
    return <div>Theme not found</div>;
  }

  const currentPage = project.pages[currentPageIndex];
  const headerMenu = project.menus.find(m => m.location === 'header');
  const footerMenu = project.menus.find(m => m.location === 'footer');

  return (
    <div className="min-h-screen">
      {/* Preview toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/project/${projectId}`)}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-sm"
          >
            ← Back to Editor
          </button>
          <span className="font-medium">{project.name} - Preview Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={currentPageIndex}
            onChange={(e) => setCurrentPageIndex(Number(e.target.value))}
            className="px-3 py-1 bg-gray-700 rounded text-sm"
          >
            {project.pages.map((page, idx) => (
              <option key={page.id} value={idx}>{page.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-12">
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
            top: '48px',
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
  );
}
