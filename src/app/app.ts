import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebar } from './left-sidebar/left-sidebar';
import { Main } from './main/main';


@Component({
  selector: 'app-root',
  imports: [Main],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pet-project';
}
