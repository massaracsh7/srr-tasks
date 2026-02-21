import { KeyboardLessonNavDirective } from './keyboard-lesson-nav';

describe('KeyboardLessonNav', () => {
  it('should create an instance', () => {
    const directive = new KeyboardLessonNavDirective();
    expect(directive).toBeTruthy();
  });

  it('should call next on ArrowRight', () => {
    const directive = new KeyboardLessonNavDirective();
    const next = vi.fn();
    const back = vi.fn();
    directive.next = next;
    directive.back = back;

    directive.handle({ key: 'ArrowRight' } as KeyboardEvent);

    expect(next).toHaveBeenCalled();
    expect(back).not.toHaveBeenCalled();
  });
});
