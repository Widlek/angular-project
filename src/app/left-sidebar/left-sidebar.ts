import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../cart-service';
import { Observable } from 'rxjs';
import { itemInterface } from '../../interface/itemInterface';
import { CountPipe } from '../count-pipe';
import { CartItem } from '../../interface/cart-item';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterModule, CommonModule, CountPipe],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css'
})
export class LeftSidebar {

  private cartService = inject(CartService);
  items$: Observable<CartItem[] | null> | null = this.cartService.cart$;
  openCart(){
    this.cartService.open();
  }
  items = [
    {
      routerLink: 'dashboard',
      icon: ' ',
      label: 'Dashboard'
    },
    {
      routerLink: 'login',
      icon: ' ',
      label: 'Sign up | Login'
    }
  ]
}
