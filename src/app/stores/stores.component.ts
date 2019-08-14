import { Component, OnInit } from '@angular/core';
import { GeoService } from '../geo.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.less']
})
export class StoresComponent implements OnInit {
  storeAddresses;
  constructor(
    private geoService: GeoService
  ) {
    this.storeAddresses = this.geoService.getStoreAdresses()
  }
 

  ngOnInit() {
  }

}
