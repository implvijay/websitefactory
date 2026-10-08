// Export Service - Multi-format export (HTML, Laravel, React/Node)
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Project, ExportOptions, ExportResult, Theme, ThemeVariant } from '../../types';
import { getProject } from '../../storage/BrowserStorage';
import { themeEngine } from './ThemeEngine';
import { seoService } from './SEOService';
import { analyticsService } from './AnalyticsService';

export class ExportService {
  async exportProject(projectId: string, options: ExportOptions): Promise<ExportResult> {
    const project = getProject(projectId);
    if (!project) {
      return {
        success: false,
        files: {},
        errors: ['Project not found'],
        warnings: [],
      };
    }

    const theme = await themeEngine.getActiveTheme(project.themeId, project.themeVariantId);
    if (!theme) {
      return {
        success: false,
        files: {},
        errors: ['Theme not found'],
        warnings: [],
      };
    }

    try {
      switch (options.format) {
        case 'html':
          return await this.exportHTML(project, theme, options);
        case 'laravel':
          return await this.exportLaravel(project, theme, options);
        case 'react':
          return await this.exportReact(project, theme, options);
        default:
          return {
            success: false,
            files: {},
            errors: ['Invalid export format'],
            warnings: [],
          };
      }
    } catch (error) {
      return {
        success: false,
        files: {},
        errors: [error instanceof Error ? error.message : 'Export failed'],
        warnings: [],
      };
    }
  }

  private async exportHTML(project: Project, theme: Theme | ThemeVariant, options: ExportOptions): Promise<ExportResult> {
    const files: Record<string, string> = {};
    const errors: string[] = [];
    const warnings: string[] = [];

    // Generate CSS
    const css = themeEngine.generateCSSVariables(theme);
    files['styles.css'] = css;

    // Generate pages
    for (const page of project.pages) {
      const html = await this.generateHTMLPage(project, theme, page);
      const filename = page.slug === 'home' ? 'index.html' : `${page.slug}.html`;
      files[filename] = html;
    }

    // Generate sitemap
    if (options.includeSitemap) {
      files['sitemap.xml'] = seoService.generateSitemap(project.id);
    }

    // Generate robots.txt
    if (options.includeRobots) {
      files['robots.txt'] = seoService.generateRobots();
    }

    // Download as ZIP
    const zip = new JSZip();
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${options.projectName || project.name}-html.zip`);

    return {
      success: true,
      files,
      errors,
      warnings,
    };
  }

  private async generateHTMLPage(project: Project, theme: Theme | ThemeVariant, page: any): Promise<string> {
    const trackingCode = await analyticsService.generateAllTrackingCode(project.id);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo.title || page.title} - ${project.settings.siteTitle}</title>
  <meta name="description" content="${page.seo.description || project.settings.siteDescription}">
  <link rel="stylesheet" href="styles.css">
  ${trackingCode.head}
</head>
<body>
  ${trackingCode.body}
  <header>
    <nav>
      <a href="/">${project.settings.siteTitle}</a>
      ${project.menus.find(m => m.location === 'primary')?.items.map(item => 
        `<a href="/${item.target}">${item.label}</a>`
      ).join('') || ''}
    </nav>
  </header>
  <main>
    <h1>${page.title}</h1>
    ${page.sections.map((section: any) => this.renderSectionHTML(section)).join('')}
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${project.settings.siteTitle}</p>
  </footer>
</body>
</html>`;
  }

  private renderSectionHTML(section: any): string {
    // Simplified section rendering for HTML export
    return `<section class="section-${section.type}">
      <h2>${section.content.title || section.content.heading || ''}</h2>
      <p>${section.content.description || section.content.content || ''}</p>
    </section>`;
  }

  private async exportLaravel(project: Project, theme: Theme | ThemeVariant, options: ExportOptions): Promise<ExportResult> {
    const files: Record<string, string> = {};

    // Generate Laravel structure
    files['composer.json'] = JSON.stringify({
      name: `website-factory/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      description: project.description,
      type: 'project',
      require: {
        php: '^8.1',
        'laravel/framework': '^11.0',
      },
    }, null, 2);

    files['routes/web.php'] = this.generateLaravelRoutes(project);
    files['resources/views/layouts/app.blade.php'] = this.generateLaravelLayout(project, theme);

    for (const page of project.pages) {
      files[`resources/views/pages/${page.slug}.blade.php`] = this.generateLaravelPage(project, theme, page);
    }

    // Download as ZIP
    const zip = new JSZip();
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${options.projectName || project.name}-laravel.zip`);

    return {
      success: true,
      files,
      errors: [],
      warnings: [],
    };
  }

  private generateLaravelRoutes(project: Project): string {
    return `<?php

use Illuminate\\Support\\Facades\\Route;

${project.pages.map(page => 
  `Route::get('/${page.slug}', function () {
    return view('pages.${page.slug}');
});`
).join('\n\n')}

Route::get('/', function () {
    return view('pages.home');
});
`;
  }

  private generateLaravelLayout(project: Project, theme: Theme | ThemeVariant): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - ${project.settings.siteTitle}</title>
    <meta name="description" content="@yield('description')">
    @vite(['resources/css/app.css'])
</head>
<body>
    <header>
        <nav>
            <a href="/">{{ '${project.settings.siteTitle}' }}</a>
        </nav>
    </header>
    <main>
        @yield('content')
    </main>
    <footer>
        <p>&copy; {{ date('Y') }} {{ '${project.settings.siteTitle}' }}</p>
    </footer>
</body>
</html>
`;
  }

  private generateLaravelPage(project: Project, theme: Theme | ThemeVariant, page: any): string {
    return `@extends('layouts.app')

@section('title', '${page.seo.title || page.title}')
@section('description', '${page.seo.description || ''}')

@section('content')
    <h1>{{ '${page.title}' }}</h1>
    @foreach($sections as $section)
        <section class="section-{{ $section->type }}">
            <h2>{{ $section->content->title ?? $section->content->heading ?? '' }}</h2>
            <p>{{ $section->content->description ?? $section->content->content ?? '' }}</p>
        </section>
    @endforeach
@endsection
`;
  }

  private async exportReact(project: Project, theme: Theme | ThemeVariant, options: ExportOptions): Promise<ExportResult> {
    const files: Record<string, string> = {};

    // Generate React structure
    files['package.json'] = JSON.stringify({
      name: project.name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        'react-router-dom': '^6.20.0',
      },
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
    }, null, 2);

    files['src/App.tsx'] = this.generateReactApp(project);
    files['vite.config.ts'] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

    for (const page of project.pages) {
      files[`src/pages/${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}.tsx`] = this.generateReactPage(project, theme, page);
    }

    // Download as ZIP
    const zip = new JSZip();
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${options.projectName || project.name}-react.zip`);

    return {
      success: true,
      files,
      errors: [],
      warnings: [],
    };
  }

  private generateReactApp(project: Project): string {
    return `import { BrowserRouter, Routes, Route } from 'react-router-dom';
${project.pages.map(page => 
  `import ${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)} from './pages/${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}';`
).join('\n')}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        ${project.pages.map(page => 
          `<Route path="/${page.slug === 'home' ? '' : page.slug}" element={<${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)} />} />`
        ).join('\n        ')}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`;
  }

  private generateReactPage(project: Project, theme: Theme | ThemeVariant, page: any): string {
    return `export default function ${page.slug.charAt(0).toUpperCase() + page.slug.slice(1)}() {
  return (
    <div>
      <h1>${page.title}</h1>
      {/* Page sections will be rendered here */}
    </div>
  );
}
`;
  }

  async validateForExport(projectId: string): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
    const project = getProject(projectId);
    if (!project) {
      return { valid: false, errors: ['Project not found'], warnings: [] };
    }

    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if project has pages
    if (project.pages.length === 0) {
      errors.push('Project has no pages');
    }

    // Check if theme is set
    if (!project.themeId) {
      errors.push('No theme selected');
    }

    // Check if at least one page has content
    const pagesWithContent = project.pages.filter(p => p.sections.length > 0);
    if (pagesWithContent.length === 0) {
      warnings.push('No pages have content');
    }

    // Check SEO
    const seoAudit = await seoService.auditProject(projectId);
    if (seoAudit.score < 50) {
      warnings.push(`SEO score is low (${seoAudit.score}/100)`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

export const exportService = new ExportService();
