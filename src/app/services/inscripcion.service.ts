import { Injectable } from '@angular/core';

export interface Inscripcion {
  id: number;
  dni: string;
  precio: number;
  categoriaAlumno: number;
  fechaInscripcion: Date;
  email: string;
  curso: string;
  precioFinal: number;
}

@Injectable({ providedIn: 'root' })
export class InscripcionService {
  private inscripciones: Inscripcion[] = [];
  private nextId = 1;

  getAll(): Inscripcion[] {
    return this.inscripciones;
  }

  agregar(datos: Omit<Inscripcion, 'id'>): void {
    this.inscripciones.push({ ...datos, id: this.nextId++ });
  }

  eliminar(id: number): void {
    this.inscripciones = this.inscripciones.filter(i => i.id !== id);
  }

  getResumenPorCategoria() {
    const categorias = [
      { id: 1, nombre: 'Estudiante' },
      { id: 2, nombre: 'Egresado' },
      { id: 3, nombre: 'Particular' },
    ];
    return categorias.map(cat => ({
      nombre: cat.nombre,
      cantidad: this.inscripciones.filter(i => i.categoriaAlumno === cat.id).length,
      total: this.inscripciones
        .filter(i => i.categoriaAlumno === cat.id)
        .reduce((sum, i) => sum + i.precioFinal, 0),
    }));
  }

  getTotalGeneral(): number {
    return this.inscripciones.reduce((sum, i) => sum + i.precioFinal, 0);
  }
}
