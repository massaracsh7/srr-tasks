import { Component, inject, input, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Courses } from '../../core/courses';
import { Course, Lesson as LessonModel } from '../../models/models';
import { ButtonModule } from 'primeng/button';
import { KeyboardLessonNavDirective } from '../../shared/directives/keyboard-lesson-nav';
import { SafeTitlePipe } from '../../shared/pipes/safe-title-pipe';
import { HasNextLessonPipe } from '../../shared/pipes/has-next-lesson-pipe';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule, ButtonModule, KeyboardLessonNavDirective,
    SafeTitlePipe,
    HasNextLessonPipe,
],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
})
export class Lesson {
  courseId = input.required<string>();
  lessonId = input.required<string>();

  private coursesService = inject(Courses);
  private router = inject(Router);

  course = signal<Course | undefined>(undefined);
  lesson = signal<LessonModel | undefined>(undefined);

  constructor() {
    effect(() => {
      const courseId = Number(this.courseId());
      const lessonId = Number(this.lessonId());

      const course = this.coursesService.getCourseById(courseId);
      const lesson = course?.lessons.find(l => l.id === lessonId);

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
