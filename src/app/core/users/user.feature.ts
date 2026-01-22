import { createFeature } from '@ngrx/store';
import { userReducer } from './user.reducer';

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
});
