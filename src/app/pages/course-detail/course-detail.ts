import { Component, inject, input, signal, effect } from '@angular/core';
import { Courses } from '../../core/courses';
import { UserService } from '../../core/user';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/models';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
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
