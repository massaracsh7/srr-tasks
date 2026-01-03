import { Injectable, signal } from '@angular/core';
import { Course } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  courses = signal<Course[]>([
    {
      id: 1,
      title: 'Angular 20 Basics',
      category: 'Frontend',
      difficulty: 'Beginner',
      language: 'EN',
      rating: 4.5,
      author: 'Ivan Ivanov',
      description: 'Learn Angular 20 from scratch',
      goals: ['Components', 'Signals', 'Routing'],
      lessons: [
        { id: 1, title: 'Components', videoUrl: 'https://www.example.com/video1' },
        { id: 2, title: 'Signals', videoUrl: 'https://www.example.com/video2' }
      ]
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      category: 'Programming',
      difficulty: 'Advanced',
      language: 'EN',
      rating: 4.8,
      author: 'Anna Petrova',
      description: 'Deep dive into TypeScript',
      goals: ['Generics', 'Decorators', 'Utility Types'],
      lessons: [
        { id: 1, title: 'Generics', videoUrl: 'https://www.example.com/video3' },
        { id: 2, title: 'Decorators', videoUrl: 'https://www.example.com/video4' }
      ]
    }
  ]);

  getCourseById(id: number) {
    return this.courses().find(c => c.id === id);
  }

  filterCourses(filters: { category?: string; difficulty?: string; language?: string }) {
    return this.courses().filter(c =>
      (!filters.category || c.category === filters.category) &&
      (!filters.difficulty || c.difficulty === filters.difficulty) &&
      (!filters.language || c.language === filters.language)
    );
  }
}
