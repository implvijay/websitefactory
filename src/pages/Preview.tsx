// Full website preview with edit mode
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project, Theme, ThemeVariant } from '../types';
import { getProject, saveProject } from '../storage/BrowserStorage';
import { getActiveTheme } from '../data/themeVariants';
import { SectionRenderer } from '../components/SectionRenderer';

export function Preview() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (projectId) {
      const p = getProject(projectId);
      if (p) setProject(p);
    }
  }, [projectId]);

  const updateProject = (updates: Partial<Project>) => {
    if (!project) return;
    const updated = { ...project, ...updates, updatedAt: new Date().toISOString() };
    setProject(updated);
    saveProject(updated);
  };

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
    return <div className="p-8">Theme not found</div>;
  }

  const currentPage = project.pages[currentPageIndex];
  const primaryMenu = project.menus.find(m => m.location === 'primary');

  const updateSection = (sectionId: string, updates: any) => {
    const updatedPages = project.pages.map((page, idx) => {
      if (idx === currentPageIndex) {
        return {
          ...page,
          sections: page.sections.map(s => 
            s.id === sectionId ? { ...s, ...updates } : s
          ),
        };
      }
      return page;
    });
    updateProject({ pages: updatedPages });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.tokens.colors.background }}>
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
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-3 py-1 rounded text-sm ${
              editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {editMode ? '✓ Edit Mode' : 'Edit Mode'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={currentPageIndex}
            onChange={(e) => setCurrentPageIndex(Number(e.target.value))}
            className="px-3 py-1 bg-gray-700 rounded text-sm"
          >
            {project.pages.map((page, idx) => (
              <option key={page.id} value={idx}>
                {page.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-12">
        <div style={{ 
          fontFamily: theme.tokens.typography.body,
          backgroundColor: theme.tokens.colors.background,
          color: theme.tokens.colors.text,
        }}>
          {/* Header */}
          <header style={{ 
            backgroundColor: theme.tokens.colors.surface,
            borderBottom: `1px solid ${theme.tokens.colors.border}`,
            padding: '1rem 2rem',
            position: 'sticky',
            top: '48px',
            zIndex: 10,
          }}>
            <div style={{ 
              maxWidth: theme.tokens.containerWidth,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ 
                fontFamily: theme.tokens.typography.heading,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: theme.tokens.colors.primary,
              }}>
                {project.settings.siteTitle || project.name}
              </div>
              <nav style={{ display: 'flex', gap: '2rem' }}>
                {primaryMenu?.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const pageIndex = project.pages.findIndex(p => p.slug === item.target);
                      if (pageIndex !== -1) setCurrentPageIndex(pageIndex);
                    }}
                    style={{
                      color: theme.tokens.colors.text,
                      fontFamily: theme.tokens.typography.body,
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
                      color: currentPageIndex === idx ? theme.tokens.colors.primary : theme.tokens.colors.text,
                      fontFamily: theme.tokens.typography.body,
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
                editMode={editMode}
                onUpdate={(updates) => updateSection(section.id, updates)}
              />
            ))}
          </main>

          {/* Footer */}
          <footer style={{
            backgroundColor: theme.tokens.colors.text,
            color: theme.tokens.colors.background,
            padding: '3rem 2rem',
            marginTop: '4rem',
          }}>
            <div style={{ 
              maxWidth: theme.tokens.containerWidth,
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
                    fontFamily: theme.tokens.typography.heading,
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: theme.tokens.colors.background,
                  }}>
                    {project.settings.siteTitle || project.name}
                  </h3>
                  <p style={{ 
                    fontFamily: theme.tokens.typography.body,
                    color: theme.tokens.colors.background,
                    opacity: 0.8,
                  }}>
                    {project.settings.siteDescription || 'Professional website'}
                  </p>
                </div>
                <div>
                  <h4 style={{ 
                    fontFamily: theme.tokens.typography.heading,
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: theme.tokens.colors.background,
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
                fontFamily: theme.tokens.typography.body,
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
