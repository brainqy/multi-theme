import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
   const date=new Date(value[0],value[1]-1,value[2],value[3],value[4]);
    return date.toLocaleString();
  }

}
