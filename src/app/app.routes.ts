import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Item } from './item/item';
import { Homepage } from './homepage/homepage';
import { Cart } from './cart/cart';

export const routes: Routes = [
  { path: '', component: Homepage },
  { 
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
  },
  { path: 'login', component: Login },
  { path: 'item/:id', component: Item },
  {path: 'cart', component: Cart}
];