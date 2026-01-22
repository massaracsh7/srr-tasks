import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { Course } from '../../models/course.model';

export interface CoursesFilters {
  category?: string;
  difficulty?: string;
  language?: string;
}

export interface CoursesStateModel {
  courses: Course[];
  filters: CoursesFilters;
}

export class SetCourses {
  static readonly type = '[Courses] Set Courses';
  constructor(public courses: Course[]) {}
}

export class SetFilters {
  static readonly type = '[Courses] Set Filters';
  constructor(public filters: CoursesFilters) {}
}

@State<CoursesStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    filters: {}
  }
})
export class CourseState implements NgxsOnInit {

  private demoCourses: Course[] = [
    {
      id: 1,
      title: 'Angular 20 Basics',
      category: 'Frontend',
      difficulty: 'Beginner',
      language: 'EN',
      rating: 4.5,
      author: 'Ivan Ivanov',
      description: 'Learn Angular 20 from scratch',
      goals: ['Components', 'Signals', 'Routing'],
      lessons: [
        { id: 1, title: 'Components', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: 'Signals', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
      ]
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      category: 'Programming',
      difficulty: 'Advanced',
      language: 'EN',
      rating: 4.8,
      author: 'Anna Petrova',
      description: 'Deep dive into TypeScript',
      goals: ['Generics', 'Decorators', 'Utility Types'],
      lessons: [
        { id: 1, title: 'Generics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: 'Decorators', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
      ]
    }
  ];

  @Selector()
  static courses(state: CoursesStateModel) {
    return state.courses;
  }

  @Selector()
  static filters(state: CoursesStateModel) {
    return state.filters;
  }

  @Selector()
  static filteredCourses(state: CoursesStateModel) {
    return state.courses.filter(c =>
      (!state.filters.category || c.category === state.filters.category) &&
      (!state.filters.difficulty || c.difficulty === state.filters.difficulty) &&
      (!state.filters.language || c.language === state.filters.language)
    );
  }

  @Selector()
  static courseById(state: CoursesStateModel) {
    return (id: number) => state.courses.find(c => c.id === id);
  }

  @Selector()
  static lessonByIds(state: CoursesStateModel) {
    return (courseId: number, lessonId: number) =>
      state.courses.find(c => c.id === courseId)?.lessons.find(l => l.id === lessonId);
  }

  ngxsOnInit(ctx: StateContext<CoursesStateModel>) {
    ctx.patchState({ courses: this.demoCourses });
  }

  @Action(SetCourses)
  setCourses(ctx: StateContext<CoursesStateModel>, { courses }: SetCourses) {
    ctx.patchState({ courses });
  }

  @Action(SetFilters)
  setFilters(ctx: StateContext<CoursesStateModel>, { filters }: SetFilters) {
    ctx.patchState({ filters });
  }
}
