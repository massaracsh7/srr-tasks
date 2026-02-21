import { CourseState, SetCourses, SetFilters, type CoursesStateModel } from './courses.state';
import type { Course } from '../../models/course.model';

describe('Состояние курсов', () => {
  let state: CourseState;
  let patchState: ReturnType<typeof vi.fn>;
  let ctx: { patchState: (val: Partial<CoursesStateModel>) => void };

  const courses: Course[] = [
    {
      id: 1,
      title: 'Angular 20 Basics',
      category: 'Frontend',
      difficulty: 'Beginner',
      language: 'EN',
      rating: 4.5,
      author: 'Ivan Ivanov',
      description: 'Learn Angular',
      goals: ['Components'],
      lessons: [
        { id: 1, title: 'Components', videoUrl: 'https://example.com/1.mp4' },
        { id: 2, title: 'Signals', videoUrl: 'https://example.com/2.mp4' },
      ],
    },
    {
      id: 2,
      title: 'TypeScript Deep Dive',
      category: 'Programming',
      difficulty: 'Advanced',
      language: 'RU',
      rating: 4.8,
      author: 'Anna Petrova',
      description: 'Deep TS',
      goals: ['Generics'],
      lessons: [{ id: 1, title: 'Generics', videoUrl: 'https://example.com/3.mp4' }],
    },
  ];

  beforeEach(() => {
    state = new CourseState();
    patchState = vi.fn();
    ctx = { patchState };
  });

  it('обновляет фильтры в состоянии', () => {
    state.setFilters(ctx as any, new SetFilters({ category: 'Frontend', language: 'EN' }));

    expect(patchState).toHaveBeenCalledWith({
      filters: { category: 'Frontend', language: 'EN' },
    });
  });

  it('селектор отфильтрованных курсов фильтрует по категории, сложности и языку', () => {
    const model: CoursesStateModel = {
      courses,
      filters: { category: 'Frontend', difficulty: 'Beginner', language: 'EN' },
    };

    const result = CourseState.filteredCourses(model);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('селектор поиска курса по идентификатору возвращает курс для существующего идентификатора и пустое значение для отсутствующего', () => {
    const model: CoursesStateModel = { courses, filters: {} };
    const selector = CourseState.courseById(model);

    expect(selector(2)?.title).toBe('TypeScript Deep Dive');
    expect(selector(999)).toBeUndefined();
  });

  it('селектор поиска урока по идентификаторам возвращает урок для существующих идентификаторов и пустое значение для отсутствующих', () => {
    const model: CoursesStateModel = { courses, filters: {} };
    const selector = CourseState.lessonByIds(model);

    expect(selector(1, 2)?.title).toBe('Signals');
    expect(selector(1, 999)).toBeUndefined();
    expect(selector(999, 1)).toBeUndefined();
  });

  it('обновляет курсы в состоянии', () => {
    state.setCourses(ctx as any, new SetCourses(courses));

    expect(patchState).toHaveBeenCalledWith({ courses });
  });
});


