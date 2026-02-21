import { EnvironmentInjector, input, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { coursesReducer } from '../../core/courses/courses.reducer';
import { Lesson } from './lesson';

describe('Урок (интеграция)', () => {
  let component: Lesson;
  let store: Store;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    let requiredCall = 0;
    vi.spyOn(input, 'required').mockImplementation(() => {
      requiredCall += 1;
      return (() => (requiredCall === 1 ? '1' : '1')) as any;
    });

    TestBed.configureTestingModule({
      providers: [
        provideStore({ courses: coursesReducer }),
        { provide: Router, useValue: routerMock },
      ],
    });

    store = TestBed.inject(Store);
    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Lesson());
  });

  it('создает компонент с реальным графом сервисов', () => {
    expect(component).toBeTruthy();
  });

  it('переходит обратно на страницу курса', () => {
    component.goBack();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/course', '1']);
  });

  it('переходит к следующему уроку, когда он существует', () => {
    component.course.set({
      id: 1,
      lessons: [
        { id: 1, title: 'Components', videoUrl: 'v1' },
        { id: 2, title: 'Signals', videoUrl: 'v2' },
      ],
    } as any);
    component.lesson.set({ id: 1, title: 'Components', videoUrl: 'v1' } as any);

    component.nextLesson();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/course', 1, 2]);
  });
});

