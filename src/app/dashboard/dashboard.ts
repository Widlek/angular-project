import { Component, inject } from '@angular/core';
import {RouterModule } from '@angular/router';
import { ItemPreview } from '../item-preview/item-preview';
import { CommonModule } from '@angular/common';
import { Crud } from '../crud';
import { itemInterface } from '../../interface/itemInterface';
import { finalize, map, Observable, tap } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, ItemPreview, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard{
  private crud = inject(Crud);
  isLoading = true;
  error: string | null = null;
  items$: Observable<itemInterface[] | null> | null = this.crud.getAll().pipe(
        tap(data => {
          if (data === null) this.error = 'Ошибка загрузки данных';
        }),
        finalize(() => this.isLoading = false)
    );

  ngOnInit() {



    

  }
}
