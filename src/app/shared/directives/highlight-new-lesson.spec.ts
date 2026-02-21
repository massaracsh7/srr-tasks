import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HighlightNewLesson } from './highlight-new-lesson';

describe('HighlightNewLesson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should create an instance', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const directive = runInInjectionContext(injector, () => new HighlightNewLesson());
    expect(directive).toBeTruthy();
  });
});
