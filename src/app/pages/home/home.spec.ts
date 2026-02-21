import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { setFilters } from '../../core/courses/courses.actions';

import { Home } from './home';

describe('Home', () => {
  let component: Home;

  const storeMock = {
    select: vi.fn(() => of([])),
    dispatch: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Home(storeMock as unknown as Store));
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен инициализироваться с пустым списком курсов', () => {
    expect(component.filteredCourses()).toEqual([]);
  });

  it('должен диспатчить выбранные фильтры', () => {
    component.category = 'Frontend';
    component.difficulty = 'Beginner';
    component.language = 'EN';

    component.updateFilters();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      setFilters({
        filters: { category: 'Frontend', difficulty: 'Beginner', language: 'EN' },
      })
    );
  });
});

