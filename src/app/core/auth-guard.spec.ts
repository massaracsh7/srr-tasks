import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { authGuard } from './auth-guard';
import * as UserActions from './users/user.actions';
import { userReducer } from './users/user.reducer';

describe('Гард авторизации (интеграция)', () => {
  let store: Store;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        provideStore({ user: userReducer }),
        { provide: Router, useValue: routerMock },
      ],
    });

    store = TestBed.inject(Store);
  });

  it('возвращает false и перенаправляет на /login, когда пользователь не аутентифицирован', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const result = runInInjectionContext(injector, () => authGuard({} as any, {} as any));

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('возвращает true и не выполняет навигацию, когда пользователь аутентифицирован', () => {
    store.dispatch(
      UserActions.loginSuccess({
        user: { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
      })
    );

    const injector = TestBed.inject(EnvironmentInjector);
    const result = runInInjectionContext(injector, () => authGuard({} as any, {} as any));

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

