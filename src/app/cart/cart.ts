import { Component, inject, Input, input } from '@angular/core';
import { CartService } from '../cart-service';
import { Observable } from 'rxjs';
import { itemInterface } from '../../interface/itemInterface';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { ItemPreview } from '../item-preview/item-preview';
import { SumPipePipe } from '../sum-pipe-pipe';
import { CartPreview } from '../cart-preview/cart-preview';
import { CartItem } from '../../interface/cart-item';


@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, ItemPreview, CommonModule, SumPipePipe, AsyncPipe, CartPreview],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private cartService = inject(CartService);


  items$: Observable<CartItem[] | null> | null = this.cartService.cart$;
  isOpen = this.cartService.isOpen;
  close(){
    this.cartService.close();
  }


}
