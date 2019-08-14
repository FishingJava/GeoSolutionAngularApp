import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  items = [];
  constructor(
    private http: HttpClient
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

  getStoreAdresses() {
      return this.http.get('assets/stores.json');
  }
}
