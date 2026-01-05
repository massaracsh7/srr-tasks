import { Component, inject } from '@angular/core';
import { UserService } from '../../core/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-create-course',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './create-course.html',
  styleUrl: './create-course.scss',
  standalone: true
})
export class CreateCourse {
  userService = inject(UserService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    goals: [''],
    lessons: ['']
  });

  saveCourse() {
    const value = this.form.value;

    const newCourse = {
      title: value.title,
      description: value.description,
      goals: value.goals
        ? value.goals.split(',').map((g: string) => g.trim()).filter(Boolean)
        : [],
      lessons: value.lessons
        ? value.lessons.split(',').map((l: string) => l.trim()).filter(Boolean)
        : []
    };

    console.log('Новый курс:', newCourse);
    alert('Курс сохранён');

    this.form.reset();
  }
}
