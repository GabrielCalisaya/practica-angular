import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InscripcionService } from '../services/inscripcion.service';

interface Curso {
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-punto4',
  imports: [FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './punto4.html',
  styleUrl: './punto4.css',
})
export class Punto4 {
  private service = inject(InscripcionService);

  cursos: Curso[] = [
    { nombre: 'Desarrollo Web', precio: 15000 },
    { nombre: 'Programación Python', precio: 12000 },
    { nombre: 'Bases de Datos', precio: 10000 },
    { nombre: 'Diseño UX/UI', precio: 18000 },
    { nombre: 'Angular Avanzado', precio: 20000 },
    { nombre: 'Java para Principiantes', precio: 11000 },
  ];

  dni = '';
  email = '';
  cursoSeleccionado: Curso | null = null;
  categoriaAlumno: number = 0;

  dniValido(): boolean {
    return /^\d{7,8}$/.test(this.dni);
  }

  get precioBase(): number {
    return this.cursoSeleccionado?.precio ?? 0;
  }

  get descuentoPorcentaje(): number {
    const cat = Number(this.categoriaAlumno);
    if (cat === 1) return 35;
    if (cat === 2) return 50;
    return 0;
  }

  get montoDescuento(): number {
    return this.precioBase * (this.descuentoPorcentaje / 100);
  }

  get precioFinal(): number {
    return this.precioBase - this.montoDescuento;
  }

  get mostrarResumen(): boolean {
    return this.precioBase > 0 && Number(this.categoriaAlumno) > 0;
  }

  get formularioValido(): boolean {
    return this.dniValido() && !!this.email && !!this.cursoSeleccionado && Number(this.categoriaAlumno) > 0;
  }

  get inscripciones() {
    return this.service.getAll();
  }

  get resumen() {
    return this.service.getResumenPorCategoria();
  }

  get totalGeneral() {
    return this.service.getTotalGeneral();
  }

  nombreCategoria(cat: number): string {
    if (cat === 1) return 'Estudiante';
    if (cat === 2) return 'Egresado';
    return 'Particular';
  }

  registrar() {
    if (!this.formularioValido || !this.cursoSeleccionado) return;
    this.service.agregar({
      dni: this.dni,
      precio: this.precioBase,
      categoriaAlumno: Number(this.categoriaAlumno),
      fechaInscripcion: new Date(),
      email: this.email,
      curso: this.cursoSeleccionado.nombre,
      precioFinal: this.precioFinal,
    });
    this.dni = '';
    this.email = '';
    this.cursoSeleccionado = null;
    this.categoriaAlumno = 0;
  }

  eliminar(id: number) {
    this.service.eliminar(id);
  }
}
