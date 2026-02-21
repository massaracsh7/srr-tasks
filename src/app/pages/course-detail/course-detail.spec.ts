import { EnvironmentInjector, input, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { CourseState } from '../../core/courses/courses.state';
import { UserState } from '../../core/users/user.state';

import { CourseDetail } from './course-detail';

describe('Детали курса', () => {
  let component: CourseDetail;

  const storeMock = {
    select: vi.fn((selector: unknown) => {
      if (selector === CourseState.courses) {
        return of([{ id: 1, title: 'Angular 20 Basics', description: '', lessons: [] }]);
      }
      if (selector === UserState.currentUser) {
        return of(null);
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

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен инициализировать сигналы', () => {
    expect(component.course()).toBeUndefined();
    expect(component.progress()).toBeGreaterThanOrEqual(0);
    expect(component.progress()).toBeLessThan(100);
  });
});

