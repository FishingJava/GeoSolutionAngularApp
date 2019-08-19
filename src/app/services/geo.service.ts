import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Store } from '../models/store.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'      
  })
};

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  
  items = [];
  constructor (
    private apiService: ApiService
  ) {}

  

  addToStore(store) {
    //ToDo: properly hook it to the ApiService http post method.
    this.items.push(store);
  }

  updateStore(store: any) {
    //ToDo: properly hook it to the ApiService http put method.  
    let index = this.items.find(storeItem=> storeItem.id == store.id);
    if(index != -1) {
      // update the store (removing element at index value and adding the updated one in place of it).
      this.items.splice(index,1, store);     
    }    
  }

  getItems() {
    return this.items;
  }

  clearStore() {
    this.items = [];
    return this.items;
  } 

  

  getStores():Observable<Store> {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8');
    return this.apiService.get('/stores/', new HttpHeaders({'Content-Type':'application/json; charset=utf-8'}))
      .pipe(map(data => data));
  }
}
