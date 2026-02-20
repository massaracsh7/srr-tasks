import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18nService } from '../../core/i18n-service';
import { UserService } from '../../core/user';

import { Profile } from './profile';

describe('Profile', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentLang from i18n service', () => {
    expect(component.currentLang()).toBe('EN');
  });

  it('should update language through i18n service', () => {
    component.setLanguage('RU');

    expect(component.currentLang()).toBe('RU');
    expect(i18nServiceMock.setLanguage).toHaveBeenCalledWith('ru');
  });
});
