import { Component, inject, input, signal } from '@angular/core';
import { Courses } from '../../core/courses';
import { UserService } from '../../core/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetail {
  id = input.required<string>();
  private courseService = inject(Courses);
  public userService = inject(UserService);
  private route = inject(ActivatedRoute);

  course = signal(this.courseService.getCourseById(Number(this.id)));

}
