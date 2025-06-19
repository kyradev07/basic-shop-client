import { Component, inject, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '@products/services/carrito.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent, CurrencyPipe, RouterLink],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  carrito: CarritoService = inject(CarritoService);

  productId = this.activatedRoute.snapshot.params['id'];

  productResource = rxResource({
    request: () => ({ id: this.productId }),
    loader: ({ request }) => this.productService.getProductById(request.id)
  });

  cantidad: WritableSignal<number> = signal(0)

  remove() {
    if (this.productResource.value()!.stock >= 0 && this.cantidad() > 0) {
      this.productResource.value()!.stock++;
      this.cantidad.update(value => value - 1);
    }
  }

  add() {
    if (this.productResource.value()!.stock > 0) {
      this.productResource.value()!.stock--;
      this.cantidad.update(value => value + 1);
    }
  }

  agregarCarrito(): void {
    this.carrito.agregar(this.productResource.value()!, this.cantidad());
  }

}
