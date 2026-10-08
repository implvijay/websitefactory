// Authentication Service with SHA-256 password hashing
import { getUserByEmail, saveSession, clearSession, getSession, getUser } from '../../storage/BrowserStorage';
import type { User, Session } from '../../types';

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const passwordHash = await this.hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      return { success: false, error: 'Invalid password' };
    }

    const session: Session = {
      token: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: user.id,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    saveSession(session);
    return { success: true, user };
  }

  async logout(): Promise<void> {
    clearSession();
  }

  async getCurrentUser(): Promise<User | null> {
    const session = getSession();
    if (!session) return null;
    const user = await getUser(session.userId);
    return user || null;
  }

  async initialize(): Promise<{ user: User | null; isAuthenticated: boolean }> {
    const user = await this.getCurrentUser();
    return {
      user,
      isAuthenticated: !!user,
    };
  }
}

export const authService = new AuthService();
