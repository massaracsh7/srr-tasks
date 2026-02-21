import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as UserActions from '../../core/users/user.actions';
import { Login } from './login';

describe('Вход', () => {
  let component: Login;

  const routerMock = {
    navigate: vi.fn(),
  };

  const storeMock = {
    select: vi.fn(() => of(null)),
    dispatch: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Login());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен отправлять действие входа с адресом электронной почты', () => {
    component.email.set('ivan@example.com');

    component.login();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      UserActions.login({ email: 'ivan@example.com' })
    );
    expect(component.errorMessage()).toBe('');
  });

  it('должен инициализироваться с пустым сообщением об ошибке', () => {
    expect(component.errorMessage()).toBe('');
  });
});

