import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ResultadoHoneyAlonso } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router,
    private evaluacionService: EvaluacionService
  ) {}

  iniciarPrueba(): void {

    // Guardar un resultado simulado COMPLETO
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

    // Ir directamente a Resultados
    this.router.navigate(['/resultados']);
  }
}




