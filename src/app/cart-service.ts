
import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { itemInterface } from '../interface/itemInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../interface/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly STORAGE_KEY = 'app-cart';
  private cart = new BehaviorSubject<CartItem[] | null>([]);
  cart$ = this.cart.asObservable();

  private renderer: Renderer2;

  constructor(private http: HttpClient, private rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadCart();
  }

  isOpen = signal(false);

  open() {
    this.renderer.addClass(document.body, 'open');
    this.isOpen.set(true);
  }

  close() {
    this.renderer.removeClass(document.body, 'open');
    this.isOpen.set(false);
  }

  loadCart(){
    this.loadData(this.localData());
  }


    loadData(idArray: string[] | null){
    const url = 'http://localhost:3000/onlinerData/cart';
    this.http.post<CartItem[]>(url, idArray).subscribe(
        data =>{this.cart.next(data)}
    );
  }


  localData(){
    if (typeof window !== 'undefined' && window.localStorage) {
      let savedIdArray = localStorage.getItem(this.STORAGE_KEY);
      let cart: string[] = [];
      if(savedIdArray){
        cart = JSON.parse(savedIdArray);
        return cart;
      }
      else{
        return [];
      }
    }
    else{
      return [];
    }
  }

  saveToLocal(array: string[]){
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('app-cart', JSON.stringify(array));
    }
  }

  addToCart(item: itemInterface){
      let newCart = this.localData();
      newCart.push(item.id);
      this.loadData(newCart);
      this.saveToLocal(newCart);
  }

  removeFromCart(item: itemInterface){
    let newCart = this.localData();
    let index = newCart.lastIndexOf(item.id);
    newCart.splice(index, 1);
    this.saveToLocal(newCart);
    this.loadData(newCart); 
    
  }

  deleteFromCart(item: itemInterface){
    let newCart = this.localData();
    newCart = newCart.filter(element => element != item.id);
    this.saveToLocal(newCart);
    this.loadData(newCart);
    
  }
  
}
