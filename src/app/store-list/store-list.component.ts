import { Component, OnInit } from '@angular/core';
import { GeoService } from '../services/geo.service';
import {LocalStorage} from '../localstore-cache/localstoragewrappwer';
//import {stores} from "../stores"

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.less']
})
export class StoreListComponent implements OnInit {
   stores;
   filteredStores;
   private _searchTerm:string;

   set searchTerm(value:string){
     this._searchTerm = value;
     this.filteredStores = this.filterStores( value);
   }

   get searchTerm(){
    return this._searchTerm;
  }

 filterStores( searchString:string){
   return this.stores.filter(store =>
     store.shopName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
 }

  constructor(
    private geoService: GeoService
  ) {
     this.geoService.getStores().subscribe(stores =>{ 
       this.stores=stores
       this.filteredStores = stores;
      }
      )
    
   }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    //Cache result in localstore    
    if(this.stores && this.stores.length){
     LocalStorage.storeData('stores', this.stores);
     }
   }

   addToStore(store) {
    window.alert('The store has been added!');

    //ToDo: Remove the above the alert and perform
    // the actual add operation as shown below.
    //this.geoService.addToStore(store);
  }

}
