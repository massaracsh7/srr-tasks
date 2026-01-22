import { createFeature } from '@ngrx/store';
import { coursesReducer } from './courses.reducer';

export const coursesFeature = createFeature({
  name: 'courses',
  reducer: coursesReducer,
});