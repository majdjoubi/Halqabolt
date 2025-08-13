// نظام مصادقة محلي بسيط
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// محاكاة قاعدة بيانات محلية
const USERS_KEY = 'halqa_users';
const CURRENT_USER_KEY = 'halqa_current_user';

export class AuthService {
  static getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  static signUp(email: string, password: string, name: string): { success: boolean; error?: string; user?: User } {
    const users = this.getUsers();
    
    // التحقق من وجود المستخدم
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'البريد الإلكتروني مستخدم بالفعل' };
    }

    // إنشاء مستخدم جديد
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  static signIn(email: string, password: string): { success: boolean; error?: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, error: 'البريد الإلكتروني غير موجود' };
    }

    // في التطبيق الحقيقي، يجب التحقق من كلمة المرور
    this.setCurrentUser(user);
    return { success: true, user };
  }

  static signOut(): void {
    this.setCurrentUser(null);
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}