import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CreateCourse } from './create-course';

describe('Создание курса', () => {
  let component: CreateCourse;

  const storeMock = {
    select: vi.fn(() => of(null)),
    dispatch: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: Store, useValue: storeMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new CreateCourse());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен формировать данные курса и сбрасывать форму', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.form.setValue({
      title: 'Angular',
      description: 'Course description',
      goals: 'Signals, Routing',
      lessons: 'Intro, Components',
    });

    component.saveCourse();

    expect(logSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
    expect(component.form.value.title).toBeNull();

    logSpy.mockRestore();
    alertSpy.mockRestore();
  });
});

