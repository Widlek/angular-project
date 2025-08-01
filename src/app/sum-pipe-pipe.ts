import { Pipe, PipeTransform } from '@angular/core';
import { itemInterface } from '../interface/itemInterface';
import { CartItem } from '../interface/cart-item';

@Pipe({
  name: 'sumPipe'
})
export class SumPipePipe implements PipeTransform {

  transform(items: CartItem[]): number {
    return items.reduce((sum, item)=> sum + item.price * item.count, 0);
  }

}
