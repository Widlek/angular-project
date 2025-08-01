import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebar } from '../left-sidebar/left-sidebar';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, CommonModule, LeftSidebar, Cart],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
