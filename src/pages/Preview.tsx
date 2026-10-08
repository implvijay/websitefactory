import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project } from '../types';
import { getTheme, getThemeVariant } from '../data/themes';

export function Preview() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('website-factory-projects');
    if (stored) {
      const projects: Project[] = JSON.parse(stored);
      const found = projects.find(p => p.id === projectId);
      if (found) setProject(found);
    }
  }, [projectId]);

  if (!project) {
    return <div className="p-8">Project not found</div>;
  }

  const theme = getTheme(project.themeId);
  const themeVariant = project.themeVariantId ? getThemeVariant(project.themeVariantId) : null;
  const activeTheme = themeVariant || theme;

  if (!activeTheme) {
    return <div className="p-8">Theme not found</div>;
  }

  const currentPage = project.pages[currentPageIndex];
  const headerMenu = project.menus.find(m => m.location === 'header');

  return (
    <div className="min-h-screen" style={{ backgroundColor: activeTheme.colors.background }}>
      {/* Preview Toolbar */}
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
        {/* Header */}
        <header style={{ backgroundColor: activeTheme.colors.surface, borderBottom: `1px solid ${activeTheme.colors.border}` }}>
          <div style={{ maxWidth: activeTheme.containerWidth, margin: '0 auto', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', backgroundColor: activeTheme.colors.primary, borderRadius: '0.25rem' }} />
                <span style={{ fontFamily: activeTheme.typography.heading, fontWeight: 700, color: activeTheme.colors.text }}>
                  {project.name}
                </span>
              </div>
              <nav style={{ display: 'flex', gap: '1.5rem' }}>
                {headerMenu?.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const pageIndex = project.pages.findIndex(p => p.slug === item.target);
                      if (pageIndex !== -1) setCurrentPageIndex(pageIndex);
                    }}
                    style={{
                      color: activeTheme.colors.text,
                      fontFamily: activeTheme.typography.body,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </button>
                )) || project.pages.map((page, idx) => (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPageIndex(idx)}
                    style={{
                      color: currentPageIndex === idx ? activeTheme.colors.primary : activeTheme.colors.text,
                      fontFamily: activeTheme.typography.body,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {page.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ maxWidth: activeTheme.containerWidth, margin: '0 auto', padding: '2rem 1rem' }}>
          <h1 style={{ fontFamily: activeTheme.typography.heading, fontSize: '2.5rem', color: activeTheme.colors.text, marginBottom: '1rem' }}>
            {currentPage.title}
          </h1>
          {currentPage.sections.length === 0 ? (
            <p style={{ color: activeTheme.colors.textMuted }}>This page has no content yet.</p>
          ) : (
            currentPage.sections.map(section => (
              <div key={section.id} style={{ marginBottom: '2rem' }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: activeTheme.typography.body, color: activeTheme.colors.text }}>
                  {JSON.stringify(section.content, null, 2)}
                </pre>
              </div>
            ))
          )}
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: activeTheme.colors.text, color: activeTheme.colors.background, padding: '2rem 1rem', marginTop: '4rem' }}>
          <div style={{ maxWidth: activeTheme.containerWidth, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: activeTheme.typography.body }}>
              © {new Date().getFullYear()} {project.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
