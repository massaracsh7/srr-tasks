import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { setFilters } from '../../core/courses/courses.actions';
import { coursesReducer } from '../../core/courses/courses.reducer';
import { Home } from './home';

describe('Home (integration)', () => {
  let component: Home;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore({ courses: coursesReducer })],
    });

    store = TestBed.inject(Store);
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Home(store));
  });

  it('returns all courses by default', () => {
    const filtered = component.filteredCourses();

    expect(Array.isArray(filtered)).toBe(true);
  });

  it('filters by category', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.category = 'Frontend';
    component.updateFilters();

    expect(dispatchSpy).toHaveBeenCalledWith(
      setFilters({ filters: { category: 'Frontend', difficulty: undefined, language: undefined } })
    );
  });

  it('filters by multiple criteria', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.category = 'Programming';
    component.difficulty = 'Advanced';
    component.language = 'EN';
    component.updateFilters();

    expect(dispatchSpy).toHaveBeenCalledWith(
      setFilters({
        filters: { category: 'Programming', difficulty: 'Advanced', language: 'EN' },
      })
    );
  });
});
