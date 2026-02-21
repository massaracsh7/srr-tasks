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

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен выполнять переход по роуту', () => {
    component.navigate('/home');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('должен вызывать logout в сервисе пользователя', () => {
    component.logout();

    expect(userServiceMock.logout).toHaveBeenCalled();
  });
});

