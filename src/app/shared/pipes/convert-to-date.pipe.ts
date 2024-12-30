import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'convertToDate',
  standalone: true
})
export class ConvertToDatePipe implements PipeTransform {

  transform(value: any): Date | null {
    if (value instanceof Timestamp) {
      return value.toDate();
    }

    return null;
  }

}
