// Media Service - Media library management
import type { MediaItem, Project } from '../../types';
import { getProject, saveProject } from '../../storage/BrowserStorage';

export class MediaService {
  async getProjectMedia(projectId: string): Promise<MediaItem[]> {
    const project = getProject(projectId);
    return project?.media || [];
  }

  async getMediaItem(projectId: string, mediaId: string): Promise<MediaItem | null> {
    const project = getProject(projectId);
    return project?.media.find(m => m.id === mediaId) || null;
  }

  async addMedia(projectId: string, media: Omit<MediaItem, 'id' | 'uploadedAt'>): Promise<MediaItem> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const newMedia: MediaItem = {
      ...media,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
    };

    const updatedProject: Project = {
      ...project,
      media: [...project.media, newMedia],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return newMedia;
  }

  async updateMedia(projectId: string, mediaId: string, updates: Partial<MediaItem>): Promise<MediaItem> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const mediaIndex = project.media.findIndex(m => m.id === mediaId);
    if (mediaIndex === -1) throw new Error('Media not found');

    const updatedMedia: MediaItem = {
      ...project.media[mediaIndex],
      ...updates,
    };

    const updatedMediaArray = [...project.media];
    updatedMediaArray[mediaIndex] = updatedMedia;

    const updatedProject: Project = {
      ...project,
      media: updatedMediaArray,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return updatedMedia;
  }

  async deleteMedia(projectId: string, mediaId: string): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedMedia = project.media.filter(m => m.id !== mediaId);
    const updatedProject: Project = {
      ...project,
      media: updatedMedia,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async searchMedia(projectId: string, query: string): Promise<MediaItem[]> {
    const media = await this.getProjectMedia(projectId);
    const lowerQuery = query.toLowerCase();

    return media.filter(item =>
      item.filename.toLowerCase().includes(lowerQuery) ||
      item.originalName.toLowerCase().includes(lowerQuery) ||
      item.alt?.toLowerCase().includes(lowerQuery) ||
      item.title?.toLowerCase().includes(lowerQuery)
    );
  }

  getMediaStats(projectId: string): { totalItems: number; totalSize: number; byType: Record<string, number> } {
    const project = getProject(projectId);
    const media = project?.media || [];

    const byType: Record<string, number> = {};
    let totalSize = 0;

    for (const item of media) {
      byType[item.mimeType] = (byType[item.mimeType] || 0) + 1;
      totalSize += item.size;
    }

    return {
      totalItems: media.length,
      totalSize,
      byType,
    };
  }

  isValidImageType(mimeType: string): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    return validTypes.includes(mimeType);
  }

  isValidFileSize(size: number): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB
    return size <= maxSize;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}

export const mediaService = new MediaService();
