import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { GloveColors, WizardPrompts } from '../models/nine-positions-models';
import { map,tap, filter, flatMap, finalize } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
  export class GloveDataService {

  

  constructor(private db: AngularFireDatabase) { 

  }

  getGloveColors(): Observable<any>{
    return this.db.list('nystixs-colors').valueChanges();
  }

  getWizardData():Observable<any>{
    return this.db.object('nystixs-design-wizard').snapshotChanges();
    //return this.db.list('nystixs-design-wizard').valueChanges();
  }

  getGloveInputElements():Observable<any>{
    return this.db.object('nystixs-custom-elements').snapshotChanges();
  }

  getGloveSliderColors(): Observable<any> {
    return this.db.list('nystixs-color-slider').valueChanges();
  }

  getWizardSteps(): Observable<WizardPrompts> {
    const data$ = this.getWizardData();
    return data$.pipe(
      map(changes => Object.assign(
        {...changes.payload.val()}
      )
      )
    );
  }

  getCustomParts(): Observable<any>{
    const data$ = this.getGloveInputElements();

    return data$.pipe(
      map(changes => Object.assign({...changes.payload.val()}))
    );
    
  } 

  getPositionsData(): Observable<any>{
    const data$ = this.getWizardData();

    return data$.pipe(
      map(changes => Object.assign({...changes.payload.val()})),
      map(changes => _.forEach(changes,(value,key)=>{        
        if(key === "gloveWeb"){
          _.forEach(value,(res)=>{
            return  Object.assign({...res});
          })
        }
      }))
    )
  }

  getGloveSizeContent(): Observable<any>{
    return this.db.list('nystixs-glove-guide').valueChanges() ;
  }
}
