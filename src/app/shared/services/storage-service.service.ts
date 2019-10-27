import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  @LocalStorage('NYStixCustomGloveBuild',{}) gloveBuildLocalStorage;
  
  constructor(private storage:LocalStorageService) { }

  initializeStorage(payload:{}){
    if(!this.storage.retrieve('NYStixCustomGloveBuild')){
      this.localStorageInit('NYStixCustomGloveBuild',{}); 
    } 
    else {
      this.localStorageImport('NYStixCustomGloveBuild',payload);    
    }
  }

  saveToStorage(payload:any){
    const values = _.clone(payload);
    this.localStorageExport('NYStixCustomGloveBuild',values);
  }

  localStorageImport = (key:any,destination:any) => {
    const storageDB = _.clone(this.storage.retrieve(key));
    _.assignIn(destination,storageDB);
  }

  localStorageInit = (key:string,value:any) => {
      this.storage.store(key,value);
  }

  localStorageExport = (key:string,value: any) => {
      this.storage.store(key,value);
  }
}
