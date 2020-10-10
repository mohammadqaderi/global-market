import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'generalFilter'
})
export class GeneralPipe implements PipeTransform {

  transform(array: any[], searchTerm: string): any[] {
    if (!array || !searchTerm) {
      return array;
    }
    return array.filter(item =>
      item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
