import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GeoService } from '../services/geo.service';
import { Store } from '../models/store.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Errors } from '../models/errors.model';
import { LocalStorage } from '../localstore-cache/localstoragewrappwer';


@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.less']
})
export class StoreFormComponent implements OnInit {
  store: Store = {} as Store;
  errors: Errors = {} as Errors;
  isSubmitting = false;

  categories = [];

  storeProfileForm = this.fb.group({
    shopName: ['',Validators.compose(
                                      [Validators.required, 
                                      Validators.maxLength(32),
                                      Validators.minLength(4)]
                                    ) 
              ],
    ownerName: [''],
    category:[''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: ['']
    }),
  });

  constructor(private fb: FormBuilder,
    private geoService: GeoService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.categories = this.getCategories();
  }
 

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      //Type cast it to number using "+".
      const storeId = +params.get('storeId');
      if(storeId){
        this.getStore(storeId);
      }

    })
  }
  getStore(storeId: number) {      
      let stores = LocalStorage.getData('store');
      if(stores && stores.length){
        for(var i=0; i< stores.length; i++){
          if(stores[i].id == storeId){
            this.store = stores[i];
            break;
          }
        }
      }
      else{
        //if the cache is invalidated, then fetch it from the backend service.
        this.geoService.getStore(storeId).subscribe(
                    store => 
                    {
                      this.store = store
                      this.editStore(this.store)
                    },
                    err => {
                      this.errors = err;
                      
                    });
      } 
  }

  editStore(store: Store) {   
    let physicalAddressArray = store.physicalAddress.split(',').map(x=>x.trim())
    let stateZip = physicalAddressArray[2].split(' ').filter(x=> x != '')
    this.storeProfileForm.patchValue({
      shopName : store.shopName,
      ownerName : store.ownerName,
      category : store.category,
      address :{
         street : physicalAddressArray[0],
         city : physicalAddressArray[1],
         state : stateZip[0],
         zip : stateZip[1],
         country : physicalAddressArray[3]
      }

    })
  }
  
  getCategories() {
    return [
      //ToDo: Replace the hard coded constants.
      { id: 'GS', name: 'General store' },
      { id: 'M', name: 'Mall' },
      { id: 'S', name: 'Supermarket' },
      { id: 'MS', name: 'Medical store' }
    ];
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateStore(this.storeProfileForm.value);

    // post the changes
    this.geoService.addStore(this.store).subscribe(
      store => this.router.navigate(['']),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateStore(values: any) {
    Object.assign(this.store, values);
    this.store.physicalAddress = values.address.street + ", " +
                                 values.address.city + ", " +
                                 values.address.state + " " +
                                 values.address.zip + ", " +
                                 values.address.country;
  }


}
