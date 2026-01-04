import { Component, computed, inject, signal } from '@angular/core';
import { Courses } from '../../core/courses';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private courseService = inject(Courses);

  categoryFilter = signal<string>('');
  difficultyFilter = signal<string>('');
  languageFilter = signal<string>('');

  filteredCourses = computed(() =>
    this.courseService.filterCourses({
      category: this.categoryFilter(),
      difficulty: this.difficultyFilter(),
      language: this.languageFilter(),
    })
  );

  setCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryFilter.set(select.value);
  }

  setDifficulty(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.difficultyFilter.set(select.value);
  }

  setLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.languageFilter.set(select.value);
  }
}
