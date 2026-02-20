import * as UserActions from './users/user.actions';
import { initialState, userReducer } from './users/user.reducer';

describe('User reducer (legacy path)', () => {
  it('sets current user on loginSuccess', () => {
    const state = userReducer(
      initialState,
      UserActions.loginSuccess({
        user: { id: 1, name: 'Ivan', email: 'ivan@example.com', role: 'student' },
      })
    );

    expect(state.currentUser?.email).toBe('ivan@example.com');
  });

  it('clears current user on logoutSuccess', () => {
    const loggedInState = userReducer(
      initialState,
      UserActions.loginSuccess({
        user: { id: 1, name: 'Ivan', email: 'ivan@example.com', role: 'student' },
      })
    );

    const state = userReducer(loggedInState, UserActions.logoutSuccess());
    expect(state.currentUser).toBeNull();
  });
});
