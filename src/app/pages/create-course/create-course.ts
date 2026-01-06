import { Component, inject } from '@angular/core';
import { UserService } from '../../core/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule  } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    InputTextModule,
    TextareaModule ,
    ButtonModule
  ],
  templateUrl: './create-course.html',
  styleUrl: './create-course.scss',
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
