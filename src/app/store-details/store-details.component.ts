import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from '@angular/router'

//import { stores } from '../stores';
import { GeoService } from '../services/geo.service';

import {LocalStorage} from '../localstore-cache/localstoragewrappwer';


@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.less']
})
export class StoreDetailsComponent implements OnInit {  
  store;
  constructor(
    private route: ActivatedRoute,
    private geoservoce: GeoService,
    private router : Router
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe( params => {  
    let stores = LocalStorage.getData('stores');
    let storeId = params.get('storeId');
    for(var i=0; i< stores.length; i++){
      if(stores[i].id == storeId){
        this.store = stores[i];
        break;
      }
    }   
  });
  }

  editStore(storeId: number) {
    this.router.navigate(['/store', storeId]);
    //ToDo: Remove the above the alert and perform
    // the actual update operation as shown below.    
    //this.geoservoce.updateStore(store);
  }
}
