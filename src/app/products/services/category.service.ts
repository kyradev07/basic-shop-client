import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '@products/interfaces/category.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}category`).pipe(
      tap((resp) => console.log(resp))
    );
  }

}
