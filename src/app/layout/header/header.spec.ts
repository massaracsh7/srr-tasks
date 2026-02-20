import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/user';

import { Header } from './header';

describe('Header', () => {
  let component: Header;

  const routerMock = {
    navigate: vi.fn(),
  };

  const userServiceMock = {
    logout: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Header());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to route', () => {
    component.navigate('/home');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call logout on user service', () => {
    component.logout();

    expect(userServiceMock.logout).toHaveBeenCalled();
  });
});
