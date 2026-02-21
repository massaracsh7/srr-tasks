import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Courses } from '../../core/courses';
import { Home } from './home';

describe('Home (integration)', () => {
  let component: Home;
  let coursesService: Courses;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    coursesService = TestBed.inject(Courses);
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Home());
  });

  it('returns all courses by default', () => {
    const all = coursesService.courses();
    const filtered = component.filteredCourses();

    expect(filtered.length).toBe(all.length);
  });

  it('filters by category', () => {
    component.category.set('Frontend');

    const filtered = component.filteredCourses();

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(c => c.category === 'Frontend')).toBe(true);
  });

  it('filters by multiple criteria', () => {
    component.category.set('Programming');
    component.difficulty.set('Advanced');
    component.language.set('EN');

    const filtered = component.filteredCourses();

    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every(
        c =>
          c.category === 'Programming' &&
          c.difficulty === 'Advanced' &&
          c.language === 'EN'
      )
    ).toBe(true);
  });
});
