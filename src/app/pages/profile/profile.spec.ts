import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18nService } from '../../core/i18n-service';
import { UserService } from '../../core/user';

import { Profile } from './profile';

describe('Профиль', () => {
  let component: Profile;

  const userServiceMock = {
    currentUser: vi.fn(),
  };

  const i18nServiceMock = {
    currentLang: 'en',
    setLanguage: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    i18nServiceMock.currentLang = 'en';

    await TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: I18nService, useValue: i18nServiceMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Profile());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен инициализировать currentLang из сервиса i18n', () => {
    expect(component.currentLang()).toBe('EN');
  });

  it('должен обновлять язык через сервис i18n', () => {
    component.setLanguage('RU');

    expect(component.currentLang()).toBe('RU');
    expect(i18nServiceMock.setLanguage).toHaveBeenCalledWith('ru');
  });
});

