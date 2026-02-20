import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from './i18n-service';

describe('I18nService', () => {
  let service: I18nService;
  const translateServiceMock = {
    addLangs: vi.fn(),
    setFallbackLang: vi.fn(),
    use: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateServiceMock }],
    });
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
