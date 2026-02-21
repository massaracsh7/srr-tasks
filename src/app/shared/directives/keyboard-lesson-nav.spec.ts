import { KeyboardLessonNavDirective } from './keyboard-lesson-nav';

describe('Директива KeyboardLessonNav', () => {
  it('должен создавать экземпляр', () => {
    const directive = new KeyboardLessonNavDirective();
    expect(directive).toBeTruthy();
  });

  it('должен вызывать next при ArrowRight', () => {
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

