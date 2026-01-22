import { Lesson } from "./lesson.model";

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
