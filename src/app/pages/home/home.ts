import { ChangeDetectionStrategy, Component, effect, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CourseCard } from './course-card/course-card';

import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Course } from '../../models/course.model';
import { CourseState, SetFilters } from '../../core/courses/courses.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    SelectModule,
    CardModule,
    ButtonModule,
    CourseCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private store = inject(Store);

  category: string | undefined;
  difficulty: string | undefined;
  language: string | undefined;

  categories = [
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Programming', value: 'Programming' }
  ];

  difficulties = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' }
  ];

  languages = [
    { label: 'EN', value: 'EN' },
    { label: 'RU', value: 'RU' }
  ];

  filteredCourses = signal<Course[]>([]);

  constructor() {
    const coursesSignal = toSignal(this.store.select(CourseState.filteredCourses), { initialValue: [] });

    effect(() => {
      this.filteredCourses.set(coursesSignal());
    });
  }

  updateFilters() {
    this.store.dispatch(
      new SetFilters({
        category: this.category,
        difficulty: this.difficulty,
        language: this.language
      })
    );
  }
}
