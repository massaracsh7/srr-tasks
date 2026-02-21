import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18nService } from '../../core/i18n-service';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { Profile } from './profile';

describe('Профиль', () => {
  let component: Profile;

  const storeMock = {
    select: vi.fn(() => of(null)),
    dispatch: vi.fn(),
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
        { provide: Store, useValue: storeMock },
        { provide: I18nService, useValue: i18nServiceMock },
      ],
    });

    const injector = TestBed.inject(EnvironmentInjector);
    component = runInInjectionContext(injector, () => new Profile());
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('должен инициализировать текущий язык из сервиса интернационализации', () => {
    expect(component.currentLang()).toBe('EN');
  });

  it('должен обновлять язык через сервис интернационализации', () => {
    component.setLanguage({ target: { value: 'RU' } } as unknown as Event);

    expect(component.currentLang()).toBe('RU');
    expect(i18nServiceMock.setLanguage).toHaveBeenCalledWith('ru');
  });
});

