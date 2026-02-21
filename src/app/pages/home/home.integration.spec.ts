import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { CourseState, SetFilters } from '../../core/courses/courses.state';
import { Home } from './home';

describe('Home(интеграционный тест)', () => {
  let component: Home;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore([CourseState])],
    });

    store = TestBed.inject(Store);
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Home());
  });

  it('возвращает все курсы по умолчанию', () => {
    const filtered = component.filteredCourses();

    expect(Array.isArray(filtered)).toBe(true);
  });

  it('фильтрует по категории', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.category = 'Frontend';
    component.updateFilters();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new SetFilters({ category: 'Frontend', difficulty: undefined, language: undefined })
    );
  });

  it('фильтрует по нескольким критериям', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.category = 'Programming';
    component.difficulty = 'Advanced';
    component.language = 'EN';
    component.updateFilters();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new SetFilters({ category: 'Programming', difficulty: 'Advanced', language: 'EN' })
    );
  });
});

