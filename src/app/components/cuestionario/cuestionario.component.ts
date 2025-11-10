// src/app/components/cuestionario/cuestionario.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Pregunta, TipoAprendizaje } from '../../models/interfaces';

@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.scss'
})
export class CuestionarioComponent implements OnInit {
  preguntas: Pregunta[] = [];
  preguntaActual: number = 0;
  respuestaSeleccionada: TipoAprendizaje | null = null;

  constructor(
    private evaluacionService: EvaluacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.preguntas = this.evaluacionService.getPreguntas();
  }

  seleccionarRespuesta(tipo: TipoAprendizaje): void {
    this.respuestaSeleccionada = tipo;
  }

  siguientePregunta(): void {
    if (this.respuestaSeleccionada) {
      this.evaluacionService.guardarRespuesta({
        preguntaId: this.preguntas[this.preguntaActual].id,
        tipoSeleccionado: this.respuestaSeleccionada
      });

      if (this.preguntaActual < this.preguntas.length - 1) {
        this.preguntaActual++;
        this.respuestaSeleccionada = null;
      } else {
        this.evaluacionService.calcularResultado();
        this.router.navigate(['/resultados']);
      }
    }
  }

  anteriorPregunta(): void {
    if (this.preguntaActual > 0) {
      this.preguntaActual--;
      this.respuestaSeleccionada = null;
    }
  }

  get progreso(): number {
    return ((this.preguntaActual + 1) / this.preguntas.length) * 100;
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}
