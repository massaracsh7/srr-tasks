import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Login } from './login';
import { UserService } from '../../core/user';

describe('Login (integration)', () => {
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

  it('logs in existing user and navigates home', () => {
    component.email.set('ivan@example.com');

    component.login();

    expect(userService.currentUser()?.email).toBe('ivan@example.com');
    expect(component.errorMessage()).toBe('');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('does not navigate and sets error for unknown user', () => {
    component.email.set('unknown@example.com');

    component.login();

    expect(userService.currentUser()).toBeNull();
    expect(component.errorMessage()).toBe('LOGIN.ERROR_USER_NOT_FOUND');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
