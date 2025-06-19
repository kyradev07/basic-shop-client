import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, of } from 'rxjs';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  category = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    request: () => ({ category: this.category() }),
    loader: ({ request }) => {
      return this.productsService.getProducts().pipe(
        map((products) => products.filter(product => product.category.name.toLowerCase() === this.category())),
      );
    },
  });
}
