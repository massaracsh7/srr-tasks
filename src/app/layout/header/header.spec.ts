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

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен переходить по маршруту', () => {
    component.navigate('/home');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('должен диспатчить logout и переходить на логин', () => {
    component.logout();

    expect(storeMock.dispatch).toHaveBeenCalledWith(UserActions.logout());
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});

