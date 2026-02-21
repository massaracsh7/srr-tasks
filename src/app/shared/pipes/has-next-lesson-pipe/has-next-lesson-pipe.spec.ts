import { HasNextLessonPipe } from './has-next-lesson-pipe';

describe('Пайп наличия следующего урока', () => {
  it('создает экземпляр', () => {
    const pipe = new HasNextLessonPipe();
    expect(pipe).toBeTruthy();
  });

  it('возвращает true, когда следующий урок существует', () => {
    const pipe = new HasNextLessonPipe();
    const course = { lessons: [{ id: 1 }, { id: 2 }] } as any;
    const lesson = { id: 1 } as any;

    expect(pipe.transform(course, lesson)).toBe(true);
  });

  it('возвращает false для последнего и отсутствующего урока', () => {
    const pipe = new HasNextLessonPipe();
    const course = { lessons: [{ id: 1 }, { id: 2 }] } as any;

    expect(pipe.transform(course, { id: 2 } as any)).toBe(false);
    expect(pipe.transform(course, { id: 99 } as any)).toBe(false);
  });
});

