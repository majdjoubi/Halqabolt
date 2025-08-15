// Mock database for development - will be replaced with Vercel database
interface Teacher {
  id: string;
  name: string;
  specialization: string;
  experience_years: number;
  rating: number;
  students_count: number;
  hourly_rate: number;
  bio: string;
  certificates: string[];
  languages: string[];
  profile_image_url: string;
  is_verified: boolean;
}

interface Student {
  id: string;
  name: string;
  age: number;
  level: string;
  goals: string[];
  preferred_schedule: string;
  profile_image_url: string;
}

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher';
  profile: Teacher | Student;
}

// Mock data
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'الشيخ أحمد محمود',
    specialization: 'متخصص في التجويد والقراءات',
    experience_years: 15,
    rating: 4.9,
    students_count: 450,
    hourly_rate: 25,
    bio: 'معلم قرآن كريم بخبرة 15 سنة، حاصل على إجازات في القراءات العشر',
    certificates: ['إجازة في رواية حفص', 'شهادة التجويد المتقدم'],
    languages: ['العربية', 'الإنجليزية'],
    profile_image_url: 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_verified: true
  },
  {
    id: '2',
    name: 'الأستاذة فاطمة السيد',
    specialization: 'تحفيظ القرآن للأطفال',
    experience_years: 10,
    rating: 4.8,
    students_count: 320,
    hourly_rate: 20,
    bio: 'متخصصة في تعليم الأطفال وتحفيظهم القرآن الكريم',
    certificates: ['إجازة في القرآن الكريم', 'دبلوم تعليم الأطفال'],
    languages: ['العربية', 'الفرنسية'],
    profile_image_url: 'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_verified: true
  }
];

// Mock authentication
let currentUser: User | null = null;

export const auth = {
  signIn: async (email: string, password: string, role: 'student' | 'teacher'): Promise<User> => {
    // Mock sign in
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      profile: role === 'teacher' ? mockTeachers[0] : {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        age: 0,
        level: 'beginner',
        goals: [],
        preferred_schedule: '',
        profile_image_url: ''
      }
    };
    
    currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  signUp: async (email: string, password: string, role: 'student' | 'teacher'): Promise<User> => {
    // Mock sign up
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      profile: role === 'teacher' ? {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        specialization: '',
        experience_years: 0,
        rating: 0,
        students_count: 0,
        hourly_rate: 0,
        bio: '',
        certificates: [],
        languages: ['العربية'],
        profile_image_url: '',
        is_verified: false
      } : {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        age: 0,
        level: 'beginner',
        goals: [],
        preferred_schedule: '',
        profile_image_url: ''
      }
    };
    
    currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  signOut: async (): Promise<void> => {
    currentUser = null;
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    const stored = localStorage.getItem('user');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
    
    return null;
  },

  updateUserProfile: async (userId: string, profileData: any): Promise<User | null> => {
    if (!currentUser || currentUser.id !== userId) return null;
    
    // Update current user
    currentUser.profile = { ...currentUser.profile, ...profileData };
    localStorage.setItem('user', JSON.stringify(currentUser));
    
    // Update in users list
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = existingUsers.findIndex((u: User) => u.id === userId);
    if (userIndex !== -1) {
      existingUsers[userIndex] = currentUser;
      localStorage.setItem('users', JSON.stringify(existingUsers));
    }
    
    return currentUser;
  }
};

export const database = {
  getTeachers: async (): Promise<Teacher[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTeachers;
  },

  getTeacher: async (id: string): Promise<Teacher | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTeachers.find(t => t.id === id) || null;
  }
};