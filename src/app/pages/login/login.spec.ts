import { Login } from './login';

describe('Login', () => {
  let component: Login;

  const userServiceMock = {
    login: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    component = new Login(userServiceMock as any, routerMock as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when user exists', () => {
    userServiceMock.login.mockReturnValue({ id: 1 });
    component.email.set('ivan@example.com');

    component.login();

    expect(userServiceMock.login).toHaveBeenCalledWith('ivan@example.com');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(component.errorMessage()).toBe('');
  });

  it('should set error message when user not found', () => {
    userServiceMock.login.mockReturnValue(null);
    component.email.set('missing@example.com');

    component.login();

    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage()).toBe('LOGIN.ERROR_USER_NOT_FOUND');
  });
});
