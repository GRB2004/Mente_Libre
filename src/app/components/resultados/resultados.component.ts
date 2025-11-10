// src/app/components/resultados/resultados.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ResultadoEvaluacion, Tecnica, TipoAprendizaje } from '../../models/interfaces';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent implements OnInit {
  resultado: ResultadoEvaluacion | null = null;
  tecnicas: Tecnica[] = [];
  tipoSeleccionado: TipoAprendizaje = 'Visual';

  descripcionesTipos: { [key in TipoAprendizaje]: string } = {
    'Visual': 'Aprendes mejor cuando puedes ver la información. Prefieres gráficos, diagramas, imágenes y demostraciones visuales.',
    'Auditivo': 'Aprendes mejor escuchando. Prefieres explicaciones verbales, discusiones, música y lectura en voz alta.',
    'Kinestésico': 'Aprendes mejor haciendo. Prefieres la experiencia práctica, el movimiento y la manipulación de objetos.'
  };

  constructor(
    private evaluacionService: EvaluacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resultado = this.evaluacionService.getResultado();

    if (!this.resultado) {
      this.router.navigate(['/']);
      return;
    }

    this.tipoSeleccionado = this.resultado.tipoPredominate;
    this.tecnicas = this.evaluacionService.getTecnicasPorTipo(this.tipoSeleccionado);
  }

  seleccionarTipo(tipo: TipoAprendizaje): void {
    this.tipoSeleccionado = tipo;
    this.tecnicas = this.evaluacionService.getTecnicasPorTipo(tipo);
  }

  verDetalleTecnica(tecnica: Tecnica): void {
    this.router.navigate(['/tecnica', tecnica.tipo, tecnica.id]);
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }

  get tiposPorcentajes() {
    if (!this.resultado) return [];

    const total = this.resultado.puntajes.Visual +
                  this.resultado.puntajes.Auditivo +
                  this.resultado.puntajes.Kinestésico;

    return [
      { tipo: 'Visual' as TipoAprendizaje, porcentaje: Math.round((this.resultado.puntajes.Visual / total) * 100) },
      { tipo: 'Auditivo' as TipoAprendizaje, porcentaje: Math.round((this.resultado.puntajes.Auditivo / total) * 100) },
      { tipo: 'Kinestésico' as TipoAprendizaje, porcentaje: Math.round((this.resultado.puntajes.Kinestésico / total) * 100) }
    ];
  }
}
