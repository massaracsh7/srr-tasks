import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import * as UserActions from './users/user.actions';
import { UserEffects } from './users/user.effects';
import { initialState, userReducer } from './users/user.reducer';

describe('Редьюсер пользователя ()', () => {
  it('устанавливает текущего пользователя при успешном входе', () => {
    const state = userReducer(
      initialState,
      UserActions.loginSuccess({
        user: { id: 1, name: 'Ivan', email: 'ivan@example.com', role: 'student' },
      })
    );

    expect(state.currentUser?.email).toBe('ivan@example.com');
  });

  it('очищает текущего пользователя при успешном выходе', () => {
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

describe('Эффекты пользователя', () => {
  let actions$: ReplaySubject<any>;

  function createEffects() {
    const injector = TestBed.inject(EnvironmentInjector);
    return runInInjectionContext(injector, () => TestBed.inject(UserEffects));
  }

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        {
          provide: Actions,
          useFactory: () => new Actions(actions$),
        },
      ],
    });
  });

  it('поток входа возвращает пользователя и сохраняет его в локальном хранилище', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const effects = createEffects();
    const actionPromise = firstValueFrom(effects.login$);

    actions$.next(UserActions.login({ email: 'ivan@example.com' }));
    const action: any = await actionPromise;
    expect(action.type).toBe(UserActions.loginSuccess.type);
    expect(action.user?.email).toBe('ivan@example.com');
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it('поток входа возвращает пустое значение и очищает локальное хранилище для неизвестного пользователя', async () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'old@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const effects = createEffects();
    const actionPromise = firstValueFrom(effects.login$);

    actions$.next(UserActions.login({ email: 'unknown@example.com' }));
    const action: any = await actionPromise;
    expect(action).toEqual(UserActions.loginSuccess({ user: null }));
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });

  it('поток выхода подтверждает выход и удаляет текущего пользователя при наличии', async () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'ivan@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const effects = createEffects();
    const actionPromise = firstValueFrom(effects.logout$);

    actions$.next(UserActions.logout());
    const action: any = await actionPromise;
    expect(action).toEqual(UserActions.logoutSuccess());
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });

  it('восстановление сессии ничего не возвращает, если в локальном хранилище нет текущего пользователя', () => {
    const effects = createEffects();
    const emitted: any[] = [];

    effects.restoreSession$.subscribe((action: any) => emitted.push(action));

    expect(emitted).toEqual([]);
  });

  it('восстановление сессии выполняет вход для валидного сохраненного пользователя', () => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' })
    );
    const effects = createEffects();
    const emitted: any[] = [];

    effects.restoreSession$.subscribe((action: any) => emitted.push(action));

    expect(emitted).toEqual([
      UserActions.loginSuccess({
        user: { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
      }),
    ]);
  });

  it('восстановление сессии выполняет выход и очищает локальное хранилище для неизвестного сохраненного пользователя', () => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: 999, name: 'Ghost', email: 'ghost@example.com', role: 'student' })
    );
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const effects = createEffects();
    const emitted: any[] = [];

    effects.restoreSession$.subscribe((action: any) => emitted.push(action));

    expect(emitted).toEqual([UserActions.logoutSuccess()]);
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });
});

