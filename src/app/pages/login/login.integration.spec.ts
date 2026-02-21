import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore, Store } from '@ngxs/store';
import { Login as LoginAction, UserState } from '../../core/users/user.state';
import { Login } from './login';

describe('Вход (интеграционный тест)', () => {
  let component: Login;
  let store: Store;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [
        provideStore([UserState]),
        { provide: Router, useValue: routerMock },
      ],
    });

    store = TestBed.inject(Store);
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Login());
  });

  it('отправляет действие входа', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.email.set('ivan@example.com');

    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(new LoginAction('ivan@example.com'));
    expect(component.errorMessage()).toBe('');
  });

  it('создает компонент, когда в хранилище уже есть текущий пользователь', () => {
    store.dispatch(new LoginAction('ivan@example.com'));

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Login());

    expect(component).toBeTruthy();
  });
});

