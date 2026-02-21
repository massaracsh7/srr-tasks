import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { App } from './app';

describe('App', () => {
  const translateServiceMock = {
    addLangs: vi.fn(),
    setFallbackLang: vi.fn(),
    use: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateServiceMock }],
    });
  });

  it('should create the app', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const app = runInInjectionContext(injector, () => new App());

    expect(app).toBeTruthy();
    expect((app as any).title).toBe('srr-tasks');
  });

  it('should initialize translations in constructor', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    runInInjectionContext(injector, () => new App());

    expect(translateServiceMock.addLangs).toHaveBeenCalledWith(['ru', 'en']);
    expect(translateServiceMock.setFallbackLang).toHaveBeenCalledWith('en');
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
  });
});
