import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from './i18n-service';

describe('I18nService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize default language', () => {
    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
  });

  it('should switch language', () => {
    service.setLanguage('ru');
    expect(translateServiceMock.use).toHaveBeenCalledWith('ru');
  });
});
