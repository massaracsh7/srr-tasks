import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Courses } from '../../core/courses';

import { Home } from './home';

describe('Home', () => {
  let component: Home;

  const coursesMock = {
    filterCourses: vi.fn(() => []),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [{ provide: Courses, useValue: coursesMock }],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Home());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request courses with empty filters by default', () => {
    component.filteredCourses();

    expect(coursesMock.filterCourses).toHaveBeenCalledWith({
      category: '',
      difficulty: '',
      language: '',
    });
  });

  it('should request courses with selected filters', () => {
    component.category.set('Frontend');
    component.difficulty.set('Beginner');
    component.language.set('EN');

    component.filteredCourses();

    expect(coursesMock.filterCourses).toHaveBeenCalledWith({
      category: 'Frontend',
      difficulty: 'Beginner',
      language: 'EN',
    });
  });
});
