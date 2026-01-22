import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appKeyboardLessonNav]',
  standalone: true,
})
export class KeyboardLessonNavDirective {
  next = input<() => void>();
  back = input<() => void>();

  @HostListener('window:keydown', ['$event'])
  handle(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.back();
  }
}
