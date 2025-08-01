import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { itemInterface } from '../interface/itemInterface';
import { HttpClient } from '@angular/common/http';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})

export class ItemSelector {
  interface:itemInterface = {
    id: "-1",
    name:'',
    img:'',
    price: -1,
  }

  private readonly STORAGE_KEY = 'app-cart';

  private selectedItem = new BehaviorSubject(this.interface);


  getItem = this.selectedItem.asObservable();


  constructor() { 

  }


  setItem(item: itemInterface){
    this.selectedItem.next(item);
  }



  

}
