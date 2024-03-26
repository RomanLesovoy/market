import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // explain: pipes are functions for change data,
    // can be used everywhere but usually in templates, from template by default calls transform fn
  standalone: true,
  name: 'filterValuePipe'
})
export class FilterPipe implements PipeTransform {

  transform(array: Array<any>, key: string, value: string): Array<any> {
    return array.filter((c) => c[key] && c[key] !== value);
  }

}
