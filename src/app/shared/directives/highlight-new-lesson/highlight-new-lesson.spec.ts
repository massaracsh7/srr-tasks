import { TestBed } from '@angular/core/testing';
import { HighlightNewLesson } from './highlight-new-lesson';

describe('HighlightNewLesson', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(
      () => new HighlightNewLesson(),
    );
    expect(directive).toBeTruthy();
  });
});
