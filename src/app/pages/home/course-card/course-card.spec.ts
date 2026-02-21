import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CourseCard } from './course-card';

describe('Карточка курса', () => {
  let component: CourseCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new CourseCard());
  });

  it('должна создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должна переключать состояние isShown', () => {
    expect(component.isShown()).toBe(false);
    component.toggle();
    expect(component.isShown()).toBe(true);
  });
});

