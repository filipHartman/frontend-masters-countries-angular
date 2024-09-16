import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'recordParser',
})
export class RecordParserPipe<T> implements PipeTransform {
  transform(value: Record<string, T>, property: keyof T): T[keyof T] {
    return Object.values(value)[0][property];
  }
}
