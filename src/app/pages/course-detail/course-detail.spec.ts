import { EnvironmentInjector, input, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectCourses } from '../../core/courses/courses.selectors';

import { CourseDetail } from './course-detail';

describe('CourseDetail', () => {
  let component: CourseDetail;

  const storeMock = {
    select: vi.fn((selector: unknown) => {
      if (selector === selectCourses) {
        return of([{ id: 1, title: 'Angular 20 Basics', description: '', lessons: [] }]);
      }
      return of(null);
    }),
    dispatch: vi.fn(),
  };

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.spyOn(input, 'required').mockReturnValue((() => '1') as any);

    await TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new CourseDetail());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signals', () => {
    expect(component.course()).toBeUndefined();
    expect(component.progress()).toBeGreaterThanOrEqual(0);
    expect(component.progress()).toBeLessThan(100);
  });
});
