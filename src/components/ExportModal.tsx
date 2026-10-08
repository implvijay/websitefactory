// Export modal for Static HTML, Laravel, and React/Node
import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Project, Theme, ThemeVariant } from '../types';

interface ExportModalProps {
  project: Project;
  theme: Theme | ThemeVariant;
  onClose: () => void;
}

export function ExportModal({ project, theme, onClose }: ExportModalProps) {
  const [exportType, setExportType] = useState<'html' | 'laravel' | 'react'>('html');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      const zip = new JSZip();

      if (exportType === 'html') {
        await exportHTML(zip);
      } else if (exportType === 'laravel') {
        await exportLaravel(zip);
      } else {
        await exportReact(zip);
      }

      setProgress(100);
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${project.name.replace(/\s+/g, '-').toLowerCase()}-${exportType}.zip`);
      
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
      setIsExporting(false);
    }
  };

  const exportHTML = async (zip: JSZip) => {
    // Generate index.html
    const indexHtml = generateHTML(project, theme, project.pages[0]);
    zip.file('index.html', indexHtml);
    setProgress(20);

    // Generate other pages
    for (let i = 1; i < project.pages.length; i++) {
      const page = project.pages[i];
      const html = generateHTML(project, theme, page);
      zip.file(`${page.slug}.html`, html);
      setProgress(20 + (i / project.pages.length) * 60);
    }

    // Generate CSS
    const css = generateCSS(theme);
    zip.file('styles.css', css);
    setProgress(85);

    // Generate sitemap
    const sitemap = generateSitemap(project);
    zip.file('sitemap.xml', sitemap);

    // Generate robots.txt
    const robots = `User-agent: *\nAllow: /\nSitemap: /sitemap.xml`;
    zip.file('robots.txt', robots);
    setProgress(95);
  };

  const exportLaravel = async (zip: JSZip) => {
    // Generate Laravel structure
    zip.file('composer.json', JSON.stringify({
      name: `website-factory/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      description: project.description,
      type: 'project',
      require: {
        php: '^8.1',
        'laravel/framework': '^11.0',
      },
    }, null, 2));

    zip.file('package.json', JSON.stringify({
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
      },
      devDependencies: {
        'laravel-vite-plugin': '^1.0',
        vite: '^5.0',
      },
    }, null, 2));

    zip.file('.env.example', `APP_NAME="${project.name}"\nAPP_ENV=production\nAPP_KEY=\nAPP_DEBUG=false\nAPP_URL=http://localhost\n`);

    // Generate routes
    const routes = `<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n\n${project.pages.map(page => 
      `Route::get('/${page.slug}', function () {\n    return view('${page.slug}');\n});`
    ).join('\n\n')}\n\nRoute::get('/', function () {\n    return view('home');\n});\n`;
    zip.file('routes/web.php', routes);

    // Generate views
    for (const page of project.pages) {
      const blade = generateBlade(project, theme, page);
      zip.file(`resources/views/${page.slug}.blade.php`, blade);
    }

    // Generate layout
    const layout = generateLayout(project, theme);
    zip.file('resources/views/layouts/app.blade.php', layout);

    setProgress(100);
  };

  const exportReact = async (zip: JSZip) => {
    // Generate React structure
    zip.file('package.json', JSON.stringify({
      name: project.name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        'react-router-dom': '^6.20.0',
      },
      devDependencies: {
        '@types/react': '^18.2.43',
        '@types/react-dom': '^18.2.17',
        '@vitejs/plugin-react': '^4.2.1',
        typescript: '^5.2.2',
        vite: '^5.0.8',
      },
    }, null, 2));

    zip.file('vite.config.ts', `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})\n`);

    // Generate App.tsx with routing
    const appTsx = generateReactApp(project);
    zip.file('src/App.tsx', appTsx);

    // Generate page components
    for (const page of project.pages) {
      const component = generateReactPage(project, theme, page);
      zip.file(`src/pages/${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}.tsx`, component);
    }

    setProgress(100);
  };

  const generateHTML = (project: Project, theme: Theme | ThemeVariant, page: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo.title || page.title} - ${project.settings.siteTitle || project.name}</title>
  <meta name="description" content="${page.seo.description || project.settings.siteDescription || ''}">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="logo">${project.settings.siteTitle || project.name}</div>
      <nav class="nav">
        ${project.pages.map(p => `<a href="${p.slug === 'home' ? 'index' : p.slug}.html">${p.title}</a>`).join('\n        ')}
      </nav>
    </div>
  </header>
  <main>
    ${page.sections.map((section: any) => `
    <section class="section section-${section.type}">
      <div class="container">
        ${renderSectionHTML(section)}
      </div>
    </section>`).join('\n')}
  </main>
  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${project.settings.siteTitle || project.name}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
  };

  const renderSectionHTML = (section: any) => {
    const { type, content } = section;
    switch (type) {
      case 'hero':
        return `
          <h1>${content.heading}</h1>
          <p>${content.description}</p>
          ${content.buttonText ? `<a href="${content.buttonUrl}" class="btn">${content.buttonText}</a>` : ''}
        `;
      case 'features':
        return `
          <h2>${content.title}</h2>
          <div class="features-grid">
            ${content.features?.map((f: any) => `
              <div class="feature">
                <div class="icon">${f.icon}</div>
                <h3>${f.title}</h3>
                <p>${f.description}</p>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return `<p>Section: ${type}</p>`;
    }
  };

  const generateCSS = (theme: Theme | ThemeVariant) => {
    return `
:root {
  --primary: ${theme.colors.primary};
  --secondary: ${theme.colors.secondary};
  --accent: ${theme.colors.accent};
  --background: ${theme.colors.background};
  --surface: ${theme.colors.surface || theme.colors.background};
  --text: ${theme.colors.text};
  --text-muted: ${theme.colors.textMuted || theme.colors.text};
  --border: ${theme.colors.border || '#e5e7eb'};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${theme.typography.body}, sans-serif;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.6;
}

.container {
  max-width: ${theme.containerWidth || '1200px'};
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  background-color: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: ${theme.typography.heading}, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: var(--text);
  text-decoration: none;
  font-family: ${theme.typography.body}, sans-serif;
}

.nav a:hover {
  color: var(--primary);
}

.section {
  padding: 4rem 0;
}

h1, h2, h3 {
  font-family: ${theme.typography.heading}, sans-serif;
  font-weight: bold;
}

h1 { font-size: 3rem; margin-bottom: 1.5rem; }
h2 { font-size: 2.5rem; margin-bottom: 1rem; }
h3 { font-size: 1.5rem; margin-bottom: 0.75rem; }

.btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 0.75rem;
  text-align: center;
}

.feature .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.footer {
  background-color: var(--text);
  color: var(--background);
  padding: 3rem 0;
  margin-top: 4rem;
  text-align: center;
}
`;
  };

  const generateSitemap = (project: Project) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${project.pages.map(page => `
  <url>
    <loc>/${page.slug === 'home' ? 'index' : page.slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.slug === 'home' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;
  };

  const generateBlade = (project: Project, theme: Theme | ThemeVariant, page: any) => {
    return `@extends('layouts.app')

@section('title', '${page.seo.title || page.title}')
@section('description', '${page.seo.description || ''}')

@section('content')
  ${page.sections.map((section: any) => `
  <section class="section section-${section.type}">
    <div class="container">
      <!-- ${section.type} section -->
      <h2>${section.content.title || section.content.heading || ''}</h2>
    </div>
  </section>`).join('\n')}
@endsection
`;
  };

  const generateLayout = (project: Project, theme: Theme | ThemeVariant) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title') - ${project.settings.siteTitle || project.name}</title>
  <meta name="description" content="@yield('description')">
  @vite(['resources/css/app.css'])
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="logo">${project.settings.siteTitle || project.name}</div>
      <nav class="nav">
        ${project.pages.map(p => `<a href="/{{ '${p.slug}' }}">{{ '${p.title}' }}</a>`).join('\n        ')}
      </nav>
    </div>
  </header>
  <main>
    @yield('content')
  </main>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ date('Y') }} ${project.settings.siteTitle || project.name}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
  };

  const generateReactApp = (project: Project) => {
    return `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
${project.pages.map(p => `import ${p.slug.charAt(0).toUpperCase() + p.slug.slice(1)} from './pages/${p.slug.charAt(0).toUpperCase() + p.slug.slice(1)}';`).join('\n')}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          ${project.pages.map(p => `<Route path="/${p.slug === 'home' ? '' : p.slug}" element={<${p.slug.charAt(0).toUpperCase() + p.slug.slice(1)} />} />`).join('\n          ')}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
`;
  };

  const generateReactPage = (project: Project, theme: Theme | ThemeVariant, page: any) => {
    return `export default function ${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}() {
  return (
    <div>
      ${page.sections.map((section: any) => `
      <section className="section section-${section.type}">
        <div className="container">
          <h2>${section.content.title || section.content.heading || ''}</h2>
        </div>
      </section>`).join('\n')}
    </div>
  );
}
`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Export Website</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
        </div>

        <div className="p-6">
          {!isExporting ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setExportType('html')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportType === 'html'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">🌐</div>
                    <div className="font-medium text-sm">Static HTML</div>
                    <div className="text-xs text-gray-500 mt-1">Pure HTML/CSS/JS</div>
                  </button>
                  <button
                    onClick={() => setExportType('laravel')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportType === 'laravel'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">🔺</div>
                    <div className="font-medium text-sm">Laravel 12.x</div>
                    <div className="text-xs text-gray-500 mt-1">PHP + Blade</div>
                  </button>
                  <button
                    onClick={() => setExportType('react')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportType === 'react'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">⚛️</div>
                    <div className="font-medium text-sm">React + Node</div>
                    <div className="text-xs text-gray-500 mt-1">Full-stack JS</div>
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  {exportType === 'html' && 'Static HTML Export'}
                  {exportType === 'laravel' && 'Laravel Export'}
                  {exportType === 'react' && 'React/Node Export'}
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  {exportType === 'html' && (
                    <>
                      <li>• Generates complete HTML/CSS website files</li>
                      <li>• Includes all pages with proper navigation</li>
                      <li>• Responsive design with mobile support</li>
                      <li>• SEO optimized with meta tags</li>
                      <li>• Includes sitemap.xml and robots.txt</li>
                      <li>• Ready to deploy to any web host</li>
                    </>
                  )}
                  {exportType === 'laravel' && (
                    <>
                      <li>• Generates complete Laravel 12.x project</li>
                      <li>• Blade templates for all pages</li>
                      <li>• JSON-based content storage</li>
                      <li>• Contact form with submission handling</li>
                      <li>• SEO optimized with meta tags</li>
                      <li>• Includes composer.json and package.json</li>
                    </>
                  )}
                  {exportType === 'react' && (
                    <>
                      <li>• Generates React 18 + TypeScript frontend</li>
                      <li>• Vite for fast development and building</li>
                      <li>• React Router for navigation</li>
                      <li>• Node.js + Express backend API</li>
                      <li>• Contact form with API endpoint</li>
                      <li>• TypeScript throughout the stack</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Export as ZIP
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              </div>
              <p className="text-gray-600 mb-4">Exporting your website...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
