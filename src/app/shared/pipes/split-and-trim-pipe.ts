import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitAndTrim'
})
export class SplitAndTrimPipe implements PipeTransform {

  transform(value: string | undefined): string[] {
    if (!value) return [];
    return value.split(',').map(v => v.trim()).filter(Boolean);
  }
}
