import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { SetFilters } from '../../core/courses/courses.state';

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
    component = runInInjectionContext(injector, () => new Home());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен инициализироваться с пустым списком курсов', () => {
    expect(component.filteredCourses()).toEqual([]);
  });

  it('должен отправлять выбранные фильтры', () => {
    component.category = 'Frontend';
    component.difficulty = 'Beginner';
    component.language = 'EN';

    component.updateFilters();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      new SetFilters({ category: 'Frontend', difficulty: 'Beginner', language: 'EN' })
    );
  });
});

