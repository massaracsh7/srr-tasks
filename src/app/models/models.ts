export interface Course {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: 'RU' | 'EN';
  rating: number;
  author: string;
  description: string;
  goals: string[];
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}