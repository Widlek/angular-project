import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { itemInterface } from '../interface/itemInterface';
import { catchError } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class Crud {

  private cache$: Observable<any> | null = null;
  private test$: Observable<any> | null = null;
  private lastRefresh = 0;
  private readonly CACHE_TTL = 300000;

  constructor(private http: HttpClient){};

  getAll(forceRefresh = false): Observable<itemInterface[] | null> {
    const now = Date.now();
    const url = 'http://localhost:3000/onlinerData';
    if (forceRefresh || !this.cache$ || now - this.lastRefresh > this.CACHE_TTL || this.cache$ === undefined) {
      
      this.cache$ = this.http.get<itemInterface[]>(url).pipe(
        catchError(error => {
          console.error('API Error:', error);
          return of(null); 
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.lastRefresh = now;
    }
    else{
      console.log("not loaded");
    }
    return this.cache$;
  }
  
  getById(id: string): Observable<itemInterface | null> {
    const url = `http://localhost:3000/onlinerData/${id}`;

    return this.http.get<itemInterface>(url).pipe(
      shareReplay({bufferSize: 1, refCount: true})
    );
    
  }

  clearCache(): void {
    this.cache$ = null;
  }

  updateToServer(item:itemInterface,update: Partial<itemInterface>){
    const now = Date.now();
    const url = `http://localhost:3000/update`;
    // return this.http.post(url, {item, update});
    this.cache$ = this.http.post<itemInterface[]>(url, {item, update}).pipe(
        catchError(error => {
          console.error('API Error:', error);
          return of(null); 
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.lastRefresh = now;
      return this.cache$;
  }
}
