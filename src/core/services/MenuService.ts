// Menu Service - Complete menu management with drag-and-drop support
import type { Menu, MenuItem, Project } from '../../types';
import { getProject, saveProject } from '../../storage/BrowserStorage';

export class MenuService {
  async getProjectMenus(projectId: string): Promise<Menu[]> {
    const project = getProject(projectId);
    return project?.menus || [];
  }

  async getMenu(projectId: string, menuId: string): Promise<Menu | null> {
    const project = getProject(projectId);
    return project?.menus.find(m => m.id === menuId) || null;
  }

  async createMenu(projectId: string, name: string, location: Menu['location']): Promise<Menu> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const newMenu: Menu = {
      id: Date.now().toString(),
      name,
      location,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProject: Project = {
      ...project,
      menus: [...project.menus, newMenu],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return newMenu;
  }

  async updateMenu(projectId: string, menuId: string, updates: Partial<Menu>): Promise<Menu> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const menuIndex = project.menus.findIndex(m => m.id === menuId);
    if (menuIndex === -1) throw new Error('Menu not found');

    const updatedMenu: Menu = {
      ...project.menus[menuIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedMenus = [...project.menus];
    updatedMenus[menuIndex] = updatedMenu;

    const updatedProject: Project = {
      ...project,
      menus: updatedMenus,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return updatedMenu;
  }

  async deleteMenu(projectId: string, menuId: string): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedMenus = project.menus.filter(m => m.id !== menuId);
    const updatedProject: Project = {
      ...project,
      menus: updatedMenus,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async cloneMenu(projectId: string, menuId: string): Promise<Menu> {
    const menu = await this.getMenu(projectId, menuId);
    if (!menu) throw new Error('Menu not found');

    const clonedMenu: Menu = {
      ...menu,
      id: Date.now().toString(),
      name: `${menu.name} (Copy)`,
      items: menu.items.map(item => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedProject: Project = {
      ...project,
      menus: [...project.menus, clonedMenu],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return clonedMenu;
  }

  async addMenuItem(projectId: string, menuId: string, item: Omit<MenuItem, 'id' | 'order'>): Promise<Menu> {
    const menu = await this.getMenu(projectId, menuId);
    if (!menu) throw new Error('Menu not found');

    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      order: menu.items.length,
    };

    return this.updateMenu(projectId, menuId, {
      items: [...menu.items, newItem],
    });
  }

  async updateMenuItem(projectId: string, menuId: string, itemId: string, updates: Partial<MenuItem>): Promise<Menu> {
    const menu = await this.getMenu(projectId, menuId);
    if (!menu) throw new Error('Menu not found');

    const updatedItems = menu.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );

    return this.updateMenu(projectId, menuId, { items: updatedItems });
  }

  async deleteMenuItem(projectId: string, menuId: string, itemId: string): Promise<Menu> {
    const menu = await this.getMenu(projectId, menuId);
    if (!menu) throw new Error('Menu not found');

    const updatedItems = menu.items.filter(item => item.id !== itemId);
    return this.updateMenu(projectId, menuId, { items: updatedItems });
  }

  async reorderMenuItems(projectId: string, menuId: string, itemIds: string[]): Promise<Menu> {
    const menu = await this.getMenu(projectId, menuId);
    if (!menu) throw new Error('Menu not found');

    const reorderedItems = itemIds
      .map((id, index) => {
        const item = menu.items.find(i => i.id === id);
        return item ? { ...item, order: index } : null;
      })
      .filter((i): i is MenuItem => i !== null);

    return this.updateMenu(projectId, menuId, { items: reorderedItems });
  }
}

export const menuService = new MenuService();
