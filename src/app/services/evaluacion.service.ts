// src/app/services/evaluacion.service.ts

import { Injectable } from '@angular/core';
import { Pregunta, Respuesta, ResultadoEvaluacion, Tecnica, TipoAprendizaje } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private respuestas: Respuesta[] = [];
  private resultadoActual: ResultadoEvaluacion | null = null;

  readonly preguntas: Pregunta[] = [
    {
      id: 1,
      texto: '¿Qué tipo de examen realizas con mayor facilidad?',
      opciones: [
        { texto: 'Examen escrito.', tipo: 'Visual' },
        { texto: 'Examen oral.', tipo: 'Auditivo' },
        { texto: 'Examen de opción múltiple.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 2,
      texto: 'Cuando tienes que aprender algo de memoria...',
      opciones: [
        { texto: 'Memorizo lo que veo y recuerdo la imagen (por ejemplo, la página del libro).', tipo: 'Visual' },
        { texto: 'Memorizo mejor si repito lo estudiado rítmicamente y recuerdo paso a paso.', tipo: 'Auditivo' },
        { texto: 'Memorizo a base de pasear y mirar, y recuerdo una idea general mejor que los detalles.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 3,
      texto: 'Cuando estás en clase y el profesor explica algo que está escrito en la pizarra o en tu libro, te es más fácil seguir las explicaciones...',
      opciones: [
        { texto: 'Escuchando al profesor.', tipo: 'Auditivo' },
        { texto: 'Me aburro y espero a que me den algo para hacer.', tipo: 'Kinestésico' },
        { texto: 'Leyendo el libro o la pizarra.', tipo: 'Visual' }
      ]
    },
    {
      id: 4,
      texto: 'Marca la frase con la que te identifiques más.',
      opciones: [
        { texto: 'Prefiero escuchar chistes que leer cómics.', tipo: 'Auditivo' },
        { texto: 'Mis cuadernos están ordenados, me molestan tachones.', tipo: 'Visual' },
        { texto: 'Me gusta tocar las cosas y acercarme a la gente.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 5,
      texto: '¿Cuál de las siguientes actividades disfrutas más?',
      opciones: [
        { texto: 'Ver películas.', tipo: 'Visual' },
        { texto: 'Escuchar música.', tipo: 'Auditivo' },
        { texto: 'Bailar.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 6,
      texto: '¿De qué manera te resulta más fácil aprender algo?',
      opciones: [
        { texto: 'Repitiendo en voz alta.', tipo: 'Auditivo' },
        { texto: 'Escribiéndolo varias veces.', tipo: 'Visual' },
        { texto: 'Relacionándolo con algo divertido.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 7,
      texto: 'Cuando no encuentras las llaves en una bolsa...',
      opciones: [
        { texto: 'Sacudo la bolsa para oír el ruido.', tipo: 'Auditivo' },
        { texto: 'Las busco mirando.', tipo: 'Visual' },
        { texto: 'Las busco con la mano sin mirar.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 8,
      texto: 'Cuando te dan instrucciones...',
      opciones: [
        { texto: 'Me pongo en movimiento antes de que acaben.', tipo: 'Kinestésico' },
        { texto: 'Recuerdo las palabras exactas.', tipo: 'Auditivo' },
        { texto: 'Me cuesta recordar orales, pero no escritas.', tipo: 'Visual' }
      ]
    },
    {
      id: 9,
      texto: '¿Cuál de estos ambientes te atrae más?',
      opciones: [
        { texto: 'Se escuchen las olas del mar.', tipo: 'Auditivo' },
        { texto: 'Hermosa vista al océano.', tipo: 'Visual' },
        { texto: 'Se sienta un clima agradable.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 10,
      texto: 'Si te ofrecieran uno de los siguientes empleos, ¿cuál elegirías?',
      opciones: [
        { texto: 'Director de un club deportivo.', tipo: 'Kinestésico' },
        { texto: 'Locutor de radio.', tipo: 'Auditivo' },
        { texto: 'Editor de una revista.', tipo: 'Visual' }
      ]
    },
    {
      id: 11,
      texto: '¿A qué tipo de evento preferirías asistir?',
      opciones: [
        { texto: 'A un concierto de música.', tipo: 'Auditivo' },
        { texto: 'A una muestra gastronómica.', tipo: 'Kinestésico' },
        { texto: 'A un espectáculo de magia.', tipo: 'Visual' }
      ]
    },
    {
      id: 12,
      texto: 'Si tuvieras mucho dinero ahora mismo, ¿qué harías?',
      opciones: [
        { texto: 'Viajar y conocer el mundo.', tipo: 'Kinestésico' },
        { texto: 'Comprar una casa.', tipo: 'Visual' },
        { texto: 'Adquirir un estudio de grabación.', tipo: 'Auditivo' }
      ]
    },
    {
      id: 13,
      texto: 'En clase lo que más te gusta para aprender es que...',
      opciones: [
        { texto: 'Se organicen actividades y moverse.', tipo: 'Kinestésico' },
        { texto: 'Me den material escrito y con fotos.', tipo: 'Visual' },
        { texto: 'Se organicen debates.', tipo: 'Auditivo' }
      ]
    },
    {
      id: 14,
      texto: 'Principalmente, ¿cómo te consideras?',
      opciones: [
        { texto: 'Sociable.', tipo: 'Auditivo' },
        { texto: 'Atlético.', tipo: 'Kinestésico' },
        { texto: 'Intelectual.', tipo: 'Visual' }
      ]
    },
    {
      id: 15,
      texto: 'Si tuvieras que quedarte en una isla desierta, ¿qué llevarías?',
      opciones: [
        { texto: 'Un radio portátil.', tipo: 'Auditivo' },
        { texto: 'Golosinas y comida enlatada.', tipo: 'Kinestésico' },
        { texto: 'Buenos libros.', tipo: 'Visual' }
      ]
    },
    {
      id: 16,
      texto: '¿Qué cosas te distraen más en clase?',
      opciones: [
        { texto: 'El ruido.', tipo: 'Auditivo' },
        { texto: 'El movimiento.', tipo: 'Kinestésico' },
        { texto: 'Explicaciones largas.', tipo: 'Visual' }
      ]
    },
    {
      id: 17,
      texto: '¿Qué programas de TV prefieres?',
      opciones: [
        { texto: 'Noticias sobre actualidad.', tipo: 'Visual' },
        { texto: 'Programas de entretenimiento.', tipo: 'Kinestésico' },
        { texto: 'Reportajes de descubrimientos.', tipo: 'Auditivo' }
      ]
    },
    {
      id: 18,
      texto: '¿Qué prefieres hacer en tu tarde libre?',
      opciones: [
        { texto: 'Ir al cine.', tipo: 'Visual' },
        { texto: 'Quedarme en casa.', tipo: 'Auditivo' },
        { texto: 'Ir a un concierto.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 19,
      texto: '¿De qué manera te formas una opinión de otras personas?',
      opciones: [
        { texto: 'Por la sinceridad en su voz.', tipo: 'Auditivo' },
        { texto: 'Por la forma de estrechar la mano.', tipo: 'Kinestésico' },
        { texto: 'Por su aspecto.', tipo: 'Visual' }
      ]
    },
    {
      id: 20,
      texto: '¿Cómo prefieres pasar el tiempo con tu mejor amigo/a?',
      opciones: [
        { texto: 'Viendo algo juntos.', tipo: 'Visual' },
        { texto: 'Conversando.', tipo: 'Auditivo' },
        { texto: 'Paseando o haciendo deporte.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 21,
      texto: '¿Cómo definirías tu forma de vestir?',
      opciones: [
        { texto: 'Con gusto y conjuntada.', tipo: 'Visual' },
        { texto: 'Discreta pero correcta.', tipo: 'Auditivo' },
        { texto: 'Informal.', tipo: 'Kinestésico' }
      ]
    },
    {
      id: 22,
      texto: 'Si pudieras elegir, ¿qué preferirías ser?',
      opciones: [
        { texto: 'Un gran músico.', tipo: 'Auditivo' },
        { texto: 'Un gran médico.', tipo: 'Kinestésico' },
        { texto: 'Un gran pintor.', tipo: 'Visual' }
      ]
    },
    {
      id: 23,
      texto: '¿Qué es lo que más te gusta de una habitación?',
      opciones: [
        { texto: 'Que sea confortable.', tipo: 'Kinestésico' },
        { texto: 'Que sea silenciosa.', tipo: 'Auditivo' },
        { texto: 'Que esté limpia y ordenada.', tipo: 'Visual' }
      ]
    },
    {
      id: 24,
      texto: '¿Qué es lo que más te gusta de viajar?',
      opciones: [
        { texto: 'Conocer lugares nuevos.', tipo: 'Visual' },
        { texto: 'Conocer personas y hacer amigos.', tipo: 'Auditivo' },
        { texto: 'Aprender sobre costumbres.', tipo: 'Kinestésico' }
      ]
    }
  ];

  readonly tecnicas: { [key in TipoAprendizaje]: Tecnica[] } = {
    'Visual': [
      {
        id: 1,
        titulo: 'Mapas Mentales',
        tipo: 'Visual',
        descripcion: 'Organiza información de manera visual usando colores, imágenes y conexiones.',
        detalles: 'Los mapas mentales te ayudan a conectar ideas de forma visual. Comienza con un concepto central en el medio de la página y crea ramas con ideas relacionadas. Usa diferentes colores para categorías distintas, añade íconos o dibujos pequeños, y conecta conceptos relacionados con líneas. Esta técnica aprovecha tu capacidad de recordar imágenes y patrones visuales.'
      },
      {
        id: 2,
        titulo: 'Técnica de Cornell',
        tipo: 'Visual',
        descripcion: 'Sistema de toma de notas organizado en columnas para facilitar la revisión.',
        detalles: 'Divide tu página en tres secciones: una columna angosta a la izquierda para palabras clave, una columna ancha a la derecha para notas detalladas, y un espacio al final para resumen. Durante la clase, toma notas en la columna derecha. Después, añade palabras clave en la izquierda y escribe un resumen al final. La organización visual te ayudará a recordar mejor.'
      },
      {
        id: 3,
        titulo: 'Flashcards Visuales',
        tipo: 'Visual',
        descripcion: 'Tarjetas de estudio con imágenes, diagramas y esquemas de colores.',
        detalles: 'Crea tarjetas con información importante, pero hazlas visualmente atractivas. En un lado coloca la pregunta o concepto con un color específico, y en el otro la respuesta con diagramas, dibujos o esquemas. Usa un color diferente para cada tema. Revísalas regularmente y organízalas por categorías visualmente distintas.'
      },
      {
        id: 4,
        titulo: 'Líneas de Tiempo',
        tipo: 'Visual',
        descripcion: 'Representa eventos cronológicamente con elementos visuales distintivos.',
        detalles: 'Para estudiar historia o procesos secuenciales, crea líneas de tiempo coloridas. Usa una línea horizontal o vertical como eje principal y marca los eventos importantes con símbolos, colores e imágenes. Añade ilustraciones pequeñas que representen cada evento. La representación visual del tiempo te ayudará a recordar el orden y la relación entre eventos.'
      }
    ],
    'Auditivo': [
      {
        id: 5,
        titulo: 'Grabaciones de Audio',
        tipo: 'Auditivo',
        descripcion: 'Graba resúmenes hablados de tus notas y escúchalos repetidamente.',
        detalles: 'Lee tus notas en voz alta y grábate. Organiza las grabaciones por tema y escúchalas mientras haces otras actividades como caminar o hacer ejercicio. Explica los conceptos como si le enseñaras a alguien más. Puedes crear diferentes versiones: una detallada para estudio profundo y otra resumida para repaso rápido. El ritmo y entonación te ayudarán a recordar.'
      },
      {
        id: 6,
        titulo: 'Grupos de Estudio',
        tipo: 'Auditivo',
        descripcion: 'Discute y explica conceptos en voz alta con compañeros.',
        detalles: 'Forma grupos pequeños de estudio donde cada persona explique un tema diferente. Haz preguntas, debate ideas y discute conceptos en voz alta. Escuchar diferentes perspectivas y explicaciones verbales fortalecerá tu comprensión. Graba las sesiones para escucharlas después. La discusión activa y el intercambio verbal son ideales para tu estilo de aprendizaje.'
      },
      {
        id: 7,
        titulo: 'Rimas y Canciones',
        tipo: 'Auditivo',
        descripcion: 'Convierte información en rimas, canciones o poemas para memorizar.',
        detalles: 'Transforma datos difíciles de memorizar en rimas, canciones o ritmos. Usa melodías conocidas y cambia la letra por la información que necesitas aprender. Crea acrónimos hablados o palabras que rimen con conceptos clave. El ritmo y la musicalidad harán que la información sea mucho más memorable. Practica recitando en voz alta con ritmo.'
      },
      {
        id: 8,
        titulo: 'Lectura en Voz Alta',
        tipo: 'Auditivo',
        descripcion: 'Lee textos importantes en voz alta con diferentes entonaciones.',
        detalles: 'En lugar de leer en silencio, lee todo el material en voz alta. Varía tu tono, velocidad y énfasis según la importancia del contenido. Haz pausas dramáticas en puntos clave. Lee como si fueras un narrador profesional. Grábate leyendo para escucharlo después. Tu memoria auditiva capturará no solo las palabras, sino también la forma en que las pronunciaste.'
      }
    ],
    'Kinestésico': [
      {
        id: 9,
        titulo: 'Estudio en Movimiento',
        tipo: 'Kinestésico',
        descripcion: 'Estudia mientras caminas, haces ejercicio o realizas movimientos.',
        detalles: 'No te quedes sentado mientras estudias. Camina por la habitación mientras lees tus notas en voz alta. Haz estiramientos entre sesiones de estudio. Asocia movimientos específicos con conceptos diferentes: por ejemplo, levantar el brazo derecho para un tema y el izquierdo para otro. El movimiento físico ayudará a tu cerebro a retener información.'
      },
      {
        id: 10,
        titulo: 'Manipulación de Objetos',
        tipo: 'Kinestésico',
        descripcion: 'Usa objetos físicos, modelos o materiales manipulables para aprender.',
        detalles: 'Crea modelos físicos de conceptos abstractos. Usa bloques, plastilina, o cualquier material que puedas tocar y manipular. Si estudias biología, construye modelos de células; si es matemáticas, usa objetos para representar problemas. Toca y mueve los objetos mientras explicas los conceptos. La experiencia táctil reforzará tu memoria.'
      },
      {
        id: 11,
        titulo: 'Dramatización',
        tipo: 'Kinestésico',
        descripcion: 'Representa físicamente conceptos o eventos históricos actuándolos.',
        detalles: 'Convierte lo que estudias en una representación física. Si estudias historia, actúa los eventos. Si son procesos científicos, representa cada paso con tu cuerpo. Inventa gestos específicos para conceptos importantes. Usa todo tu cuerpo para expresar las ideas. Esta conexión entre movimiento y concepto hará que la información sea inolvidable.'
      },
      {
        id: 12,
        titulo: 'Experimentos Prácticos',
        tipo: 'Kinestésico',
        descripcion: 'Aprende haciendo: realiza experimentos, ejercicios y actividades prácticas.',
        detalles: 'Busca la manera práctica de aplicar lo que estudias. Haz experimentos, resuelve problemas reales, construye proyectos. No solo leas sobre un concepto, practícalo. Si estudias idiomas, conversa; si es programación, escribe código; si es cocina, prepara los platillos. La experiencia directa y práctica es tu mejor herramienta de aprendizaje.'
      }
    ]
  };

  getPreguntas(): Pregunta[] {
    return this.preguntas;
  }

  guardarRespuesta(respuesta: Respuesta): void {
    const index = this.respuestas.findIndex(r => r.preguntaId === respuesta.preguntaId);
    if (index !== -1) {
      this.respuestas[index] = respuesta;
    } else {
      this.respuestas.push(respuesta);
    }
  }

  calcularResultado(): ResultadoEvaluacion {
    const puntajes = {
      Visual: 0,
      Auditivo: 0,
      Kinestésico: 0
    };

    this.respuestas.forEach(respuesta => {
      puntajes[respuesta.tipoSeleccionado]++;
    });

    let tipoPredominate: TipoAprendizaje = 'Visual';
    let maxPuntaje = puntajes.Visual;

    if (puntajes.Auditivo > maxPuntaje) {
      tipoPredominate = 'Auditivo';
      maxPuntaje = puntajes.Auditivo;
    }

    if (puntajes.Kinestésico > maxPuntaje) {
      tipoPredominate = 'Kinestésico';
    }

    this.resultadoActual = {
      tipoPredominate,
      puntajes
    };

    return this.resultadoActual;
  }

  getResultado(): ResultadoEvaluacion | null {
    return this.resultadoActual;
  }

  getTecnicasPorTipo(tipo: TipoAprendizaje): Tecnica[] {
    return this.tecnicas[tipo];
  }

  reiniciar(): void {
    this.respuestas = [];
    this.resultadoActual = null;
  }
}
