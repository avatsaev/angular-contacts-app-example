import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLightText'
})
export class HighLightTextPipe implements PipeTransform {

  transform(value: any, args: any): unknown {
    if(!args) return value;
    const re = new RegExp(args, 'igm');
    value= value.replace(re, '<strong >$&</strong>');

    return value;
  }
}
