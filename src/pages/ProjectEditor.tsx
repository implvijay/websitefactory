// Project editor - main workspace with tabs
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project, Page, Menu, Theme, ThemeVariant } from '../types';
import { getProject, saveProject } from '../storage/BrowserStorage';
import { themes } from '../data/themes';
import { themeVariants, getThemeVariant, getThemeVariants } from '../data/themeVariants';
import { PageCanvas } from '../components/PageCanvas';
import { MenuEditor } from '../components/MenuEditor';
import { ThemeSelector } from '../components/ThemeSelector';

export function ProjectEditor() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'pages' | 'menus' | 'theme' | 'settings'>('pages');
  const [selectedPageId, setSelectedPageId] = useState<string>('');

  useEffect(() => {
    if (projectId) {
      const p = getProject(projectId);
      if (p) {
        setProject(p);
        if (p.pages.length > 0) {
          setSelectedPageId(p.pages[0].id);
        }
      }
    }
  }, [projectId]);

  const updateProject = (updates: Partial<Project>) => {
    if (!project) return;
    const updated = { ...project, ...updates, updatedAt: new Date().toISOString() };
    setProject(updated);
    saveProject(updated);
  };

  const updatePage = (page: Page) => {
    if (!project) return;
    const pages = project.pages.map(p => p.id === page.id ? page : p);
    updateProject({ pages });
  };

  const addPage = () => {
    if (!project) return;
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'New Page',
      slug: `page-${Date.now()}`,
      sections: [],
      seo: {
        title: '',
        description: '',
        keywords: [],
      },
      status: 'draft',
      order: project.pages.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    updateProject({ pages: [...project.pages, newPage] });
    setSelectedPageId(newPage.id);
  };

  const deletePage = (pageId: string) => {
    if (!project || project.pages.length === 1) {
      alert('Cannot delete the last page');
      return;
    }
    if (confirm('Are you sure you want to delete this page?')) {
      const pages = project.pages.filter(p => p.id !== pageId);
      updateProject({ pages });
      if (selectedPageId === pageId) {
        setSelectedPageId(pages[0].id);
      }
    }
  };

  const updateMenu = (menu: Menu) => {
    if (!project) return;
    const menus = project.menus.map(m => m.id === menu.id ? menu : m);
    // Check if it's a new menu
    if (!project.menus.find(m => m.id === menu.id)) {
      menus.push(menu);
    }
    updateProject({ menus });
  };

  const cloneMenu = (menuId: string) => {
    if (!project) return;
    const menu = project.menus.find(m => m.id === menuId);
    if (menu) {
      const cloned: Menu = {
        ...menu,
        id: Date.now().toString(),
        name: `${menu.name} (Copy)`,
        items: menu.items.map(item => ({ ...item, id: Date.now().toString() + Math.random() })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateProject({ menus: [...project.menus, cloned] });
    }
  };

  const deleteMenu = (menuId: string) => {
    if (!project) return;
    const menus = project.menus.filter(m => m.id !== menuId);
    updateProject({ menus });
  };

  const updateTheme = (themeId: string, variantId?: string) => {
    updateProject({ themeId, themeVariantId: variantId });
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

  const theme = themes.find(t => t.id === project.themeId);
  const themeVariant = project.themeVariantId ? getThemeVariant(project.themeVariantId) : null;
  const activeTheme = themeVariant || theme;

  const selectedPage = project.pages.find(p => p.id === selectedPageId);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => navigate('/dashboard')}
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
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Tab content */}
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
                  onClick={() => {
                    const newMenu: Menu = {
                      id: Date.now().toString(),
                      name: 'New Menu',
                      location: 'primary',
                      items: [],
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    };
                    updateMenu(newMenu);
                  }}
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
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                          title="Clone menu"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this menu?')) {
                              deleteMenu(menu.id);
                            }
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                          title="Delete menu"
                        >
                          🗑️
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
                Select theme in the main area
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Title
                  </label>
                  <input
                    type="text"
                    value={project.settings.siteTitle}
                    onChange={(e) => updateProject({
                      settings: { ...project.settings, siteTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Description
                  </label>
                  <textarea
                    value={project.settings.siteDescription}
                    onChange={(e) => updateProject({
                      settings: { ...project.settings, siteDescription: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={project.settings.contactEmail}
                    onChange={(e) => updateProject({
                      settings: { ...project.settings, contactEmail: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={project.settings.contactPhone}
                    onChange={(e) => updateProject({
                      settings: { ...project.settings, contactPhone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate(`/preview/${project.id}`)}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            👁️ Preview Website
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'pages' && selectedPage && activeTheme && (
          <PageCanvas
            page={selectedPage}
            theme={activeTheme}
            onUpdate={updatePage}
          />
        )}

        {activeTab === 'menus' && (
          <MenuEditor
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

        {activeTab === 'settings' && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Settings</h2>
              {/* Settings content is in sidebar */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
