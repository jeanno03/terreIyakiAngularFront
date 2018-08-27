import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tvaTransform'
})
export class TvaTransformPipe implements PipeTransform {

  transform(rate:number): string {
    return (rate*100).toFixed(2);
  }

}
