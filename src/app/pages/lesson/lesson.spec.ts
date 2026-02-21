import { EnvironmentInjector, input, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { Lesson } from './lesson';

describe('Урок', () => {
  let component: Lesson;

  const routerMock = {
    navigate: vi.fn(),
  };

  const storeMock = {
    select: vi.fn(() =>
      of([
        {
          id: 1,
          lessons: [
            { id: 2, title: 'Lesson 2', videoUrl: 'video-2' },
            { id: 3, title: 'Lesson 3', videoUrl: 'video-3' },
          ],
        },
      ])
    ),
    dispatch: vi.fn(),
  };

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    vi.spyOn(input, 'required')
      .mockReturnValueOnce((() => '1') as any)
      .mockReturnValueOnce((() => '2') as any);

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Lesson());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен возвращаться к курсу', () => {
    component.goBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/course', '1']);
  });

  it('должен переходить к следующему уроку, когда он существует', () => {
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

