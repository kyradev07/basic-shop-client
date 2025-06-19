import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent, CurrencyPipe, RouterLink],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productId = this.activatedRoute.snapshot.params['id'];

  productResource = rxResource({
    request: () => ({ id: this.productId }),
    loader: ({ request }) =>
      this.productService.getProductById(request.id),
  });
}
