import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NotFound } from './not-found';

describe('Страница не найдена', () => {
  let component: NotFound;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new NotFound());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен переходить на главную страницу', () => {
    component.goHome();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});

