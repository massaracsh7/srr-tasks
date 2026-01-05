import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  setLanguage(lang: 'en' | 'ru') {
    this.translate.use(lang);
  }

  get currentLang() {
    return this.translate.currentLang;
  }
}
