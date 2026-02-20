import { HasNextLessonPipe } from './has-next-lesson-pipe';

describe('HasNextLessonPipe', () => {
  it('create an instance', () => {
    const pipe = new HasNextLessonPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns true when next lesson exists', () => {
    const pipe = new HasNextLessonPipe();
    const course = { lessons: [{ id: 1 }, { id: 2 }] } as any;
    const lesson = { id: 1 } as any;

    expect(pipe.transform(course, lesson)).toBe(true);
  });

  it('returns false for last and missing lesson', () => {
    const pipe = new HasNextLessonPipe();
    const course = { lessons: [{ id: 1 }, { id: 2 }] } as any;

    expect(pipe.transform(course, { id: 2 } as any)).toBe(false);
    expect(pipe.transform(course, { id: 99 } as any)).toBe(false);
  });
});
