import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { DomSanitizer} from '@angular/platform-browser';
// import { ChangeDetectionRef } from '@angular/core/src/render3/jit/compiler_facade_interface';

@Pipe({
  name: 'webFilter'
})
export class WebFilterPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  public sanitizeImage(image: string) {
    console.log(image)
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }

  transform(value: any, args?: any): any {
    const imgUri = 'https://media.9positions.com/';
    const arg = "outfield";
    let url = _.forEach(value, (v, k) => {
      if (_.isArray(v)) {
        v.forEach(element => {
          if(element == arg){
            //console.log(`${imgUri}${value.file}`)
            return `${imgUri}${value.file}`;
          }
        });
        
        
      }
    })
    console.log(url)
    return url;
  }

}
