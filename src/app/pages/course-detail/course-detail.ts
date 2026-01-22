import { Component, inject, input, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { TranslatePipe } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { HighlightNewLesson } from '../../shared/directives/highlight-new-lesson/highlight-new-lesson';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCourseById, selectCourses } from '../../core/courses/courses.selectors';
import { selectCurrentUser } from '../../core/users/user.selectors';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, CardModule, ProgressBarModule, HighlightNewLesson],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetail {
  id = input.required<string>();

  store = inject(Store);
  public progress = signal(Math.floor(Math.random() * 100));

  course = signal<Course | undefined>(undefined);
  currentUser = toSignal(
    this.store.select(selectCurrentUser),
    { initialValue: null }
  );

  constructor() {
    const coursesSignal = toSignal(this.store.select(selectCourses), { initialValue: [] });
    effect(() => {
       const courseId = Number(this.id());

      const course = coursesSignal().find(c => c.id === courseId);
      this.course.set(course);
    });
  }
}
