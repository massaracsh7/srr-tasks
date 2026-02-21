import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HighlightNewLesson } from './highlight-new-lesson';

describe('Подсветка нового урока', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('должен создавать экземпляр', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const directive = runInInjectionContext(injector, () => new HighlightNewLesson());
    expect(directive).toBeTruthy();
  });
});

