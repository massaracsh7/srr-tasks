import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Logout } from '../../core/users/user.state';

import { Header } from './header';

describe('Header', () => {
  let component: Header;

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
    component = runInInjectionContext(injector, () => new Header());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен переходить по маршруту', () => {
    component.navigate('/home');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('должен выполнять выход и переходить на страницу входа', () => {
    component.logout();

    expect(storeMock.dispatch).toHaveBeenCalledWith(new Logout());
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});

