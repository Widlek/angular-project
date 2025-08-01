import { Component, inject, Input } from '@angular/core';
import { itemInterface } from '../../interface/itemInterface';
import { ItemSelector } from '../item-selector';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../interface/cart-item';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-cart-preview',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-preview.html',
  styleUrl: './cart-preview.css'
})
export class CartPreview {
  @Input() input:CartItem = {id: '-1', name:'', img:'', price: -1, count: -1};

  private itemSelector = inject(ItemSelector);
  private cartService = inject(CartService);

  selectItem(){
    this.itemSelector.setItem(this.input);
  }

  addToCart(){
    console.log(this.input)
    this.cartService.addToCart(this.input);
  }

  removeFromCart(){
    console.log(this.input)
    this.cartService.removeFromCart(this.input);
  }
}
