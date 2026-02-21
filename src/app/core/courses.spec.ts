import { TestBed } from '@angular/core/testing';

import { Courses } from './courses';

describe('Courses', () => {
  let service: Courses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Courses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return course by id', () => {
    const course = service.getCourseById(1);

    expect(course).toBeTruthy();
    expect(course?.id).toBe(1);
  });

  it('should filter courses by category', () => {
    const result = service.filterCourses({ category: 'Frontend' });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every(c => c.category === 'Frontend')).toBe(true);
  });

  it('should return empty array for non-matching filters', () => {
    const result = service.filterCourses({
      category: 'Backend',
      difficulty: 'Beginner',
      language: 'RU',
    });

    expect(result).toEqual([]);
  });
});
