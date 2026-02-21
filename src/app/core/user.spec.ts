import { UserState, Login, Logout, type UserStateModel } from './users/user.state';

describe('User', () => {
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

  it('вход устанавливает текущего пользователя и сохраняет его в локальном хранилище для известного адреса', () => {
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

  it('вход устанавливает пустого пользователя и очищает локальное хранилище для неизвестного адреса', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'old@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    state.login(ctx as any, new Login('unknown@example.com'));

    expect(patchState).toHaveBeenCalledWith({ currentUser: null });
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('выход очищает текущего пользователя и удаляет ключ из локального хранилища', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'ivan@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    state.logout(ctx as any);

    expect(patchState).toHaveBeenCalledWith({ currentUser: null });
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });

  it('инициализация ничего не делает, когда в локальном хранилище нет текущего пользователя', () => {
    state.ngxsOnInit(ctx as any);

    expect(patchState).not.toHaveBeenCalled();
  });

  it('инициализация восстанавливает текущего пользователя из локального хранилища', () => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' })
    );

    state.ngxsOnInit(ctx as any);

    expect(patchState).toHaveBeenCalledWith({
      currentUser: { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' },
    });
  });

  it('селектор текущего пользователя возвращает текущего пользователя из состояния', () => {
    const model: UserStateModel = {
      currentUser: { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
    };

    expect(UserState.currentUser(model)?.email).toBe('ivan@example.com');
  });
});


