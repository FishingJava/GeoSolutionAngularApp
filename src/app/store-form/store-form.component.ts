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

  storeProfileForm = this.fb.group({
    shopName: ['', Validators.required,Validators.minLength(4) ],
    ownerName: [''],
    category:[''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  constructor(private fb: FormBuilder,private geoService: GeoService,private router: Router) { }
 

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateStore(this.storeProfileForm.value);

    // post the changes
    this.geoService.addStore(this.store).subscribe(
      store => this.router.navigateByUrl('/store/' + store.shopName),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateStore(values: Object) {
    Object.assign(this.store, values);
  }


}
