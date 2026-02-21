import { TestBed } from '@angular/core/testing';

import { Courses } from './courses';

describe('Курсы', () => {
  let service: Courses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Courses);
  });

  it('должен создаваться', () => {
    expect(service).toBeTruthy();
  });

  it('должен возвращать курс по id', () => {
    const course = service.getCourseById(1);

    expect(course).toBeTruthy();
    expect(course?.id).toBe(1);
  });

  it('должен фильтровать курсы по категории', () => {
    const result = service.filterCourses({ category: 'Frontend' });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every(c => c.category === 'Frontend')).toBe(true);
  });

  it('должен возвращать пустой массив при несовпадающих фильтрах', () => {
    const result = service.filterCourses({
      category: 'Backend',
      difficulty: 'Beginner',
      language: 'RU',
    });

    expect(result).toEqual([]);
  });
});

