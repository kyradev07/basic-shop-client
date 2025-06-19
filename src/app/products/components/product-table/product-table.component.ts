import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoList, CarritoService } from '@products/services/carrito.service';

@Component({
  selector: 'product-table',
  imports: [CurrencyPipe],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent implements OnInit {
  carritoService: CarritoService = inject(CarritoService);
  route: Router = inject(Router);
  products: WritableSignal<CarritoList[]> = signal([]);
  estaPago: boolean = false;


  ngOnInit(): void {
    this.products.set(this.carritoService.carrito);
  }

  calcularTotal() {
    return this.products().reduce((acc, prod) => acc + (prod.product.price * prod.cantidad), 0);
  }

  pagar() {
    if (this.products().length) {
      this.estaPago = true;
      this.carritoService.carrito = [];
      this.products.set([]);
      setTimeout(() => {
        this.estaPago = false;
        this.route.navigate(['/']).then();
      }, 2000);
    }
  }

  vaciarCarrito() {
    this.carritoService.carrito = [];
    this.route.navigate(['/']).then();
  }
}
