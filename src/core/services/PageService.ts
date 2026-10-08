// Page Service - Complete page management with CRUD operations
import type { Page, Section, Project } from '../../types';
import { getProject, saveProject } from '../../storage/BrowserStorage';

export class PageService {
  async getProjectPages(projectId: string): Promise<Page[]> {
    const project = getProject(projectId);
    return project?.pages || [];
  }

  async getPage(projectId: string, pageId: string): Promise<Page | null> {
    const project = getProject(projectId);
    return project?.pages.find(p => p.id === pageId) || null;
  }

  async createPage(projectId: string, title: string, slug?: string): Promise<Page> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const newPage: Page = {
      id: Date.now().toString(),
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
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

    const updatedProject: Project = {
      ...project,
      pages: [...project.pages, newPage],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return newPage;
  }

  async updatePage(projectId: string, pageId: string, updates: Partial<Page>): Promise<Page> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const pageIndex = project.pages.findIndex(p => p.id === pageId);
    if (pageIndex === -1) throw new Error('Page not found');

    const updatedPage: Page = {
      ...project.pages[pageIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedPages = [...project.pages];
    updatedPages[pageIndex] = updatedPage;

    const updatedProject: Project = {
      ...project,
      pages: updatedPages,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return updatedPage;
  }

  async deletePage(projectId: string, pageId: string): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedPages = project.pages.filter(p => p.id !== pageId);
    const updatedProject: Project = {
      ...project,
      pages: updatedPages,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async reorderPages(projectId: string, pageIds: string[]): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const reorderedPages = pageIds
      .map((id, index) => {
        const page = project.pages.find(p => p.id === id);
        return page ? { ...page, order: index } : null;
      })
      .filter((p): p is Page => p !== null);

    const updatedProject: Project = {
      ...project,
      pages: reorderedPages,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async addSection(projectId: string, pageId: string, section: Section): Promise<Page> {
    const page = await this.getPage(projectId, pageId);
    if (!page) throw new Error('Page not found');

    const newSection: Section = {
      ...section,
      id: section.id || Date.now().toString(),
      order: page.sections.length,
    };

    return this.updatePage(projectId, pageId, {
      sections: [...page.sections, newSection],
    });
  }

  async updateSection(projectId: string, pageId: string, sectionId: string, updates: Partial<Section>): Promise<Page> {
    const page = await this.getPage(projectId, pageId);
    if (!page) throw new Error('Page not found');

    const updatedSections = page.sections.map(s =>
      s.id === sectionId ? { ...s, ...updates } : s
    );

    return this.updatePage(projectId, pageId, { sections: updatedSections });
  }

  async deleteSection(projectId: string, pageId: string, sectionId: string): Promise<Page> {
    const page = await this.getPage(projectId, pageId);
    if (!page) throw new Error('Page not found');

    const updatedSections = page.sections.filter(s => s.id !== sectionId);
    return this.updatePage(projectId, pageId, { sections: updatedSections });
  }

  async reorderSections(projectId: string, pageId: string, sectionIds: string[]): Promise<Page> {
    const page = await this.getPage(projectId, pageId);
    if (!page) throw new Error('Page not found');

    const reorderedSections = sectionIds
      .map((id, index) => {
        const section = page.sections.find(s => s.id === id);
        return section ? { ...section, order: index } : null;
      })
      .filter((s): s is Section => s !== null);

    return this.updatePage(projectId, pageId, { sections: reorderedSections });
  }

  async duplicatePage(projectId: string, pageId: string): Promise<Page> {
    const page = await this.getPage(projectId, pageId);
    if (!page) throw new Error('Page not found');

    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      sections: page.sections.map(s => ({ ...s, id: Date.now().toString() + Math.random() })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedProject: Project = {
      ...project,
      pages: [...project.pages, newPage],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return newPage;
  }
}

export const pageService = new PageService();
