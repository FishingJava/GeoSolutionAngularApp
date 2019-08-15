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
    this.items.push(store);
  }

  getItems() {
    return this.items;
  }

  clearStore() {
    this.items = [];
    return this.items;
  } 

  

  getStoreAdresses():Observable<Store> {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8');
    return this.apiService.get('/stores/', new HttpHeaders({'Content-Type':'application/json; charset=utf-8'}))
      .pipe(map(data => data));
  }
}
