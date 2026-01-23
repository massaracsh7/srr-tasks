import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../models/user.model';
import * as UserActions from './user.actions';
import { createReducer, on } from '@ngrx/store';

export const userAdapter = createEntityAdapter<User>({
  selectId: user => user.id,
  sortComparer: false
});

export interface UserState extends EntityState<User> {
  currentUser: User | null;
}

const mockUsers: User[] = [
  { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
  { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' }
];

export const initialState: UserState = userAdapter.setAll(
  mockUsers,
  userAdapter.getInitialState({
    currentUser: null
  })
);

export const userReducer = createReducer(
  initialState,

  on(UserActions.loginSuccess, (state, { user }) => {
    if (!user) {
      return {
      ...state,
      currentUser: null
    }; 
  }
  const exists = !!state.entities[user.id];

  return {
    ...state,
    currentUser: exists ? state.entities[user.id]! : null
  };
}),

  on(UserActions.logoutSuccess, (state) => ({
    ...state,
    currentUser: null
  }))
);
