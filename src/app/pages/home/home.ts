import { Component, computed, inject, model, signal } from '@angular/core';
import { Courses } from '../../core/courses';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
    private courseService = inject(Courses)

  categoryFilter = model<string>('');
  difficultyFilter = model<string>('');

  filteredCourses = computed(() => this.courseService.filterCourses({
    category: this.categoryFilter(),
    difficulty: this.difficultyFilter()
  }));

}
