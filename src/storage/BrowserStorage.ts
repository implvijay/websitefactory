// Storage abstraction layer - Phase 1 uses localStorage, future phases can use filesystem/database

import type { Project, User, Session } from '../types';

const PROJECTS_KEY = 'wf_projects';
const USERS_KEY = 'wf_users';
const SESSION_KEY = 'wf_session';

// Projects
export function getProjects(): Project[] {
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getProject(id: string): Project | undefined {
  return getProjects().find(p => p.id === id);
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  saveProjects(projects);
}

export function deleteProject(id: string): void {
  saveProjects(getProjects().filter(p => p.id !== id));
}

// Users (simplified auth for Phase 1)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function getUsers(): Promise<User[]> {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    // Create default admin user with SHA-256 hashed password
    const passwordHash = await hashPassword('password');
    const defaultUser: User = {
      id: 'admin',
      email: 'admin@websitefactory.com',
      name: 'Admin User',
      role: 'administrator',
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    saveUsers([defaultUser]);
    return [defaultUser];
  }
  return JSON.parse(data);
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function getUser(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u: User) => u.id === id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u: User) => u.email === email);
}

// Session
export function getSession(): Session | null {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  const session: Session = JSON.parse(data);
  if (session.expiresAt < Date.now()) {
    clearSession();
    return null;
  }
  return session;
}

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Auth helpers
export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const user = await getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    return { success: false, error: 'Invalid password' };
  }
  const session: Session = {
    token: Math.random().toString(36).substring(2),
    userId: user.id,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  saveSession(session);
  return { success: true, user };
}

export function logout(): void {
  clearSession();
}

export async function getCurrentUser(): Promise<User | null> {
  const session = getSession();
  if (!session) return null;
  const user = await getUser(session.userId);
  return user || null;
}

// Permissions
export function hasPermission(user: User, permission: string): boolean {
  const permissions: Record<string, string[]> = {
    administrator: ['*'],
    developer: ['projects:*', 'pages:*', 'menus:*', 'themes:view', 'export:*'],
    designer: ['projects:view', 'pages:*', 'menus:*', 'themes:view'],
    viewer: ['projects:view', 'pages:view', 'themes:view'],
  };
  
  const userPerms = permissions[user.role] || [];
  if (userPerms.includes('*')) return true;
  
  const [resource, action] = permission.split(':');
  return userPerms.some(p => {
    const [r, a] = p.split(':');
    return (r === resource || r === '*') && (a === action || a === '*');
  });
}
