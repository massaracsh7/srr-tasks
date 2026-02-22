import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Login as LoginAction } from '../../core/users/user.state';
import { Login } from './login';

describe('Вход', () => {
  let component: Login;

  const routerMock = {
    navigate: vi.fn(),
  };

  const storeMock = {
    select: vi.fn(() => of(null)),
    dispatch: vi.fn(),
    selectSnapshot: vi.fn(() => null),
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
    storeMock.selectSnapshot.mockReturnValueOnce({
      id: 1,
      name: 'Ivan Ivanov',
      email: 'ivan@example.com',
      role: 'student',
    });
    component.email.set('ivan@example.com');

    component.login();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      new LoginAction('ivan@example.com')
    );
    expect(component.errorMessage()).toBe('');
  });

  it('должен инициализироваться с пустым сообщением об ошибке', () => {
    expect(component.errorMessage()).toBe('');
  });
});

