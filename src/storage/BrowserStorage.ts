// Browser storage layer using localStorage
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

// Users (simplified auth)
export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    // Create default admin user
    const defaultUser: User = {
      id: 'admin',
      email: 'admin@websitefactory.com',
      name: 'Admin User',
      role: 'administrator',
      passwordHash: btoa('password'), // Simple hash for demo
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

export function getUser(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email === email);
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
export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const user = getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  if (user.passwordHash !== btoa(password)) {
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

export function getCurrentUser(): User | null {
  const session = getSession();
  if (!session) return null;
  return getUser(session.userId) || null;
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
