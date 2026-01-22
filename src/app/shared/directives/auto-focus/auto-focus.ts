import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocus {
  constructor(private el: ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) {}

@HostListener('keydown.enter', ['$event'])
onEnter(event: Event): void {
  const e = event as KeyboardEvent;
  e.preventDefault();

  const form = this.el.nativeElement.closest('form');
  if (!form) return;

  const elements = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>(
      'input, textarea, button'
    )
  );

  const index = elements.indexOf(this.el.nativeElement);
  const next = elements[index + 1];
  if (next) next.focus();
}
}
