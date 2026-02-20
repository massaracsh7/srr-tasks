import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import * as UserActions from './users/user.actions';
import { UserEffects } from './users/user.effects';
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

describe('UserEffects', () => {
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

  it('login$ emits loginSuccess with user and stores user in localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const effects = createEffects();
    const actionPromise = firstValueFrom(effects.login$);

    actions$.next(UserActions.login({ email: 'ivan@example.com' }));
    const action: any = await actionPromise;
    expect(action.type).toBe(UserActions.loginSuccess.type);
    expect(action.user?.email).toBe('ivan@example.com');
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it('login$ emits loginSuccess with null and clears localStorage for unknown user', async () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'old@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const effects = createEffects();
    const actionPromise = firstValueFrom(effects.login$);

    actions$.next(UserActions.login({ email: 'unknown@example.com' }));
    const action: any = await actionPromise;
    expect(action).toEqual(UserActions.loginSuccess({ user: null }));
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });

  it('logout$ emits logoutSuccess and removes currentUser when present', async () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'ivan@example.com' }));
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const effects = createEffects();
    const actionPromise = firstValueFrom(effects.logout$);

    actions$.next(UserActions.logout());
    const action: any = await actionPromise;
    expect(action).toEqual(UserActions.logoutSuccess());
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
  });

  it('restoreSession$ emits nothing when currentUser is absent in localStorage', () => {
    const effects = createEffects();
    const emitted: any[] = [];

    effects.restoreSession$.subscribe((action: any) => emitted.push(action));

    expect(emitted).toEqual([]);
  });

  it('restoreSession$ emits loginSuccess for valid stored user', () => {
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

  it('restoreSession$ emits logoutSuccess and clears localStorage for unknown stored user', () => {
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
