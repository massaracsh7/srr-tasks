import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KeyboardLessonNavDirective } from './keyboard-lesson-nav';

describe('Клавиатурная навигация уроков', () => {
  let directive: KeyboardLessonNavDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    const injector = TestBed.inject(EnvironmentInjector);
    directive = runInInjectionContext(injector, () => new KeyboardLessonNavDirective());
  });

  it('должен создавать экземпляр', () => {
    expect(directive).toBeTruthy();
  });

  it('должен вызывать переход вперед при нажатии стрелки вправо', () => {
    const next = vi.fn();
    const back = vi.fn();
    (directive as any).next = next;
    (directive as any).back = back;

    directive.handle({ key: 'ArrowRight' } as KeyboardEvent);

    expect(next).toHaveBeenCalled();
    expect(back).not.toHaveBeenCalled();
  });
});

