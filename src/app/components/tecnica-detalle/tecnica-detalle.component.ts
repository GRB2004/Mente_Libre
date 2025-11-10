// src/app/components/tecnica-detalle/tecnica-detalle.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Tecnica, TipoAprendizaje } from '../../models/interfaces';

@Component({
  selector: 'app-tecnica-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnica-detalle.component.html',
  styleUrl: './tecnica-detalle.component.scss'
})
export class TecnicaDetalleComponent implements OnInit {
  tecnicaActual: Tecnica | null = null;
  tecnicasTipo: Tecnica[] = [];
  indiceActual: number = 0;
  tipo: TipoAprendizaje = 'Visual';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluacionService: EvaluacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo'] as TipoAprendizaje;
      const tecnicaId = Number(params['id']);

      this.tecnicasTipo = this.evaluacionService.getTecnicasPorTipo(this.tipo);
      this.indiceActual = this.tecnicasTipo.findIndex(t => t.id === tecnicaId);

      if (this.indiceActual !== -1) {
        this.tecnicaActual = this.tecnicasTipo[this.indiceActual];
      } else {
        this.router.navigate(['/resultados']);
      }
    });
  }

  siguiente(): void {
    if (this.indiceActual < this.tecnicasTipo.length - 1) {
      this.indiceActual++;
      this.tecnicaActual = this.tecnicasTipo[this.indiceActual];
      this.router.navigate(['/tecnica', this.tipo, this.tecnicaActual.id]);
    }
  }

  anterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.tecnicaActual = this.tecnicasTipo[this.indiceActual];
      this.router.navigate(['/tecnica', this.tipo, this.tecnicaActual.id]);
    }
  }

  volverResultados(): void {
    this.router.navigate(['/resultados']);
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }

  get progreso(): number {
    return ((this.indiceActual + 1) / this.tecnicasTipo.length) * 100;
  }
}
