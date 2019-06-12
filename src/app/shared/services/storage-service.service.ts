import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  @LocalStorage('9PCustomGloveBuild',{}) gloveBuildLocalStorage;
  
  constructor(private storage:LocalStorageService) { }

  initializeStorage(payload:{}){
    if(!this.storage.retrieve('9PCustomGloveBuild')){
      this.localStorageInit('9PCustomGloveBuild',{}); 
    } 
    else {
      this.localStorageImport('9PCustomGloveBuild',payload);    
    }
  }

  saveToStorage(payload:any){
    const values = _.clone(payload);
    this.localStorageExport('9PCustomGloveBuild',values);
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
