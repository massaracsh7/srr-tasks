import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';

import { Courses } from '../../core/courses';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CourseCard } from './course-card/course-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TranslatePipe,
    SelectModule,
    CardModule, ButtonModule,
    CourseCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private courses = inject(Courses);

  category = signal<string | null>(null);
  difficulty = signal<string | null>(null);
  language = signal<string | null>(null);

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

  filteredCourses = computed(() =>
    this.courses.filterCourses({
      category: this.category() ?? '',
      difficulty: this.difficulty() ?? '',
      language: this.language() ?? '',
    })
  );
}
