import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { I18nService } from '../../core/i18n-service';
import { Store } from '@ngxs/store';
import { UserState } from '../../core/users/user.state';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, TranslatePipe, SelectModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile {
  private store = inject(Store);
  private i18n = inject(I18nService);

  currentUser = toSignal(this.store.select(UserState.currentUser), { initialValue: null });

  currentLang = signal<'EN' | 'RU'>(this.i18n.currentLang.toUpperCase() as 'EN' | 'RU');

  constructor() {
    effect(() => {
      const user = this.currentUser();
    });
  }

  setLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    const lang = select.value as 'EN' | 'RU';
    this.currentLang.set(lang);
    this.i18n.setLanguage(lang.toLowerCase() as 'en' | 'ru');
  }
}
