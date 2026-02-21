import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from './i18n-service';

describe('Сервис i18n', () => {
  let service: I18nService;
  const translateServiceMock = {
    setDefaultLang: vi.fn(),
    use: vi.fn(),
    currentLang: 'en',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    translateServiceMock.currentLang = 'en';

    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateServiceMock }],
    });

    service = TestBed.inject(I18nService);
  });

  it('должен создаваться', () => {
    expect(service).toBeTruthy();
  });

  it('должен инициализировать язык по умолчанию', () => {
    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
  });

  it('должен переключать язык', () => {
    service.setLanguage('ru');
    expect(translateServiceMock.use).toHaveBeenCalledWith('ru');
  });
});

