import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../core/user';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { I18nService } from '../../core/i18n-service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, TranslatePipe, SelectModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userService = inject(UserService);
  i18n = inject(I18nService);

  currentLang = signal<'EN' | 'RU'>(this.i18n.currentLang.toUpperCase() as 'EN' | 'RU');

  setLanguage(lang: 'EN' | 'RU') {
    this.currentLang.set(lang);
    this.i18n.setLanguage(lang.toLowerCase() as 'en' | 'ru');
  }
}
