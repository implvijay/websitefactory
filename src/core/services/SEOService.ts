// SEO Service - SEO audit and optimization
import type { Project, Page } from '../../types';
import { getProject } from '../../storage/BrowserStorage';

export interface SEOCheck {
  id: string;
  name: string;
  category: 'title' | 'meta' | 'headings' | 'content' | 'technical' | 'schema' | 'social' | 'performance';
  status: 'pass' | 'warning' | 'fail';
  message: string;
  points: number;
  maxPoints: number;
}

export interface SEOAuditResult {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  checks: SEOCheck[];
  recommendations: string[];
}

export class SEOService {
  async auditProject(projectId: string): Promise<SEOAuditResult> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const checks: SEOCheck[] = [];
    let totalPoints = 0;
    let maxPoints = 0;

    // Check project settings
    if (project.settings.siteTitle) {
      checks.push({
        id: 'site-title',
        name: 'Site Title',
        category: 'title',
        status: 'pass',
        message: 'Site title is set',
        points: 10,
        maxPoints: 10,
      });
    } else {
      checks.push({
        id: 'site-title',
        name: 'Site Title',
        category: 'title',
        status: 'fail',
        message: 'Site title is missing',
        points: 0,
        maxPoints: 10,
      });
    }
    totalPoints += project.settings.siteTitle ? 10 : 0;
    maxPoints += 10;

    if (project.settings.siteDescription) {
      checks.push({
        id: 'site-description',
        name: 'Site Description',
        category: 'meta',
        status: 'pass',
        message: 'Site description is set',
        points: 10,
        maxPoints: 10,
      });
    } else {
      checks.push({
        id: 'site-description',
        name: 'Site Description',
        category: 'meta',
        status: 'fail',
        message: 'Site description is missing',
        points: 0,
        maxPoints: 10,
      });
    }
    totalPoints += project.settings.siteDescription ? 10 : 0;
    maxPoints += 10;

    // Check pages
    for (const page of project.pages) {
      // Page title
      if (page.seo.title) {
        checks.push({
          id: `page-title-${page.id}`,
          name: `Page Title: ${page.title}`,
          category: 'title',
          status: 'pass',
          message: 'Page has SEO title',
          points: 5,
          maxPoints: 5,
        });
      } else {
        checks.push({
          id: `page-title-${page.id}`,
          name: `Page Title: ${page.title}`,
          category: 'title',
          status: 'warning',
          message: 'Page missing SEO title',
          points: 0,
          maxPoints: 5,
        });
      }
      totalPoints += page.seo.title ? 5 : 0;
      maxPoints += 5;

      // Page description
      if (page.seo.description) {
        checks.push({
          id: `page-desc-${page.id}`,
          name: `Meta Description: ${page.title}`,
          category: 'meta',
          status: 'pass',
          message: 'Page has meta description',
          points: 5,
          maxPoints: 5,
        });
      } else {
        checks.push({
          id: `page-desc-${page.id}`,
          name: `Meta Description: ${page.title}`,
          category: 'meta',
          status: 'warning',
          message: 'Page missing meta description',
          points: 0,
          maxPoints: 5,
        });
      }
      totalPoints += page.seo.description ? 5 : 0;
      maxPoints += 5;

      // Content check
      if (page.sections.length > 0) {
        checks.push({
          id: `page-content-${page.id}`,
          name: `Content: ${page.title}`,
          category: 'content',
          status: 'pass',
          message: `Page has ${page.sections.length} sections`,
          points: 5,
          maxPoints: 5,
        });
      } else {
        checks.push({
          id: `page-content-${page.id}`,
          name: `Content: ${page.title}`,
          category: 'content',
          status: 'fail',
          message: 'Page has no content',
          points: 0,
          maxPoints: 5,
        });
      }
      totalPoints += page.sections.length > 0 ? 5 : 0;
      maxPoints += 5;
    }

    // Check contact info
    if (project.settings.contactEmail) {
      checks.push({
        id: 'contact-email',
        name: 'Contact Email',
        category: 'technical',
        status: 'pass',
        message: 'Contact email is set',
        points: 5,
        maxPoints: 5,
      });
    } else {
      checks.push({
        id: 'contact-email',
        name: 'Contact Email',
        category: 'technical',
        status: 'warning',
        message: 'Contact email is missing',
        points: 0,
        maxPoints: 5,
      });
    }
    totalPoints += project.settings.contactEmail ? 5 : 0;
    maxPoints += 5;

    const score = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
    const grade = this.calculateGrade(score);
    const recommendations = this.generateRecommendations(checks);

    return { score, grade, checks, recommendations };
  }

  private calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  private generateRecommendations(checks: SEOCheck[]): string[] {
    const recommendations: string[] = [];
    
    const failedChecks = checks.filter(c => c.status === 'fail');
    const warningChecks = checks.filter(c => c.status === 'warning');

    for (const check of failedChecks) {
      recommendations.push(`Fix: ${check.message}`);
    }

    for (const check of warningChecks) {
      recommendations.push(`Improve: ${check.message}`);
    }

    return recommendations.slice(0, 10);
  }

  generateSitemap(projectId: string): string {
    const project = getProject(projectId);
    if (!project) return '';

    const urls = project.pages.map(page => `
  <url>
    <loc>https://example.com/${page.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === 'home' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  generateRobots(): string {
    return `User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml`;
  }
}

export const seoService = new SEOService();
