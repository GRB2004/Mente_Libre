// src/app/components/tecnica-detalle/tecnica-detalle.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Tecnica, EstiloAprendizaje } from '../../models/interfaces';

@Component({
  selector: 'app-tecnica-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnica-detalle.component.html',
  styleUrl: './tecnica-detalle.component.scss'
})
export class TecnicaDetalleComponent implements OnInit {
  tecnicaActual: Tecnica | null = null;
  tecnicasEstilo: Tecnica[] = [];
  indiceActual: number = 0;
  estilo: EstiloAprendizaje = 'Activo';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluacionService: EvaluacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.estilo = params['tipo'] as EstiloAprendizaje;
      const tecnicaId = Number(params['id']);

      this.tecnicasEstilo = this.evaluacionService.getTecnicasPorEstilo(this.estilo);
      this.indiceActual = this.tecnicasEstilo.findIndex(t => t.id === tecnicaId);

      if (this.indiceActual !== -1) {
        this.tecnicaActual = this.tecnicasEstilo[this.indiceActual];
      } else {
        this.router.navigate(['/resultados']);
      }
    });
  }

  siguiente(): void {
    if (this.indiceActual < this.tecnicasEstilo.length - 1) {
      this.indiceActual++;
      this.tecnicaActual = this.tecnicasEstilo[this.indiceActual];
      this.router.navigate(['/tecnica', this.estilo, this.tecnicaActual!.id]);
    }
  }

  anterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.tecnicaActual = this.tecnicasEstilo[this.indiceActual];
      this.router.navigate(['/tecnica', this.estilo, this.tecnicaActual!.id]);
    }
  }

  volverResultados(): void {
    this.router.navigate(['/resultados']);
  }

  volverInicio(): void {
    this.evaluacionService.reiniciar();
    this.router.navigate(['/']);
  }

  get progreso(): number {
    return ((this.indiceActual + 1) / this.tecnicasEstilo.length) * 100;
  }
}
