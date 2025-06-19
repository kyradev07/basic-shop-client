import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';

import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productsService = inject(ProductsService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.productsService.getProducts();
    },
  });
}
