import * as CoursesActions from './courses.actions';
import { initialState, coursesReducer } from './courses.reducer';
import { selectFilteredCourses } from './courses.selectors';

describe('Courses', () => {
  it('should filter courses by category', () => {
    const state = coursesReducer(
      initialState,
      CoursesActions.setFilters({ filters: { category: 'Frontend' } })
    );
    const result = selectFilteredCourses.projector(state.courses, state.filters);

    expect(result.length).toBeGreaterThan(0);
    expect(result.every(c => c.category === 'Frontend')).toBe(true);
  });

  it('should return empty array for non-matching filters', () => {
    const state = coursesReducer(
      initialState,
      CoursesActions.setFilters({
        filters: { category: 'Backend', difficulty: 'Beginner', language: 'RU' },
      })
    );
    const result = selectFilteredCourses.projector(state.courses, state.filters);

    expect(result).toEqual([]);
  });
});
