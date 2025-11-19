// src/app/services/evaluacion.service.ts

import { Injectable } from '@angular/core';
import { PreguntaHoneyAlonso, RespuestaHoneyAlonso, ResultadoHoneyAlonso, Tecnica, EstiloAprendizaje } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private respuestas: RespuestaHoneyAlonso[] = [];
  private resultadoActual: ResultadoHoneyAlonso | null = null;

  readonly preguntas: PreguntaHoneyAlonso[] = [
    { numero: 1, texto: 'Tengo fama de decir lo que pienso claramente y sin rodeos.', estilo: 'Pragmático' },
    { numero: 2, texto: 'Estoy seguro/a de lo que es bueno y malo, lo que está bien y lo que está mal.', estilo: 'Teórico' },
    { numero: 3, texto: 'Muchas veces actúo sin mirar las consecuencias.', estilo: 'Activo' },
    { numero: 4, texto: 'Normalmente trato de resolver los problemas metódicamente y paso a paso.', estilo: 'Teórico' },
    { numero: 5, texto: 'Creo que los formalismos coartan y limitan la actuación libre de las personas.', estilo: 'Activo' },
    { numero: 6, texto: 'Me interesa saber cuáles son los sistemas de valores de los demás y con qué criterios actúan.', estilo: 'Teórico' },
    { numero: 7, texto: 'Pienso que el actuar intuitivamente puede ser siempre tan válido como actuar reflexivamente.', estilo: 'Activo' },
    { numero: 8, texto: 'Creo que lo más importante es que las cosas funcionen.', estilo: 'Pragmático' },
    { numero: 9, texto: 'Procuro estar al tanto de lo importante aquí y ahora.', estilo: 'Activo' },
    { numero: 10, texto: 'Disfruto cuando tengo tiempo para preparar mi trabajo y realizarlo a conciencia.', estilo: 'Reflexivo' },
    { numero: 11, texto: 'Estoy a gusto siguiendo un orden, en las comidas, en el estudio, haciendo ejercicio regularmente.', estilo: 'Teórico' },
    { numero: 12, texto: 'Cuando escucho una nueva idea enseguida comienzo a pensar cómo ponerla en práctica.', estilo: 'Pragmático' },
    { numero: 13, texto: 'Prefiero las ideas originales y novedosas aunque no sean prácticas.', estilo: 'Activo' },
    { numero: 14, texto: 'Admito y me ajusto a las normas sólo si me sirven para lograr mis objetivos.', estilo: 'Pragmático' },
    { numero: 15, texto: 'Normalmente encajo bien con personas reflexivas, y me cuesta sintonizar con personas demasiado espontáneas, imprevisibles.', estilo: 'Teórico' },
    { numero: 16, texto: 'Escucho con más frecuencia que hablo.', estilo: 'Reflexivo' },
    { numero: 17, texto: 'Prefiero las cosas estructuradas a las desordenadas.', estilo: 'Teórico' },
    { numero: 18, texto: 'Cuando poseo cualquier información, trato de interpretarla bien antes de manifestar alguna conclusión.', estilo: 'Reflexivo' },
    { numero: 19, texto: 'Antes de hacer algo estudio con cuidado sus ventajas e inconvenientes.', estilo: 'Reflexivo' },
    { numero: 20, texto: 'Me crezco con el reto de hacer algo nuevo y diferente.', estilo: 'Activo' },
    { numero: 21, texto: 'Casi siempre procuro ser coherente con mis criterios y sistemas de valores. Tengo principios y los sigo.', estilo: 'Teórico' },
    { numero: 22, texto: 'Cuando hay una discusión no me gusta ir con rodeos.', estilo: 'Pragmático' },
    { numero: 23, texto: 'Me disgusta implicarme afectivamente en mi ambiente de trabajo. Prefiero mantener relaciones distantes.', estilo: 'Teórico' },
    { numero: 24, texto: 'Me gustan más las personas realistas y concretas que las teóricas.', estilo: 'Pragmático' },
    { numero: 25, texto: 'Me cuesta ser creativo/a, romper estructuras.', estilo: 'Reflexivo' },
    { numero: 26, texto: 'Me siento a gusto con personas espontáneas y divertidas.', estilo: 'Activo' },
    { numero: 27, texto: 'La mayoría de las veces expreso abiertamente cómo me siento.', estilo: 'Activo' },
    { numero: 28, texto: 'Me gusta analizar y dar vueltas a las cosas.', estilo: 'Reflexivo' },
    { numero: 29, texto: 'Me molesta que la gente no se tome en serio las cosas.', estilo: 'Teórico' },
    { numero: 30, texto: 'Me atrae experimentar y practicar las últimas técnicas y novedades.', estilo: 'Pragmático' },
    { numero: 31, texto: 'Soy cauteloso/a a la hora de sacar conclusiones.', estilo: 'Reflexivo' },
    { numero: 32, texto: 'Prefiero contar con el mayor número de fuentes de información. Cuantos más datos reúna para reflexionar, mejor.', estilo: 'Reflexivo' },
    { numero: 33, texto: 'Tiendo a ser perfeccionista.', estilo: 'Teórico' },
    { numero: 34, texto: 'Prefiero oír las opiniones de los demás antes de exponer la mía.', estilo: 'Reflexivo' },
    { numero: 35, texto: 'Me gusta afrontar la vida espontáneamente y no tener que planificar todo previamente.', estilo: 'Activo' },
    { numero: 36, texto: 'En las discusiones me gusta observar cómo actúan los demás participantes.', estilo: 'Reflexivo' },
    { numero: 37, texto: 'Me siento incómodo/a con las personas calladas y demasiado analíticas.', estilo: 'Activo' },
    { numero: 38, texto: 'Juzgo con frecuencia las ideas de los demás por su valor práctico.', estilo: 'Pragmático' },
    { numero: 39, texto: 'Me agobio si me obligan a acelerar mucho el trabajo para cumplir un plazo.', estilo: 'Reflexivo' },
    { numero: 40, texto: 'En las reuniones apoyo las ideas prácticas y realistas.', estilo: 'Pragmático' },
    { numero: 41, texto: 'Es mejor gozar del momento presente que deleitarse pensando en el pasado o en el futuro.', estilo: 'Activo' },
    { numero: 42, texto: 'Me molestan las personas que siempre desean apresurar las cosas.', estilo: 'Reflexivo' },
    { numero: 43, texto: 'Aporto ideas nuevas y espontáneas en los grupos de discusión.', estilo: 'Activo' },
    { numero: 44, texto: 'Pienso que son más consistentes las decisiones fundamentadas en un minucioso análisis que las basadas en la intuición.', estilo: 'Teórico' },
    { numero: 45, texto: 'Detecto frecuentemente la inconsistencia y puntos débiles en las argumentaciones de los demás.', estilo: 'Teórico' },
    { numero: 46, texto: 'Creo que es preciso saltarse las normas muchas más veces que cumplirlas.', estilo: 'Activo' },
    { numero: 47, texto: 'A menudo caigo en la cuenta de otras formas mejores y más prácticas de hacer las cosas.', estilo: 'Pragmático' },
    { numero: 48, texto: 'En conjunto hablo más de lo que escucho.', estilo: 'Activo' },
    { numero: 49, texto: 'Prefiero distanciarme de los hechos y observarlos desde otras perspectivas.', estilo: 'Reflexivo' },
    { numero: 50, texto: 'Estoy convencido/a de que debe imponerse la lógica y el razonamiento.', estilo: 'Teórico' },
    { numero: 51, texto: 'Me gusta buscar nuevas experiencias.', estilo: 'Activo' },
    { numero: 52, texto: 'Me gusta experimentar y aplicar las cosas.', estilo: 'Pragmático' },
    { numero: 53, texto: 'Pienso que debemos llegar pronto al grano, al meollo de los temas.', estilo: 'Pragmático' },
    { numero: 54, texto: 'Siempre trato de conseguir conclusiones e ideas claras.', estilo: 'Teórico' },
    { numero: 55, texto: 'Prefiero discutir cuestiones concretas y no perder el tiempo con charlas vacías.', estilo: 'Pragmático' },
    { numero: 56, texto: 'Me impaciento cuando me dan explicaciones irrelevantes e incoherentes.', estilo: 'Pragmático' },
    { numero: 57, texto: 'Compruebo antes si las cosas funcionan realmente.', estilo: 'Pragmático' },
    { numero: 58, texto: 'Hago varios borradores antes de la redacción definitiva.', estilo: 'Reflexivo' },
    { numero: 59, texto: 'Soy consciente de que en las discusiones ayudo a mantener a los demás centrados en el tema, evitando divagaciones.', estilo: 'Teórico' },
    { numero: 60, texto: 'Observo que, con frecuencia, soy uno/a de los/as más objetivos/as y desapasionados/as en las discusiones.', estilo: 'Teórico' },
    { numero: 61, texto: 'Cuando algo va mal, le quito importancia y trato de hacerlo mejor.', estilo: 'Activo' },
    { numero: 62, texto: 'Rechazo ideas originales y espontáneas si no las veo prácticas.', estilo: 'Pragmático' },
    { numero: 63, texto: 'Me gusta sopesar diversas alternativas antes de tomar una decisión.', estilo: 'Reflexivo' },
    { numero: 64, texto: 'Con frecuencia miro hacia adelante para prever el futuro.', estilo: 'Teórico' },
    { numero: 65, texto: 'En los debates y discusiones prefiero desempeñar un papel secundario antes que ser el/la líder o el/la que más participa.', estilo: 'Reflexivo' },
    { numero: 66, texto: 'Me molestan las personas que no actúan con lógica.', estilo: 'Teórico' },
    { numero: 67, texto: 'Me resulta incómodo tener que planificar y prever las cosas.', estilo: 'Activo' },
    { numero: 68, texto: 'Creo que el fin justifica los medios en muchos casos.', estilo: 'Pragmático' },
    { numero: 69, texto: 'Suelo reflexionar sobre los asuntos y problemas.', estilo: 'Reflexivo' },
    { numero: 70, texto: 'El trabajar a conciencia me llena de satisfacción y orgullo.', estilo: 'Reflexivo' },
    { numero: 71, texto: 'Ante los acontecimientos trato de descubrir los principios y teorías.', estilo: 'Teórico' },
    { numero: 72, texto: 'Con tal de conseguir el objetivo que pretendo soy capaz de herir sentimientos ajenos.', estilo: 'Pragmático' },
    { numero: 73, texto: 'No me importa hacer todo lo necesario para que sea efectivo mi trabajo.', estilo: 'Pragmático' },
    { numero: 74, texto: 'Con frecuencia soy una de las personas que más anima las fiestas.', estilo: 'Activo' },
    { numero: 75, texto: 'Me aburro en seguida con el trabajo metódico y minucioso.', estilo: 'Activo' },
    { numero: 76, texto: 'La gente con frecuencia cree que soy poco sensible a sus sentimientos.', estilo: 'Pragmático' },
    { numero: 77, texto: 'Suelo dejarme llevar por mis intuiciones.', estilo: 'Activo' },
    { numero: 78, texto: 'Si trabajo en grupo procuro que se siga un método y un orden.', estilo: 'Teórico' },
    { numero: 79, texto: 'Con frecuencia me interesa averiguar lo que piensa la gente.', estilo: 'Reflexivo' },
    { numero: 80, texto: 'Esquivo los temas subjetivos y poco claros.', estilo: 'Teórico' }
  ];

  readonly tecnicas: { [key in EstiloAprendizaje]: Tecnica[] } = {
    'Activo': [
      {
        id: 1,
        titulo: 'Lluvia de Ideas (Brainstorming)',
        estilo: 'Activo',
        descripcion: 'Generación rápida y espontánea de ideas sin censura ni juicio.',
        detalles: '<h3>Técnica ideal para aprendices activos</h3><p>Permite la participación inmediata y la experimentación con nuevas ideas...</p>'
      }
    ],
    'Reflexivo': [
      {
        id: 2,
        titulo: 'Diario de Aprendizaje',
        estilo: 'Reflexivo',
        descripcion: 'Registro personal de experiencias, reflexiones y aprendizajes.',
        detalles: '<h3>Técnica ideal para aprendices reflexivos</h3><p>Permite analizar experiencias desde múltiples perspectivas...</p>'
      }
    ],
    'Teórico': [
      {
        id: 3,
        titulo: 'Mapas Conceptuales',
        estilo: 'Teórico',
        descripcion: 'Diagramas que organizan y representan conocimiento de forma estructurada.',
        detalles: '<h3>Técnica ideal para aprendices teóricos</h3><p>Permite establecer relaciones lógicas entre conceptos...</p>'
      }
    ],
    'Pragmático': [
      {
        id: 4,
        titulo: 'Método del Caso',
        estilo: 'Pragmático',
        descripcion: 'Análisis de situaciones reales para aplicar conocimientos prácticos.',
        detalles: '<h3>Técnica ideal para aprendices pragmáticos</h3><p>Permite aplicar teoría a situaciones concretas...</p>'
      },
      {
        id: 5,
        titulo: 'Método X',
        estilo: 'Pragmático',
        descripcion: 'Análisis de situaciones reales para aplicar conocimientos prácticos.',
        detalles: '<h3>Técnica ideal para aprendices pragmáticos</h3><p>Permite aplicar teoría a situaciones concretas...</p>'
      },
    ]
  };

  getPreguntas(): PreguntaHoneyAlonso[] {
    return this.preguntas;
  }

  guardarRespuesta(respuesta: RespuestaHoneyAlonso): void {
    const index = this.respuestas.findIndex(r => r.preguntaNumero === respuesta.preguntaNumero);
    if (index !== -1) {
      this.respuestas[index] = respuesta;
    } else {
      this.respuestas.push(respuesta);
    }
  }

  calcularResultado(): ResultadoHoneyAlonso {
    const puntajes = {
      Activo: 0,
      Reflexivo: 0,
      Teórico: 0,
      Pragmático: 0
    };

    // Contar respuestas de acuerdo (+) por estilo
    this.respuestas.forEach(respuesta => {
      if (respuesta.deAcuerdo) {
        const pregunta = this.preguntas.find(p => p.numero === respuesta.preguntaNumero);
        if (pregunta) {
          puntajes[pregunta.estilo]++;
        }
      }
    });

    // Calcular porcentajes
    const totalPreguntas = 80;
    const porcentajes = {
      Activo: Math.round((puntajes.Activo / 20) * 100),
      Reflexivo: Math.round((puntajes.Reflexivo / 20) * 100),
      Teórico: Math.round((puntajes.Teórico / 20) * 100),
      Pragmático: Math.round((puntajes.Pragmático / 20) * 100)
    };

    // Determinar estilo predominante
    let estiloPredominate: EstiloAprendizaje = 'Activo';
    let maxPuntaje = puntajes.Activo;

    (Object.keys(puntajes) as EstiloAprendizaje[]).forEach(estilo => {
      if (puntajes[estilo] > maxPuntaje) {
        estiloPredominate = estilo;
        maxPuntaje = puntajes[estilo];
      }
    });

    this.resultadoActual = {
      estiloPredominate,
      puntajes,
      porcentajes
    };

    return this.resultadoActual;
  }

  getResultado(): ResultadoHoneyAlonso | null {
    return this.resultadoActual;
  }

  getTecnicasPorEstilo(estilo: EstiloAprendizaje): Tecnica[] {
    return this.tecnicas[estilo];
  }

  reiniciar(): void {
    this.respuestas = [];
    this.resultadoActual = null;
  }
}
