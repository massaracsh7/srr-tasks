import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/models';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  currentUser: User | null;
}

export const initialState: UserState = {
  users: [
    { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
    { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' }
  ],
  currentUser: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    currentUser: user
  })),

  on(UserActions.logout, (state) => ({
    ...state,
    currentUser: null
  }))
);
