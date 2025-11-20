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

  estilo!: EstiloAprendizaje;
  tecnicasEstilo: Tecnica[] = [];
  tecnicaActual!: Tecnica;
  indiceActual: number = 0;

  // Imagen actual de la técnica (puede ser null si no hay)
  tecnicaActualImagen: string | null = null;

  // Imagen en fullscreen (modal)
  fullscreenImage: string | null = null;

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
        this.tecnicaActualImagen = this.tecnicaActual.imagen ?? null;
      } else {
        this.router.navigate(['/resultados']);
      }
    });
  }

  seleccionarTecnica(index: number): void {
    this.indiceActual = index;
    this.tecnicaActual = this.tecnicasEstilo[this.indiceActual];
    this.tecnicaActualImagen = this.tecnicaActual.imagen ?? null;
  }

  anterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.tecnicaActual = this.tecnicasEstilo[this.indiceActual];
      this.tecnicaActualImagen = this.tecnicaActual.imagen ?? null;
    }
  }

  siguiente(): void {
    if (this.indiceActual < this.tecnicasEstilo.length - 1) {
      this.indiceActual++;
      this.tecnicaActual = this.tecnicasEstilo[this.indiceActual];
      this.tecnicaActualImagen = this.tecnicaActual.imagen ?? null;
    }
  }

  volverResultados(): void {
    this.router.navigate(['/resultados']);
  }

  volverInicio(): void {
    this.router.navigate(['/resultados']);
  }

  abrirImagenFullscreen(): void {
    this.fullscreenImage = this.tecnicaActualImagen;
  }

  cerrarFullscreen(): void {
    this.fullscreenImage = null;
  }

  get progreso(): number {
    return ((this.indiceActual + 1) / this.tecnicasEstilo.length) * 100;
  }
}
