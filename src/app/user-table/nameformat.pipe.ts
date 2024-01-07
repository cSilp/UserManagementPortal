import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameformat',
  standalone: true
})
export class NameformatPipe implements PipeTransform {

  transform(value: string): string {
    // Split the input string into words
    // return value.replace(/([a-z])([A-Z])/g, '$1 $2');
    return value.replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  }
}
