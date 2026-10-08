// Permission Service - Role-Based Access Control
import type { UserRole } from '../../types';

export type Permission =
  | 'projects:view' | 'projects:create' | 'projects:edit' | 'projects:delete'
  | 'pages:view' | 'pages:create' | 'pages:edit' | 'pages:delete'
  | 'menus:view' | 'menus:create' | 'menus:edit' | 'menus:delete'
  | 'themes:view' | 'themes:edit'
  | 'media:view' | 'media:upload' | 'media:delete'
  | 'forms:view' | 'forms:create' | 'forms:edit' | 'forms:delete'
  | 'seo:view' | 'seo:edit'
  | 'analytics:view' | 'analytics:edit'
  | 'versions:view' | 'versions:create' | 'versions:rollback'
  | 'export:view' | 'export:execute'
  | 'users:view' | 'users:create' | 'users:edit' | 'users:delete';

const rolePermissions: Record<UserRole, Permission[]> = {
  administrator: [
    'projects:view', 'projects:create', 'projects:edit', 'projects:delete',
    'pages:view', 'pages:create', 'pages:edit', 'pages:delete',
    'menus:view', 'menus:create', 'menus:edit', 'menus:delete',
    'themes:view', 'themes:edit',
    'media:view', 'media:upload', 'media:delete',
    'forms:view', 'forms:create', 'forms:edit', 'forms:delete',
    'seo:view', 'seo:edit',
    'analytics:view', 'analytics:edit',
    'versions:view', 'versions:create', 'versions:rollback',
    'export:view', 'export:execute',
    'users:view', 'users:create', 'users:edit', 'users:delete',
  ],
  developer: [
    'projects:view', 'projects:create', 'projects:edit',
    'pages:view', 'pages:create', 'pages:edit', 'pages:delete',
    'menus:view', 'menus:create', 'menus:edit',
    'themes:view', 'themes:edit',
    'media:view', 'media:upload',
    'forms:view', 'forms:create', 'forms:edit',
    'seo:view', 'seo:edit',
    'analytics:view', 'analytics:edit',
    'versions:view', 'versions:create', 'versions:rollback',
    'export:view', 'export:execute',
  ],
  designer: [
    'projects:view',
    'pages:view', 'pages:create', 'pages:edit',
    'menus:view', 'menus:create', 'menus:edit',
    'themes:view',
    'media:view', 'media:upload',
    'seo:view',
    'versions:view',
    'export:view',
  ],
  viewer: [
    'projects:view',
    'pages:view',
    'menus:view',
    'themes:view',
    'media:view',
    'seo:view',
    'versions:view',
    'export:view',
  ],
};

export class PermissionService {
  static hasPermission(role: UserRole, permission: Permission): boolean {
    return rolePermissions[role]?.includes(permission) || false;
  }

  static getPermissions(role: UserRole): Permission[] {
    return rolePermissions[role] || [];
  }

  static getPermissionCount(role: UserRole): number {
    return this.getPermissions(role).length;
  }
}
