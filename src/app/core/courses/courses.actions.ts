import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export interface CoursesFilters {
  category?: string;
  difficulty?: string;
  language?: string;
}

export const setCourses = createAction(
  '[Courses] Set Courses',
  props<{ courses: Course[] }>()
);

export const setFilters = createAction(
  '[Courses] Set Filters',
  props<{ filters: CoursesFilters }>()
);
