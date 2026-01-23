import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userAdapter } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

const { selectAll, selectEntities } = userAdapter.getSelectors(selectUserState);

export const selectUsers = selectAll;

export const selectUserEntities = selectEntities;

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.currentUser
);

export const selectUserById = (userId: number) =>
  createSelector(selectUserEntities, entities => entities[userId] || null);
