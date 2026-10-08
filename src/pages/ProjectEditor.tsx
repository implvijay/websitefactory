import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project, Page, Menu, MenuItem, Section, Theme, ThemeVariant, PageVariant } from '../types';
import { themes, themeVariants, getTheme, getThemeVariant, getThemeVariants } from '../data/themes';
import { getThemeContent } from '../data/themeContent';
import { PageBuilder } from '../components/PageBuilder';
import { MenuBuilder } from '../components/MenuBuilder';
import { ThemeSelector } from '../components/ThemeSelector';

export function ProjectEditor() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'pages' | 'menus' | 'theme'>('pages');
  const [selectedPageId, setSelectedPageId] = useState<string>('home');

  useEffect(() => {
    const stored = localStorage.getItem('website-factory-projects');
    if (stored) {
      const projects: Project[] = JSON.parse(stored);
      const found = projects.find(p => p.id === projectId);
      if (found) {
        setProject(found);
        if (found.pages.length > 0) {
          setSelectedPageId(found.pages[0].id);
        }
      }
    }
  }, [projectId]);

  const saveProject = (updatedProject: Project) => {
    const stored = localStorage.getItem('website-factory-projects');
    if (stored) {
      const projects: Project[] = JSON.parse(stored);
      const index = projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
        projects[index] = { ...updatedProject, updatedAt: new Date().toISOString() };
        localStorage.setItem('website-factory-projects', JSON.stringify(projects));
        setProject(projects[index]);
      }
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const theme = getTheme(project.themeId);
  const themeVariant = project.themeVariantId ? getThemeVariant(project.themeVariantId) : null;
  const activeTheme = themeVariant || theme;

  const updateTheme = (newThemeId: string, variantId?: string) => {
    saveProject({
      ...project,
      themeId: newThemeId,
      themeVariantId: variantId,
    });
  };

  const updatePage = (updatedPage: Page) => {
    const updatedPages = project.pages.map(p => p.id === updatedPage.id ? updatedPage : p);
    saveProject({ ...project, pages: updatedPages });
  };

  const addPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'New Page',
      slug: 'new-page',
      sections: [],
      layout: {
        type: 'full-width',
        maxWidth: '1200px',
        padding: '0',
      },
    };
    saveProject({ ...project, pages: [...project.pages, newPage] });
    setSelectedPageId(newPage.id);
  };

  const deletePage = (pageId: string) => {
    if (project.pages.length === 1) {
      alert('Cannot delete the last page');
      return;
    }
    if (confirm('Are you sure you want to delete this page?')) {
      const updatedPages = project.pages.filter(p => p.id !== pageId);
      saveProject({ ...project, pages: updatedPages });
      if (selectedPageId === pageId) {
        setSelectedPageId(updatedPages[0].id);
      }
    }
  };

  const updateMenu = (updatedMenu: Menu) => {
    const updatedMenus = project.menus.map(m => m.id === updatedMenu.id ? updatedMenu : m);
    saveProject({ ...project, menus: updatedMenus });
  };

  const addMenu = () => {
    const newMenu: Menu = {
      id: Date.now().toString(),
      name: 'New Menu',
      location: 'header',
      items: [],
    };
    saveProject({ ...project, menus: [...project.menus, newMenu] });
  };

  const cloneMenu = (menuId: string) => {
    const menu = project.menus.find(m => m.id === menuId);
    if (menu) {
      const clonedMenu: Menu = {
        ...menu,
        id: Date.now().toString(),
        name: `${menu.name} (Copy)`,
        items: menu.items.map(item => ({ ...item, id: Date.now().toString() + Math.random() })),
      };
      saveProject({ ...project, menus: [...project.menus, clonedMenu] });
    }
  };

  const deleteMenu = (menuId: string) => {
    if (confirm('Are you sure you want to delete this menu?')) {
      const updatedMenus = project.menus.filter(m => m.id !== menuId);
      saveProject({ ...project, menus: updatedMenus });
    }
  };

  const selectedPage = project.pages.find(p => p.id === selectedPageId);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900 mb-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === 'pages'
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              📄 Pages
            </button>
            <button
              onClick={() => setActiveTab('menus')}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === 'menus'
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              🧭 Menus
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === 'theme'
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              🎨 Theme
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'pages' && (
              <div className="space-y-2">
                <button
                  onClick={addPage}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  + Add Page
                </button>
                {project.pages.map(page => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPageId === page.id
                        ? 'bg-indigo-50 border-2 border-indigo-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedPageId(page.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">{page.title}</div>
                        <div className="text-xs text-gray-500">/{page.slug}</div>
                      </div>
                      {project.pages.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page.id);
                          }}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'menus' && (
              <div className="space-y-2">
                <button
                  onClick={addMenu}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  + Add Menu
                </button>
                {project.menus.map(menu => (
                  <div
                    key={menu.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-sm text-gray-900">{menu.name}</div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => cloneMenu(menu.id)}
                          className="text-indigo-600 hover:text-indigo-800 text-xs"
                          title="Clone menu"
                        >
                          Clone
                        </button>
                        <button
                          onClick={() => deleteMenu(menu.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {menu.items.length} items • {menu.location}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="text-sm text-gray-600">
                Select theme and variant in the main area
              </div>
            )}
          </div>
        </div>

        {/* Preview Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate(`/preview/${project.id}`)}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            👁️ Preview Website
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'pages' && selectedPage && (
          <PageBuilder
            page={selectedPage}
            theme={activeTheme!}
            onUpdate={updatePage}
          />
        )}

        {activeTab === 'menus' && (
          <MenuBuilder
            menus={project.menus}
            pages={project.pages}
            onUpdateMenu={updateMenu}
          />
        )}

        {activeTab === 'theme' && (
          <ThemeSelector
            currentThemeId={project.themeId}
            currentVariantId={project.themeVariantId}
            onSelectTheme={updateTheme}
          />
        )}
      </div>
    </div>
  );
}
