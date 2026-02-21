import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Login } from './login';
import { UserService } from '../../core/user';

describe('Вход (интеграция)', () => {
  let component: Login;
  let userService: UserService;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });

    userService = TestBed.inject(UserService);
    component = new Login(userService, TestBed.inject(Router));
  });

  it('выполняет вход существующего пользователя и переходит на главную', () => {
    component.email.set('ivan@example.com');

    component.login();

    expect(userService.currentUser()?.email).toBe('ivan@example.com');
    expect(component.errorMessage()).toBe('');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('не выполняет навигацию и устанавливает ошибку для неизвестного пользователя', () => {
    component.email.set('unknown@example.com');

    component.login();

    expect(userService.currentUser()).toBeNull();
    expect(component.errorMessage()).toBe('LOGIN.ERROR_USER_NOT_FOUND');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

