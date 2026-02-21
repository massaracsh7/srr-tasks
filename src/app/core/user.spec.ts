import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UserService } from './user';

describe('User', () => {
  let service: UserService;
  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login existing user', () => {
    const user = service.login('ivan@example.com');
    expect(user?.email).toBe('ivan@example.com');
    expect(service.currentUser()?.email).toBe('ivan@example.com');
  });

  it('should logout and navigate home', () => {
    service.currentUser.set({ id: 1, name: 'Ivan', email: 'ivan@example.com', role: 'student' });
    service.logout();

    expect(service.currentUser()).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
