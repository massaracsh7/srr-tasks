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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty courses', () => {
    expect(component.filteredCourses()).toEqual([]);
  });

  it('should dispatch selected filters', () => {
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
