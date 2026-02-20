import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new CourseCard());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isShown state', () => {
    expect(component.isShown()).toBe(false);
    component.toggle();
    expect(component.isShown()).toBe(true);
  });
});
