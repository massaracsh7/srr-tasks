import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore, Store } from '@ngxs/store';
import { authGuard } from './auth-guard';
import { Login, UserState } from './users/user.state';

describe('authGuard (integration)', () => {
  let store: Store;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideStore([UserState]),
        { provide: Router, useValue: routerMock },
      ],
    });

    store = TestBed.inject(Store);
  });

  it('returns false and redirects to /login when user is not authenticated', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const result = runInInjectionContext(injector, () => authGuard({} as any, {} as any));

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('returns true and does not navigate when user is authenticated', () => {
    store.dispatch(new Login('ivan@example.com'));

    const injector = TestBed.inject(EnvironmentInjector);
    const result = runInInjectionContext(injector, () => authGuard({} as any, {} as any));

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
