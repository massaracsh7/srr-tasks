import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import * as CoursesActions from './courses.actions';
import { Course } from '../../models/course.model';


export const coursesAdapter = createEntityAdapter<Course>({
  selectId: course => course.id,
  sortComparer: false
});

export interface CoursesState {
  ids: number[];
  entities: Record<number, Course>;
  filters: {
    category?: string;
    difficulty?: string;
    language?: string;
  };
}

const mockCourses: Course[] = [
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
];


export const initialState: CoursesState =
  coursesAdapter.setAll(
    mockCourses,
    coursesAdapter.getInitialState({
      filters: {}
    })
  );

export const coursesReducer = createReducer(
  initialState,

  on(CoursesActions.setCourses, (state, { courses }) =>
    coursesAdapter.setAll(courses, state)
  ),

  on(CoursesActions.setFilters, (state, { filters }) => ({
    ...state,
    filters
  }))
);
