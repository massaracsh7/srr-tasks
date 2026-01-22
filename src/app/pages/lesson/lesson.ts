import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  signal,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { Course } from '../../models/course.model';
import { Lesson as LessonModel } from '../../models/lesson.model';
import { selectCourses } from '../../core/courses/courses.selectors';

import { ButtonModule } from 'primeng/button';
import { KeyboardLessonNavDirective } from '../../shared/directives/keyboard-lesson-nav/keyboard-lesson-nav';
import { SafeTitlePipe } from '../../shared/pipes/safe-title-pipe/safe-title-pipe';
import { HasNextLessonPipe } from '../../shared/pipes/has-next-lesson-pipe/has-next-lesson-pipe';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    KeyboardLessonNavDirective,
    SafeTitlePipe,
    HasNextLessonPipe
  ],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Lesson {
  courseId = input.required<string>();
  lessonId = input.required<string>();

  private store = inject(Store);
  private router = inject(Router);

  course = signal<Course | undefined>(undefined);
  lesson = signal<LessonModel | undefined>(undefined);

  constructor() {
    const coursesSignal = toSignal(this.store.select(selectCourses), { initialValue: [] });

    effect(() => {
      const courseIdNum = Number(this.courseId());
      const lessonIdNum = Number(this.lessonId());

      const course = coursesSignal().find(c => c.id === courseIdNum);
      const lesson = course?.lessons.find(l => l.id === lessonIdNum);

      this.course.set(course);
      this.lesson.set(lesson);
    });
  }

  goBack(): void {
    this.router.navigate(['/course', this.courseId()]);
  }

  nextLesson(): void {
    const course = this.course();
    const lesson = this.lesson();

    if (!course || !lesson) return;

    const index = course.lessons.findIndex(l => l.id === lesson.id);
    const nextLesson = course.lessons[index + 1];

    if (nextLesson) {
      this.router.navigate(['/course', course.id, nextLesson.id]);
    }
  }
  
}
