import * as CoursesActions from './courses.actions';
import { initialState, coursesReducer } from './courses.reducer';
import { selectFilteredCourses } from './courses.selectors';

describe('Курсы', () => {
  it('должен фильтровать курсы по категории', () => {
    const state = coursesReducer(
      initialState,
      CoursesActions.setFilters({ filters: { category: 'Frontend' } })
    );
    const courses = Object.values(state.entities);
    const result = selectFilteredCourses.projector(courses, state.filters);

    expect(result.length).toBeGreaterThan(0);
    expect(result.every(c => c.category === 'Frontend')).toBe(true);
  });

  it('должен возвращать пустой массив при несовпадающих фильтрах', () => {
    const state = coursesReducer(
      initialState,
      CoursesActions.setFilters({
        filters: { category: 'Backend', difficulty: 'Beginner', language: 'RU' },
      })
    );
    const courses = Object.values(state.entities);
    const result = selectFilteredCourses.projector(courses, state.filters);

    expect(result).toEqual([]);
  });
});

