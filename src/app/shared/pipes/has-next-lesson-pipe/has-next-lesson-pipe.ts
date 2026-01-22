import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../models/course.model';
import { Lesson } from '../../../models/lesson.model';

@Pipe({
  name: 'hasNextLesson'
})
export class HasNextLessonPipe implements PipeTransform {

  transform(course: Course | undefined, lesson: Lesson | undefined): boolean {
    if (!course || !lesson) return false;
    const index = course.lessons.findIndex(l => l.id === lesson.id);
    return index >= 0 && index < course.lessons.length - 1;
  }

}
