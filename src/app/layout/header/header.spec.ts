import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as UserActions from '../../core/users/user.actions';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to route', () => {
    component.navigate('/home');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should dispatch logout and navigate to login', () => {
    component.logout();

    expect(storeMock.dispatch).toHaveBeenCalledWith(UserActions.logout());
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
