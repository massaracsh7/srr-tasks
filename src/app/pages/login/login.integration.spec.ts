import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import * as UserActions from '../../core/users/user.actions';
import { userReducer } from '../../core/users/user.reducer';
import { Login } from './login';

describe('Вход (интеграция)', () => {
  let component: Login;
  let store: Store;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [
        provideStore({ user: userReducer }),
        { provide: Router, useValue: routerMock },
      ],
    });

    store = TestBed.inject(Store);
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Login());
  });

  it('диспатчит действие входа', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.email.set('ivan@example.com');

    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.login({ email: 'ivan@example.com' }));
    expect(component.errorMessage()).toBe('');
  });

  it('создает компонент, когда в сторе уже есть текущий пользователь', () => {
    store.dispatch(
      UserActions.loginSuccess({
        user: { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
      })
    );

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Login());

    expect(component).toBeTruthy();
  });
});

