import { EnvironmentInjector, input, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Courses } from '../../core/courses';
import { UserService } from '../../core/user';

import { CourseDetail } from './course-detail';

describe('CourseDetail', () => {
  let component: CourseDetail;

  const coursesMock = {
    getCourseById: vi.fn(),
  };

  const userServiceMock = {
    currentUser: vi.fn(),
  };

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.spyOn(input, 'required').mockReturnValue((() => '1') as any);

    coursesMock.getCourseById.mockReturnValue({ id: 1, title: 'Angular 20 Basics' });

    await TestBed.configureTestingModule({
      providers: [
        { provide: Courses, useValue: coursesMock },
        { provide: UserService, useValue: userServiceMock },
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
