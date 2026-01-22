import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { Course } from '../../models/models';

export interface CoursesState {
  courses: Course[];
  filters: {
    category?: string;
    difficulty?: string;
    language?: string;
  };
}

export const initialState: CoursesState = {
  courses: [
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
        { id: 1, title: 'Components', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: 'Signals', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
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
        { id: 1, title: 'Generics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: 'Decorators', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
      ]
    }
  ],
  filters: {}
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.setCourses, (state, { courses }) => ({
    ...state,
    courses
  })),
  on(CoursesActions.setFilters, (state, { filters }) => ({
    ...state,
    filters
  }))
);
