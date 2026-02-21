import { UserState, Login, Logout, type UserStateModel } from './users/user.state';

describe('UserState', () => {
  let state: UserState;
  let patchState: ReturnType<typeof vi.fn>;
  let ctx: { patchState: (val: Partial<UserStateModel>) => void };

  beforeEach(() => {
    state = new UserState();
    patchState = vi.fn();
    ctx = { patchState };
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Login sets currentUser and stores it in localStorage for known email', () => {
    state.login(ctx as any, new Login('ivan@example.com'));

    expect(patchState).toHaveBeenCalledWith({
      currentUser: { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
    });
    expect(JSON.parse(localStorage.getItem('currentUser') ?? 'null')).toEqual({
      id: 1,
      name: 'Ivan Ivanov',
      email: 'ivan@example.com',
      role: 'student',
    });
  });

  it('Login sets currentUser to null and removes localStorage for unknown email', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'old@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    state.login(ctx as any, new Login('unknown@example.com'));

    expect(patchState).toHaveBeenCalledWith({ currentUser: null });
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('Logout clears currentUser and removes localStorage key', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'ivan@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    state.logout(ctx as any);

    expect(patchState).toHaveBeenCalledWith({ currentUser: null });
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });

  it('ngxsOnInit does nothing when localStorage has no currentUser', () => {
    state.ngxsOnInit(ctx as any);

    expect(patchState).not.toHaveBeenCalled();
  });

  it('ngxsOnInit restores currentUser from localStorage', () => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' })
    );

    state.ngxsOnInit(ctx as any);

    expect(patchState).toHaveBeenCalledWith({
      currentUser: { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' },
    });
  });

  it('currentUser selector returns state currentUser', () => {
    const model: UserStateModel = {
      currentUser: { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
    };

    expect(UserState.currentUser(model)?.email).toBe('ivan@example.com');
  });
});
