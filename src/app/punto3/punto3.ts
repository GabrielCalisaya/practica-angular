import { Component } from '@angular/core';

interface Carta {
  id: number;
  valor: string;
  emoji: string;
  volteada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-punto3',
  imports: [],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css',
})
export class Punto3 {
  private parejas = [
    { valor: '1', emoji: '🎯' },
    { valor: '2', emoji: '🎮' },
    { valor: '3', emoji: '🎲' },
    { valor: '4', emoji: '🌟' },
    { valor: '5', emoji: '🎨' },
    { valor: '6', emoji: '🏆' },
  ];

  tablero: Carta[] = [];
  cartasSeleccionadas: Carta[] = [];
  intentosRestantes = 10;
  juegoIniciado = false;
  juegoTerminado = false;
  puedeVoltear = false;
  mensaje = '';

  private mezclar<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  iniciar() {
    const dobles = [...this.parejas, ...this.parejas];
    const mezcladas = this.mezclar(dobles);
    this.tablero = mezcladas.map((p, i) => ({
      id: i,
      valor: p.valor,
      emoji: p.emoji,
      volteada: false,
      encontrada: false,
    }));
    this.intentosRestantes = 10;
    this.cartasSeleccionadas = [];
    this.juegoIniciado = true;
    this.juegoTerminado = false;
    this.puedeVoltear = false;
    this.mensaje = '';
  }

  reiniciar() {
    this.tablero = [];
    this.cartasSeleccionadas = [];
    this.intentosRestantes = 10;
    this.juegoIniciado = false;
    this.juegoTerminado = false;
    this.puedeVoltear = false;
    this.mensaje = '';
  }

  intentar() {
    if (!this.juegoIniciado || this.juegoTerminado || this.intentosRestantes <= 0) return;
    this.puedeVoltear = true;
    this.cartasSeleccionadas = [];
  }

  voltearCarta(carta: Carta) {
    if (!this.puedeVoltear || carta.volteada || carta.encontrada) return;
    if (this.cartasSeleccionadas.length >= 2) return;

    carta.volteada = true;
    this.cartasSeleccionadas.push(carta);

    if (this.cartasSeleccionadas.length === 2) {
      this.puedeVoltear = false;
      const [c1, c2] = this.cartasSeleccionadas;

      if (c1.valor === c2.valor) {
        c1.encontrada = true;
        c2.encontrada = true;
        this.cartasSeleccionadas = [];
        if (this.tablero.every(c => c.encontrada)) {
          this.juegoTerminado = true;
          this.mensaje = '¡Ganaste! Descubriste todas las cartas.';
        }
      } else {
        setTimeout(() => {
          c1.volteada = false;
          c2.volteada = false;
          this.cartasSeleccionadas = [];
          this.intentosRestantes--;
          if (this.intentosRestantes <= 0) {
            this.juegoTerminado = true;
            this.mensaje = '¡Sin intentos! El juego ha terminado.';
          }
        }, 900);
      }
    }
  }
}
