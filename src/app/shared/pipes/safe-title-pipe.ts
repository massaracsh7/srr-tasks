import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeTitle'
})
export class SafeTitlePipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    return value?.trim() || '—';
  }

}
