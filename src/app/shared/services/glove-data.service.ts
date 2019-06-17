import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, combineLatest } from 'rxjs';
// import { GloveColors, WizardPrompts } from '../models/nine-positions-models';
// import { map,tap, filter, flatMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GloveDataService {

  constructor(private af: AngularFireDatabase) { }

  getQuickOrderData(): Observable<any>{
    return this.af.list('nine-positions-glove-profiles').valueChanges();
  }

  getQuickOrderColor(): Observable<any>{
    return this.af.list('nine-positions-colors').valueChanges();
  }
}