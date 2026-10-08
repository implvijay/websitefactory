// Version Service - Version control and rollback
import type { Version, ProjectSnapshot, Project } from '../../types';
import { getProject, saveProject } from '../../storage/BrowserStorage';

export class VersionService {
  async getProjectVersions(projectId: string): Promise<Version[]> {
    const project = getProject(projectId);
    return project?.versions || [];
  }

  async getVersion(projectId: string, versionId: string): Promise<Version | null> {
    const project = getProject(projectId);
    return project?.versions.find(v => v.id === versionId) || null;
  }

  async createVersion(projectId: string, name: string, description: string, createdBy: string): Promise<Version> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const snapshot: ProjectSnapshot = {
      pages: project.pages,
      menus: project.menus,
      forms: project.forms,
      themeId: project.themeId,
      themeVariantId: project.themeVariantId,
      settings: project.settings,
    };

    const newVersion: Version = {
      id: Date.now().toString(),
      name,
      description,
      snapshot,
      createdAt: new Date().toISOString(),
      createdBy,
    };

    const updatedProject: Project = {
      ...project,
      versions: [...project.versions, newVersion],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return newVersion;
  }

  async deleteVersion(projectId: string, versionId: string): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedVersions = project.versions.filter(v => v.id !== versionId);
    const updatedProject: Project = {
      ...project,
      versions: updatedVersions,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async rollbackToVersion(projectId: string, versionId: string): Promise<void> {
    const version = await this.getVersion(projectId, versionId);
    if (!version) throw new Error('Version not found');

    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedProject: Project = {
      ...project,
      pages: version.snapshot.pages,
      menus: version.snapshot.menus,
      forms: version.snapshot.forms,
      themeId: version.snapshot.themeId,
      themeVariantId: version.snapshot.themeVariantId,
      settings: version.snapshot.settings,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async rollbackPages(projectId: string, versionId: string, pageIds: string[]): Promise<void> {
    const version = await this.getVersion(projectId, versionId);
    if (!version) throw new Error('Version not found');

    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedPages = project.pages.map(page => {
      if (pageIds.includes(page.id)) {
        const versionPage = version.snapshot.pages.find(p => p.id === page.id);
        return versionPage || page;
      }
      return page;
    });

    const updatedProject: Project = {
      ...project,
      pages: updatedPages,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async compareVersions(projectId: string, versionId1: string, versionId2: string): Promise<{
    pagesAdded: string[];
    pagesRemoved: string[];
    pagesModified: string[];
    menusChanged: boolean;
    formsChanged: boolean;
    themeChanged: boolean;
  }> {
    const version1 = await this.getVersion(projectId, versionId1);
    const version2 = await this.getVersion(projectId, versionId2);

    if (!version1 || !version2) throw new Error('Version not found');

    const pages1Ids = new Set(version1.snapshot.pages.map(p => p.id));
    const pages2Ids = new Set(version2.snapshot.pages.map(p => p.id));

    const pagesAdded = version2.snapshot.pages
      .filter(p => !pages1Ids.has(p.id))
      .map(p => p.title);

    const pagesRemoved = version1.snapshot.pages
      .filter(p => !pages2Ids.has(p.id))
      .map(p => p.title);

    const pagesModified = version2.snapshot.pages
      .filter(p2 => {
        const p1 = version1.snapshot.pages.find(p => p.id === p2.id);
        return p1 && JSON.stringify(p1) !== JSON.stringify(p2);
      })
      .map(p => p.title);

    const menusChanged = JSON.stringify(version1.snapshot.menus) !== JSON.stringify(version2.snapshot.menus);
    const formsChanged = JSON.stringify(version1.snapshot.forms) !== JSON.stringify(version2.snapshot.forms);
    const themeChanged = version1.snapshot.themeId !== version2.snapshot.themeId ||
                         version1.snapshot.themeVariantId !== version2.snapshot.themeVariantId;

    return {
      pagesAdded,
      pagesRemoved,
      pagesModified,
      menusChanged,
      formsChanged,
      themeChanged,
    };
  }

  async autoSave(projectId: string, userId: string): Promise<Version | null> {
    const versions = await this.getProjectVersions(projectId);
    const autoSaves = versions.filter(v => v.name === 'Auto-save');

    // Only auto-save if last auto-save was more than 5 minutes ago
    if (autoSaves.length > 0) {
      const lastAutoSave = autoSaves[autoSaves.length - 1];
      const timeSinceLastSave = Date.now() - new Date(lastAutoSave.createdAt).getTime();
      if (timeSinceLastSave < 5 * 60 * 1000) {
        return null;
      }
    }

    const version = await this.createVersion(projectId, 'Auto-save', 'Automatic version save', userId);

    // Keep only last 10 auto-saves
    if (autoSaves.length >= 10) {
      const toDelete = autoSaves.slice(0, autoSaves.length - 9);
      for (const v of toDelete) {
        await this.deleteVersion(projectId, v.id);
      }
    }

    return version;
  }

  getVersionStats(projectId: string): {
    totalVersions: number;
    autoSaves: number;
    manualVersions: number;
    lastVersionDate: string | null;
  } {
    const project = getProject(projectId);
    const versions = project?.versions || [];

    const autoSaves = versions.filter(v => v.name === 'Auto-save').length;
    const manualVersions = versions.length - autoSaves;

    return {
      totalVersions: versions.length,
      autoSaves,
      manualVersions,
      lastVersionDate: versions.length > 0 ? versions[versions.length - 1].createdAt : null,
    };
  }
}

export const versionService = new VersionService();
