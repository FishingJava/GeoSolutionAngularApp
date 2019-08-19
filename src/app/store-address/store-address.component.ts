import { Component, OnInit } from '@angular/core';
import { GeoService } from '../services/geo.service';
//import { GeoService } from '../geo.service';

@Component({
  selector: 'app-stores',
  templateUrl: './store-address.component.html',
  styleUrls: ['./store-address.component.less']
})
export class StoreAddressComponent implements OnInit {
  stores;
  constructor(
    private geoService: GeoService
  ) {
    this.stores = this.geoService.getStores()
  }
 

  ngOnInit() {
  }

}
