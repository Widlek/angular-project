import { Component, Input } from '@angular/core';
import { ItemSelector } from '../item-selector';
import { itemInterface } from '../../interface/itemInterface';
import { Observable, switchMap, tap, of } from 'rxjs';
import { inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Crud } from '../crud';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-item',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './item.html',
  styleUrl: './item.css'
})
export class Item{
  private itemSelector = inject(ItemSelector);
  private crud = inject(Crud);
  private route = inject(ActivatedRoute);
  private cartSerive = inject(CartService);

  id = this.route.snapshot.paramMap.get('id');

  update(item: itemInterface){
    let newItem: itemInterface = {
      id: item.id,
      name: "pidor",
      img: "netu xdd",
      price: -1,
    }
    this.crud.updateToServer(item, newItem).subscribe({
      next: (res) =>{
        console.log('response:', res);
      }
    });
    this.itemSelector.setItem(newItem);
    
  }
  addToCart(item: itemInterface){
    console.log(item);
    this.cartSerive.addToCart(item);
  }
  item$: Observable<itemInterface | null> = this.itemSelector.getItem.pipe(
    switchMap(item => {
      if (item.id == "-1" && this.id != null) {
        return this.crud.getById(this.id);
      }
      return of(item);
    })
  );

}