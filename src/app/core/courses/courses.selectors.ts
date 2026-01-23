import { createSelector } from '@ngrx/store';
import { coursesFeature } from './courses.feature';
import { coursesAdapter } from './courses.reducer';

export const {
  selectCoursesState,
  selectFilters
} = coursesFeature;

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = coursesAdapter.getSelectors(selectCoursesState);

export const selectCourses = selectAll;
export const selectCoursesEntities = selectEntities;
export const selectCoursesIds = selectIds;
export const selectCoursesTotal = selectTotal;

export const selectFilteredCourses = createSelector(
  selectCourses,
  selectFilters,
  (courses, filters) =>
    courses.filter(course =>
      (!filters.category || course.category === filters.category) &&
      (!filters.difficulty || course.difficulty === filters.difficulty) &&
      (!filters.language || course.language === filters.language)
    )
);

export const selectCourseById = (courseId: number) =>
  createSelector(
    selectCoursesEntities,
    entities => entities[courseId]
  );

export const selectLessonByIds = (courseId: number, lessonId: number) =>
  createSelector(
    selectCourseById(courseId),
    course => course?.lessons.find(lesson => lesson.id === lessonId)
  );
