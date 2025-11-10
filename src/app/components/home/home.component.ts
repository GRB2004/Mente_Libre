// src/app/components/home/home.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';

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

  iniciarPrueba(): void {
    this.evaluacionService.reiniciar();
    this.router.navigate(['/cuestionario']);
  }
}
