import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  
  constructor() { }

  initializeStorage(payload:{}){
    if(!localStorage.getItem('9PCustomGloveBuild')){ 
      localStorage.setItem('9PCustomGloveBuild',JSON.stringify({})) 
    } else {
      JSON.parse(localStorage.getItem('9PCustomGloveBuild'))   
    }
  }

  saveToStorage(payload:any){
    const values = _.clone(payload);
    this.localStorageExport('9PCustomGloveBuild',values);
  }

  localStorageImport = (key:any,destination:any) => {
    const storageDB = _.clone(localStorage.getItem(key));
    _.assignIn(destination,storageDB);
  }

  localStorageInit = (key:string,value:any) => {
      localStorage.setItem('9PCustomGloveBuild',JSON.stringify(value))
  }

  localStorageExport = (key:string,value: any) => {
      localStorage.setItem('9PCustomGloveBuild',JSON.stringify(value))
  }
}
