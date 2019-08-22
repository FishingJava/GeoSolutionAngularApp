import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GeoService } from '../services/geo.service';
import { Store } from '../models/store.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.less']
})
export class StoreFormComponent implements OnInit {
  store: Store = {} as Store;
  errors: Object = {};
  isSubmitting = false;

  categories = [];

  storeProfileForm = this.fb.group({
    shopName: ['', Validators.required,Validators.minLength(4) ],
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

  constructor(private fb: FormBuilder,private geoService: GeoService,private router: Router) { 
    this.categories = this.getCategories();
  }
 

  ngOnInit() {
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
