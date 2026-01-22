import { Directive, effect, HostBinding, Input, input } from '@angular/core';

@Directive({
  selector: '[appHighlightNewLesson]',
  standalone: true,
})
export class HighlightNewLesson {

  @Input('appHighlightNewLesson') isNew = false;

  @HostBinding('style.backgroundColor') backgroundColor = '';

  constructor() {
    effect(() => {
      this.backgroundColor = this.isNew ? '#e0ffe0' : 'transparent';
    });
  }


}
