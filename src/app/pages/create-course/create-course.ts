import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule  } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { AutoFocus } from '../../shared/directives/auto-focus';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../core/users/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    InputTextModule,
    TextareaModule ,
    ButtonModule,
    AutoFocus
  ],
  templateUrl: './create-course.html',
  styleUrl: './create-course.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCourse {
  private fb = inject(FormBuilder);

    private store = inject(Store);

  readonly currentUser = toSignal(
  this.store.select(selectCurrentUser),
  { initialValue: null }
);

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
