import { Component } from '@angular/core';

@Component({
  selector: 'app-punto2',
  imports: [],
  templateUrl: './punto2.html',
  styleUrl: './punto2.css',
})
export class Punto2 {

  productos = [
    { nombre: 'Teclado Logitech', descripcion: 'Descripción del Teclado', precio: 50000, img: 'assets/producto1.jpg' },
    { nombre: 'Mouse Logitech', descripcion: 'Descripción del Mouse', precio: 10000, img: 'assets/producto2.jpg' },
    { nombre: 'Camara Logitech', descripcion: 'Descripción de la Cámara', precio: 40000, img: 'assets/producto3.jpg' },
  ];

  carrito: any[] = [];
  mostrarModal = false;

  estaEnCarrito(producto: any): boolean {
    return this.carrito.some(p => p.nombre === producto.nombre);
  }

  agregarAlCarrito(producto: any) {
    if (!this.estaEnCarrito(producto)) {
      this.carrito.push(producto);
    }
  }
  get total() {
    return this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }
}