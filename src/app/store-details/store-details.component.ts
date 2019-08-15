import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { stores } from '../stores';
import { GeoService } from '../services/geo.service';
//import { GeoService } from '../geo.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.less']
})
export class StoreDetailsComponent implements OnInit {
  store;
  constructor(
    private route: ActivatedRoute,
    private geoservoce: GeoService
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.store = stores[+params.get('storeId')];
  });
  }

  addToStore(store) {
    window.alert('The store has been added!');
    this.geoservoce.addToStore(store);
  }
}
