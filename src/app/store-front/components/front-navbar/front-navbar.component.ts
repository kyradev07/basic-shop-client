import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '@products/services/category.service';
import { CarritoService } from '@products/services/carrito.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  authService = inject(AuthService);
  categoryService = inject(CategoryService);
  carritoService = inject(CarritoService);

  categoryResource = rxResource({
    loader: () => this.categoryService.getCategories()
  });

  get cantidadCarrito(): number {
    return this.carritoService.carrito.reduce((ac, producto) => ac + producto.cantidad, 0);
  }
}
