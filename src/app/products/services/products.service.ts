import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, } from '@products/interfaces/product.interface';
import { Observable, tap, } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}product`).pipe(
      tap((resp) => console.log(resp))
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}product/${id}`)
  }

}
