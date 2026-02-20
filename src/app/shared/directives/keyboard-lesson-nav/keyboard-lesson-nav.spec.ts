import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KeyboardLessonNavDirective } from './keyboard-lesson-nav';

describe('KeyboardLessonNav', () => {
  let directive: KeyboardLessonNavDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    const injector = TestBed.inject(EnvironmentInjector);
    directive = runInInjectionContext(injector, () => new KeyboardLessonNavDirective());
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call next on ArrowRight', () => {
    const next = vi.fn();
    const back = vi.fn();
    (directive as any).next = next;
    (directive as any).back = back;

    directive.handle({ key: 'ArrowRight' } as KeyboardEvent);

    expect(next).toHaveBeenCalled();
    expect(back).not.toHaveBeenCalled();
  });
});
