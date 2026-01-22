import { createAction, props } from '@ngrx/store';
import { User } from '../../models/models';

export const login = createAction(
  '[User] Login',
  props<{ email: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: User | null }>()
);

export const logout = createAction('[User] Logout');
