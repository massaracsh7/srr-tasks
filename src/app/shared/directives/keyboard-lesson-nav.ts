import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appKeyboardLessonNav]',
  standalone: true,
})
export class KeyboardLessonNavDirective {
  @Input({ required: true }) next!: () => void;
  @Input({ required: true }) back!: () => void;

  @HostListener('window:keydown', ['$event'])
  handle(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.back();
  }
}
