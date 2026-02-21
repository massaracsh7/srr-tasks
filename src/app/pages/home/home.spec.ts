import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Courses } from '../../core/courses';

import { Home } from './home';

describe('Главная страница', () => {
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

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен запрашивать курсы с пустыми фильтрами по умолчанию', () => {
    component.filteredCourses();

    expect(coursesMock.filterCourses).toHaveBeenCalledWith({
      category: '',
      difficulty: '',
      language: '',
    });
  });

  it('должен запрашивать курсы с выбранными фильтрами', () => {
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

