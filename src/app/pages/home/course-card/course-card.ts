import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Course } from '../../../models/models';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, CardModule, ButtonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCard {
  course = input<Course | undefined>(undefined);
  isShown = signal(false);

  toggle() {
    this.isShown.update(v => !v);
  }
}
