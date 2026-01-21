import { Component, inject, input, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { Courses } from '../../core/courses/courses';
import { UserService } from '../../core/user';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/models';
import { TranslatePipe } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { HighlightNewLesson } from '../../shared/directives/highlight-new-lesson';

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

  private coursesService = inject(Courses);
  public userService = inject(UserService);
  public progress = signal(Math.floor(Math.random() * 100));

  course = signal<Course | undefined>(undefined);

  constructor() {
    effect(() => {
      const courseId = Number(this.id());
      this.course.set(this.coursesService.getCourseById(courseId));
    });
  }
}
