import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  imports: [],
  templateUrl: './punto1.html',
  styleUrl: './punto1.css',
})
export class Punto1 {
  indiceActual = 0;
  eventos = [
    { nombre: 'League Of Legends', descripcion: 'Descripcion Generica', img: 'assets/lol.jpg' },
    { nombre: 'Valorant', descripcion: 'Descripcion Generica', img: 'assets/valorant.jpg' },
    { nombre: 'Age Of Empire II', descripcion: 'Descripcion Generica', img: 'assets/aoe.jpg' },
  ];
  siguiente() {
    if (this.indiceActual < this.eventos.length - 1) {
      this.indiceActual++;
    }
  }
  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }
}
