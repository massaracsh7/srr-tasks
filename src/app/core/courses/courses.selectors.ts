import { createSelector } from '@ngrx/store';
import { coursesFeature } from './courses.feature';

export const selectCourses = coursesFeature.selectCourses;
export const selectFilters = coursesFeature.selectFilters;

export const selectFilteredCourses = createSelector(
  selectCourses,
  selectFilters,
  (courses, filters) =>
    courses.filter(c =>
      (!filters.category || c.category === filters.category) &&
      (!filters.difficulty || c.difficulty === filters.difficulty) &&
      (!filters.language || c.language === filters.language)
    )
);

export const selectCourseById = (courseId: number) =>
  createSelector(
    selectCourses,
    courses => courses.find(c => c.id === courseId)
  );

export const selectLessonByIds = (courseId: number, lessonId: number) =>
  createSelector(
    selectCourseById(courseId),
    course => course?.lessons.find(l => l.id === lessonId)
  );