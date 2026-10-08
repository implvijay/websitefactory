// Dashboard - project list and management
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project, User } from '../types';
import { getProjects, deleteProject, getCurrentUser, logout } from '../storage/BrowserStorage';
import { industries } from '../data/industries';
import { themes } from '../data/themes';
import { generateDefaultSections } from '../data/content';

export function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setProjects(getProjects());
    getCurrentUser().then(setUser);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      setProjects(getProjects());
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Website Factory</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
            <p className="text-gray-600 mt-1">Manage your website projects</p>
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first website project to get started</p>
            <button
              onClick={() => setShowNewProject(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => {
              const theme = themes.find(t => t.id === project.themeId);
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme?.tokens.colors.primary} 0%, ${theme?.tokens.colors.secondary} 100%)`,
                    }}
                  >
                    <span className="text-white text-4xl font-bold">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.pages.length} pages • {theme?.name}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/preview/${project.id}`)}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {showNewProject && (
        <NewProjectModal
          onClose={() => setShowNewProject(false)}
          onCreate={(project) => {
            setProjects([...projects, project]);
            setShowNewProject(false);
            navigate(`/project/${project.id}`);
          }}
        />
      )}
    </div>
  );
}

function NewProjectModal({ onClose, onCreate }: { onClose: () => void; onCreate: (project: Project) => void }) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState(industries[0].id);
  const [themeId, setThemeId] = useState(themes[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Generate rich content based on selected theme
      const defaultSections = generateDefaultSections(themeId);
      
      const newProject: Project = {
        id: Date.now().toString(),
        name: name.trim(),
        description: '',
        industry,
        themeId,
        pages: [
          {
            id: 'home',
            title: 'Home',
            slug: 'home',
            sections: defaultSections,
            seo: {
              title: name,
              description: `Welcome to ${name} - Professional website`,
              keywords: [],
            },
            status: 'published',
            order: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'about',
            title: 'About',
            slug: 'about',
            sections: [
              {
                id: 'about-hero',
                type: 'hero',
                variant: 'centered',
                content: {
                  heading: 'About Us',
                  description: 'Learn more about our company and mission.',
                  buttonText: '',
                },
                settings: {},
                animation: { type: 'fade', duration: 600, delay: 0 },
                order: 0,
                visible: true,
              },
              {
                id: 'about-text',
                type: 'text',
                variant: 'center',
                content: {
                  content: '<p>We are a leading company dedicated to providing exceptional services to our clients. With years of experience and a passion for excellence, we strive to exceed expectations in everything we do.</p>',
                },
                settings: {},
                animation: { type: 'slide', duration: 600, delay: 100 },
                order: 1,
                visible: true,
              },
            ],
            seo: {
              title: 'About Us',
              description: 'Learn more about our company',
              keywords: [],
            },
            status: 'published',
            order: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'contact',
            title: 'Contact',
            slug: 'contact',
            sections: [
              {
                id: 'contact-hero',
                type: 'hero',
                variant: 'centered',
                content: {
                  heading: 'Contact Us',
                  description: 'Get in touch with our team.',
                  buttonText: '',
                },
                settings: {},
                animation: { type: 'fade', duration: 600, delay: 0 },
                order: 0,
                visible: true,
              },
              {
                id: 'contact-info',
                type: 'contact',
                variant: 'simple',
                content: {
                  title: 'Get in Touch',
                  description: 'We\'d love to hear from you. Reach out to us using the information below.',
                  email: 'info@example.com',
                  phone: '+1 (555) 000-0000',
                  address: '123 Main Street, City, State 12345',
                },
                settings: {},
                animation: { type: 'slide', duration: 600, delay: 100 },
                order: 1,
                visible: true,
              },
            ],
            seo: {
              title: 'Contact Us',
              description: 'Get in touch with us',
              keywords: [],
            },
            status: 'published',
            order: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        menus: [
          {
            id: 'main-menu',
            name: 'Main Menu',
            location: 'primary',
            items: [
              {
                id: 'menu-home',
                label: 'Home',
                type: 'page',
                target: 'home',
                children: [],
                enabled: true,
                openInNewTab: false,
                order: 0,
              },
              {
                id: 'menu-about',
                label: 'About',
                type: 'page',
                target: 'about',
                children: [],
                enabled: true,
                openInNewTab: false,
                order: 1,
              },
              {
                id: 'menu-contact',
                label: 'Contact',
                type: 'page',
                target: 'contact',
                children: [],
                enabled: true,
                openInNewTab: false,
                order: 2,
              },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'footer-menu',
            name: 'Footer Menu',
            location: 'footer',
            items: [
              {
                id: 'footer-privacy',
                label: 'Privacy Policy',
                type: 'page',
                target: 'home',
                children: [],
                enabled: true,
                openInNewTab: false,
                order: 0,
              },
              {
                id: 'footer-terms',
                label: 'Terms of Service',
                type: 'page',
                target: 'home',
                children: [],
                enabled: true,
                openInNewTab: false,
                order: 1,
              },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        forms: [],
        media: [],
        versions: [],
        settings: {
          siteTitle: name,
          siteDescription: `Welcome to ${name} - Professional website built with Website Factory`,
          contactEmail: 'info@example.com',
          contactPhone: '+1 (555) 000-0000',
          address: '123 Main Street, City, State 12345',
          socialLinks: {},
          analytics: {},
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onCreate(newProject);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Website"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {industries.map(ind => (
                <option key={ind.id} value={ind.id}>
                  {ind.icon} {ind.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Theme
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setThemeId(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    themeId === theme.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="h-16 rounded mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${theme.tokens.colors.primary} 0%, ${theme.tokens.colors.secondary} 100%)`,
                    }}
                  />
                  <div className="text-sm font-medium text-gray-900">{theme.name}</div>
                  <div className="text-xs text-gray-500">{theme.category}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
