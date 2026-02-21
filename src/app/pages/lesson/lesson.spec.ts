import { EnvironmentInjector, input, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Courses } from '../../core/courses';

import { Lesson } from './lesson';

describe('Lesson', () => {
  let component: Lesson;

  const routerMock = {
    navigate: vi.fn(),
  };

  const coursesMock = {
    getCourseById: vi.fn(),
  };

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    vi.spyOn(input, 'required').mockReturnValue((() => '2') as any);

    coursesMock.getCourseById.mockReturnValue({
      id: 1,
      lessons: [
        { id: 2, title: 'Lesson 2', videoUrl: 'video-2' },
        { id: 3, title: 'Lesson 3', videoUrl: 'video-3' },
      ],
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Courses, useValue: coursesMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Lesson());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to course', () => {
    component.goBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/course', '2']);
  });

  it('should navigate to next lesson when exists', () => {
    component.course.set({
      id: 1,
      lessons: [
        { id: 2, title: 'Lesson 2', videoUrl: 'video-2' },
        { id: 3, title: 'Lesson 3', videoUrl: 'video-3' },
      ],
    } as any);
    component.lesson.set({ id: 2, title: 'Lesson 2', videoUrl: 'video-2' } as any);

    component.nextLesson();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/course', 1, 3]);
  });
});
