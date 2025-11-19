// src/app/components/resultados/resultados.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ResultadoHoneyAlonso, Tecnica, EstiloAprendizaje } from '../../models/interfaces';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent implements OnInit {
  resultado: ResultadoHoneyAlonso | null = null;
  tecnicas: Tecnica[] = [];
  estiloSeleccionado: EstiloAprendizaje = 'Activo';

  descripcionesEstilos: { [key in EstiloAprendizaje]: string } = {
    'Activo': 'Las personas con predominancia en estilo Activo se implican plenamente y sin prejuicios en nuevas experiencias. Son de mente abierta, nada escépticos y acometen con entusiasmo las tareas nuevas. Piensan que al menos una vez hay que intentarlo todo. Sus días están llenos de actividad. Tan pronto como desciende la excitación de una novedad, comienzan a buscar la próxima.',

    'Reflexivo': 'A los Reflexivos les gusta considerar las experiencias y observarlas desde diferentes perspectivas. Recogen datos, analizándolos con detenimiento antes de llegar a alguna conclusión. Son prudentes y consideran todas las alternativas antes de realizar un movimiento. Disfrutan observando la actuación de los demás, escuchan a los demás y no actúan hasta apropiarse de la situación.',

    'Teórico': 'Los Teóricos adaptan e integran las observaciones dentro de teorías lógicas y complejas. Enfocan los problemas de forma vertical escalonada, por etapas lógicas. Tienden a ser perfeccionistas. Les gusta analizar y sintetizar. Son profundos en su sistema de pensamiento cuando establecen principios, teorías y modelos. Buscan la racionalidad y la objetividad huyendo de lo subjetivo y de lo ambiguo.',

    'Pragmático': 'El punto fuerte de los Pragmáticos es la aplicación práctica de las ideas. Descubren el aspecto positivo de las nuevas ideas y aprovechan la primera oportunidad para experimentarlas. Les gusta actuar rápidamente y con seguridad con aquellas ideas y proyectos que les atraen. Tienden a ser impacientes cuando hay personas que teorizan. Son personas esencialmente realistas.'
  };

  caracteristicasEstilos: { [key in EstiloAprendizaje]: string[] } = {
    'Activo': [
      'Animador',
      'Improvisador',
      'Descubridor',
      'Arriesgado',
      'Espontáneo',
      'Creativo',
      'Aventurero',
      'Renovador'
    ],
    'Reflexivo': [
      'Ponderado',
      'Concienzudo',
      'Receptivo',
      'Analítico',
      'Exhaustivo',
      'Observador',
      'Paciente',
      'Cuidadoso'
    ],
    'Teórico': [
      'Metódico',
      'Lógico',
      'Objetivo',
      'Crítico',
      'Estructurado',
      'Disciplinado',
      'Sistemático',
      'Ordenado'
    ],
    'Pragmático': [
      'Experimentador',
      'Práctico',
      'Directo',
      'Eficaz',
      'Realista',
      'Rápido',
      'Decidido',
      'Concreto'
    ]
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

    this.estiloSeleccionado = this.resultado.estiloPredominate;
    this.tecnicas = this.evaluacionService.getTecnicasPorEstilo(this.estiloSeleccionado);
  }

  seleccionarEstilo(estilo: EstiloAprendizaje): void {
    this.estiloSeleccionado = estilo;
    this.tecnicas = this.evaluacionService.getTecnicasPorEstilo(estilo);
  }

  verDetalleTecnica(tecnica: Tecnica): void {
    this.router.navigate(['/tecnica', tecnica.estilo, tecnica.id]);
  }

  volverInicio(): void {
    this.evaluacionService.reiniciar();
    this.router.navigate(['/']);
  }

  get estilosPorcentajes() {
    if (!this.resultado) return [];

    return [
      {
        estilo: 'Activo' as EstiloAprendizaje,
        puntaje: this.resultado.puntajes.Activo,
        porcentaje: this.resultado.porcentajes.Activo
      },
      {
        estilo: 'Reflexivo' as EstiloAprendizaje,
        puntaje: this.resultado.puntajes.Reflexivo,
        porcentaje: this.resultado.porcentajes.Reflexivo
      },
      {
        estilo: 'Teórico' as EstiloAprendizaje,
        puntaje: this.resultado.puntajes.Teórico,
        porcentaje: this.resultado.porcentajes.Teórico
      },
      {
        estilo: 'Pragmático' as EstiloAprendizaje,
        puntaje: this.resultado.puntajes.Pragmático,
        porcentaje: this.resultado.porcentajes.Pragmático
      }
    ];
  }

  getCaracteristicas(): string[] {
    return this.caracteristicasEstilos[this.estiloSeleccionado];
  }
}
