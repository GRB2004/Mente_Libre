// src/app/components/home/home.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ResultadoHoneyAlonso } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private evaluacionService: EvaluacionService
  ) {}

  // 👉 ESTE sigue siendo el examen normal
  iniciarPrueba(): void {
    this.evaluacionService.reiniciar();
    this.router.navigate(['/cuestionario']);
  }

  // 👉 ESTE SOLO ES PARA SALTAR DIRECTO A RESULTADOS CON DATOS SIMULADOS
  saltarAMetodos(): void {
    this.evaluacionService['resultadoActual'] = {
      puntajes: {
        Activo: 18,
        Reflexivo: 12,
        Teórico: 15,
        Pragmático: 10
      },
      porcentajes: {
        Activo: 90,
        Reflexivo: 60,
        Teórico: 75,
        Pragmático: 50
      }
    } as ResultadoHoneyAlonso;

    this.router.navigate(['/resultados']);
  }
}




