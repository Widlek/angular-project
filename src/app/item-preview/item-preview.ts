import { Component, inject, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemSelector } from '../item-selector';
import { itemInterface } from '../../interface/itemInterface';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-item-preview',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './item-preview.html',
  styleUrl: './item-preview.css'
})
export class ItemPreview {
  @Input() input:itemInterface = {id: '', name:'', img:'', price: -1};

  private itemSelector = inject(ItemSelector);
  private cartService = inject(CartService);

  selectItem(){
    this.itemSelector.setItem(this.input);
  }

  addToCart(){
    if(this.input.id != '' && this.input.price != -1){
      this.cartService.addToCart(this.input);
    }
  }
}
