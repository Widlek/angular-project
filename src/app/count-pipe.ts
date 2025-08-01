import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../interface/cart-item';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(items: CartItem[]): number {
    return items.reduce((sum, item)=> sum + item.count, 0);
  }

}
