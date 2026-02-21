import { EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth-guard';
import { UserService } from './user';

describe('authGuard (интеграция)', () => {
  const routerMock = {
    navigate: vi.fn(),
  };

  const userServiceMock = {
    currentUser: signal<any>(null),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    userServiceMock.currentUser.set(null);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    });
  });

  it('возвращает false и перенаправляет на /login, когда пользователь не аутентифицирован', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const result = runInInjectionContext(injector, () => authGuard({} as any, {} as any));

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('возвращает true и не выполняет навигацию, когда пользователь аутентифицирован', () => {
    userServiceMock.currentUser.set({ id: 1, email: 'ivan@example.com' });

    const injector = TestBed.inject(EnvironmentInjector);
    const result = runInInjectionContext(injector, () => authGuard({} as any, {} as any));

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

