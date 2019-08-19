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
 

  constructor(
    private geoService: GeoService
  ) {
     this.geoService.getStores().subscribe(stores => this.stores=stores)
    
   }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    //Cache result in localstore    
    if(this.stores && this.stores.length){
     LocalStorage.storeData('stores', this.stores);
     }
   }

}
