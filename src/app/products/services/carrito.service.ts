import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';

const baseUrl = environment.baseUrl;

export interface CarritoList {
  product: Product;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

  carrito: CarritoList[] = [];

  agregar(producto: Product, cantidad: number): void {
    const index = this.carrito.findIndex(product => product.product.id === producto.id)

    if (index === -1) {
      this.carrito.push({ product: producto, cantidad: cantidad });
    } else {
      this.carrito[index].cantidad += cantidad;
    }
    console.log(this.carrito);
  }




}
