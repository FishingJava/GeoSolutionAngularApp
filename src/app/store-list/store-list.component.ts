import { Component, OnInit } from '@angular/core';

import {stores} from "../stores"
@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.less']
})
export class StoreListComponent implements OnInit {
   stores = stores;
  constructor() { }

  ngOnInit() {
  }

}
