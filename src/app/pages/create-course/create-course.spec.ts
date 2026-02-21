import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../core/user';

import { CreateCourse } from './create-course';

describe('Создание курса', () => {
  let component: CreateCourse;

  const userServiceMock = {
    currentUser: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new CreateCourse());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен собирать payload курса и сбрасывать форму', () => {
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

