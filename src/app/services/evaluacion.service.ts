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
        descripcion: 'Diagrama visual que organiza pensamientos partiendo de una idea central con ramas radiantes.',
        detalles: `<h3>¿Qué es un Mapa Mental?</h3>
<p>Un mapa mental es un diagrama visual diseñado para organizar pensamientos e ideas. Funciona partiendo de un único concepto o idea central, desde el cual se "irradian" ramas con ideas y subtemas relacionados.</p>

<h4>Características clave:</h4>
<ul>
<li><strong>Estructura Radial:</strong> A diferencia de las notas tradicionales que van de arriba hacia abajo, un mapa mental fluye desde el centro hacia afuera en todas las direcciones.</li>
<li><strong>Jerarquía Visual:</strong> Muestra claramente la relación entre una idea principal (en el centro) y las ideas secundarias y terciarias (en las ramas).</li>
<li><strong>Uso de Palabras Clave:</strong> Se enfoca en usar palabras clave o frases muy cortas en lugar de oraciones largas, lo que obliga a la concisión y facilita la memorización.</li>
<li><strong>Herramienta Creativa:</strong> Fomenta la "lluvia de ideas" (brainstorming) y el pensamiento asociativo, ya que permite conectar ideas libremente sin las restricciones de un esquema rígido.</li>
</ul>

<p>Los mapas mentales son útiles para una variedad de propósitos, como la toma de notas, la planificación de proyectos, la resolución de problemas y la preparación de presentaciones, ya que ayudan a simplificar y comunicar información compleja.</p>

<div class="tecnica-imagen">
<img src="assets/mapa_mental.jpg" alt="Ejemplo de Mapa Mental">
</div>

<h3>¿Cómo Crear un Mapa Mental? (Paso a Paso)</h3>
<ol>
<li><strong>Empezar con la Idea Central:</strong> Identifica el concepto principal o tema central que quieres explorar. Escríbelo (o dibújalo) justo en el centro de tu página o lienzo digital. Enciérralo en un círculo para destacarlo como el punto de partida.</li>

<li><strong>Añadir las Ramas Principales (Subtemas):</strong> A partir de la idea central, dibuja varias líneas o "ramas" que irradien hacia afuera. Cada una representa un subtema o categoría clave directamente relacionada con tu concepto central. Escribe una palabra clave o frase corta sobre cada rama.</li>

<li><strong>Expandir con Ramas Secundarias (Detalles):</strong> De tus ramas principales, añade ramas más pequeñas (secundarias) para desglosar la información. Estas ramas contienen detalles más específicos.</li>

<li><strong>Usar Elementos Visuales (Colores e Imágenes):</strong> Usa diferentes colores para distintas ramas principales (por ejemplo, todo lo relacionado con "Marketing" en azul, todo lo de "Desarrollo" en verde). Esto ayuda al cerebro a agrupar y diferenciar la información visualmente. También añade íconos o imágenes pequeñas junto a las palabras clave para reforzar el significado.</li>

<li><strong>Iterar y Reorganizar:</strong> La ventaja del mapa mental es que no es estático. Puedes mover las ramas, reorganizar las ideas y añadir nueva información fácilmente a medida que surgen nuevas conexiones.</li>
</ol>`
      },
      {
        id: 2,
        titulo: 'Flashcards Visuales',
        tipo: 'Visual',
        descripcion: 'Tarjetas de memoria con imágenes y colores para la memorización activa.',
        detalles: `<h3>¿Qué son las Flashcards (Tarjetas de Memoria)?</h3>
<p>Las flashcards, o tarjetas de memoria, son una herramienta de estudio diseñada para la memorización activa. Este método consiste en obligar al cerebro a recordar activamente una información, en lugar de simplemente reconocerla leyéndola.</p>

<p>Su formato es simple y se basa en dos caras, ya sea en tarjetas físicas (papel) o en un formato digital:</p>
<ul>
<li><strong>Lado Anverso (Frontal):</strong> Presenta una pista, que puede ser una pregunta, un término o un concepto (ej. "¿Capital de Francia?").</li>
<li><strong>Lado Reverso (Trasero):</strong> Contiene la respuesta o la definición (ej. "París").</li>
</ul>

<p>El componente "visual" de las flashcards modernas se refiere al enriquecimiento de estas tarjetas con elementos gráficos (no solo texto), lo cual es fundamental ya que el cerebro tiende a recordar mejor la información cuando está asociada a una imagen.</p>

<div class="tecnica-imagen">
<img src="assets/flashcard.jpg" alt="Ejemplo de Flashcards Visuales">
</div>

<h3>Cómo Crear Flashcards Visuales Efectivas</h3>

<h4>1. Organiza tus Tarjetas</h4>
<p>Antes de empezar, es crucial tener un sistema. La mejor manera es crear "mazos" (o grupos) separados para cada materia, tema o capítulo. Por ejemplo:</p>
<ul>
<li>Un mazo para "Anatomía - Huesos del Cráneo"</li>
<li>Un mazo para "Química - Tabla Periódica"</li>
<li>Un mazo para "Vocabulario de Inglés - Verbos"</li>
</ul>
<p>Esto evita que se mezcle la información y te permite estudiar temas específicos.</p>

<h4>2. Sigue la Regla de Oro: "Mantenlo Simple"</h4>
<p>Este es el paso más importante al añadir texto. La eficacia de una flashcard se pierde si está sobrecargada de información.</p>
<ul>
<li><strong>Una idea por tarjeta:</strong> Cada flashcard debe contener solo un dato o un concepto a la vez.</li>
<li><strong>Divide los conceptos complejos:</strong> Si intentas memorizar una definición larga o un proceso de varios pasos, divide esa información en múltiples tarjetas más pequeñas y simples.</li>
<li><strong>Entiende antes de memorizar:</strong> Asegúrate de comprender el concepto general antes de crear la tarjeta. Si no lo entiendes, solo estarás memorizando palabras sin contexto, lo cual es inútil.</li>
</ul>

<h4>3. Añade el Componente Visual (Clave para la Memoria)</h4>
<p>Aquí es donde la flashcard cobra realmente poder. El componente visual ayuda a crear una "segunda pista" para el cerebro, haciendo que la información sea mucho más memorable.</p>
<p>Hay varias formas de añadir elementos visuales:</p>
<ul>
<li><strong>Añadir imágenes:</strong> Busca y añade imágenes relevantes. Si estás estudiando anatomía, añade una foto del hueso. Si estudias vocabulario, añade una foto que represente la palabra.</li>
<li><strong>Usar capturas de pantalla:</strong> Esta técnica es extremadamente útil para material que ya es visual. Puedes tomar capturas de pantalla de gráficos, tablas, o diagramas de tus libros de texto o presentaciones.</li>
<li><strong>Dibujar tus propias ilustraciones:</strong> Si usas tarjetas digitales (o físicas), dibujar tus propios diagramas, esquemas o íconos simples es una forma muy poderosa de procesar la información, combinando el aprendizaje visual con el kinestésico.</li>
</ul>`
      },
      {
        id: 3,
        titulo: 'Método Cornell',
        tipo: 'Visual',
        descripcion: 'Sistema estructurado de toma de notas dividido en columnas para estudio activo.',
        detalles: `<h3>¿Qué es el Método Cornell?</h3>
<p>El Método Cornell es un sistema para tomar y organizar apuntes de forma activa. Fue creado en la década de 1940 por Walter Pauk, un profesor de la Universidad de Cornell, con el objetivo de ayudar a los estudiantes a procesar y retener la información de manera más eficiente.</p>

<p>Su principal característica es la estructura visual de la página, que no solo sirve para registrar información, sino que también obliga al estudiante a sintetizar ideas, identificar conceptos clave y repasar activamente el material. Es un método que transforma la toma de apuntes de una tarea pasiva a un proceso de aprendizaje activo.</p>

<div class="tecnica-imagen">
<img src="assets/cornell.jpg" alt="Estructura del Método Cornell">
</div>

<h3>Cómo Aplicar el Método Cornell</h3>

<h4>1. La Estructura de la Página</h4>
<ol>
<li><strong>Sección de Título (Parte Superior):</strong> Se traza una línea horizontal en la parte superior de la hoja. Este espacio se usa para identificar la materia, el tema de la clase y la fecha.</li>

<li><strong>Columna de Pistas (Izquierda):</strong> Se traza una línea vertical a unos 6 cm del borde izquierdo, creando una columna estrecha. Esta columna se deja en blanco durante la clase.</li>

<li><strong>Columna de Apuntes (Derecha):</strong> Es el área principal y más grande de la página, a la derecha de la línea vertical. Aquí es donde se toman los apuntes durante la clase o la lectura.</li>

<li><strong>Sección de Resumen (Parte Inferior):</strong> Se traza una línea horizontal a unos 5 cm del final de la hoja, creando un "pie de página". Esta sección también se deja en blanco durante la clase.</li>
</ol>

<h4>2. El Proceso (Las 6 R)</h4>
<p>El verdadero poder del método no está solo en el formato, sino en el proceso de 6 pasos que se aplica a esa estructura:</p>

<ol>
<li><strong>Registrar:</strong> Durante la clase, toma tus apuntes en la columna de la derecha (Columna de Apuntes). Intenta capturar las ideas principales, usando frases cortas, abreviaturas, símbolos, listas o pequeños esquemas.</li>

<li><strong>Reducir (o Resumir):</strong> Poco después de la clase (el mismo día), revisa tus apuntes de la derecha. En la columna de la izquierda (Columna de Pistas), escribe las ideas clave, palabras clave, preguntas, o conceptos principales que resumen los apuntes de al lado.</li>

<li><strong>Recitar:</strong> Este es un paso de estudio activo. Tapa la columna derecha (la de los apuntes) y, mirando solo las pistas de la columna izquierda, intenta explicar el concepto con tus propias palabras. Responde a las preguntas que formulaste. Esto revela lo que realmente has entendido y lo que necesitas repasar.</li>

<li><strong>Reflexionar:</strong> Piensa en la información. Pregúntate cómo se conecta esto con lo que ya sabías, por qué es importante, o cómo se aplica. Añade estas reflexiones en la columna de pistas.</li>

<li><strong>Recapitular (o Resumir):</strong> En la sección inferior (Sección de Resumen), escribe una o dos frases que sinteticen el contenido de toda la página. Hacer esto te fuerza a identificar la idea global del material.</li>

<li><strong>Repasar:</strong> Realiza repasos breves y frecuentes (ej. 10 minutos cada día). Lee tus columnas de pistas y tus resúmenes para refrescar la memoria rápidamente. Gracias a este método, no necesitas releer todos tus apuntes, solo las ideas clave.</li>
</ol>`
      }
    ],
    'Auditivo': [
      {
        id: 4,
        titulo: 'Tecnica X',
        tipo: 'Auditivo',
        descripcion: 'wefgrthtgfbdfsdafsgfhnfgbdfvsdsfdg',
        detalles: 'lorewefrefcdfvfbgfbgfbdfbxfbcbvcbgfbdfxcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      },
      {
        id: 5,
        titulo: 'Tecnica X',
        tipo: 'Auditivo',
        descripcion: 'wefgrthtgfbdfsdafsgfhnfgbdfvsdsfdg',
        detalles: 'lorewefrefcdfvfbgfbgfbdfbxfbcbvcbgfbdfxcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      },
      {
        id: 6,
        titulo: 'Tecnica X',
        tipo: 'Auditivo',
        descripcion: 'wefgrthtgfbdfsdafsgfhnfgbdfvsdsfdg',
        detalles: 'lorewefrefcdfvfbgfbgfbdfbxfbcbvcbgfbdfxcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      },
      {
        id: 7,
        titulo: 'Tecnica X',
        tipo: 'Auditivo',
        descripcion: 'wefgrthtgfbdfsdafsgfhnfgbdfvsdsfdg',
        detalles: 'lorewefrefcdfvfbgfbgfbdfbxfbcbvcbgfbdfxcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      }
    ],
    'Kinestésico': [
      {
        id: 8,
        titulo: 'Tecnica X',
        tipo: 'Kinestésico',
        descripcion: 'wefgrthtgfbdfsdafsgfhnfgbdfvsdsfdg',
        detalles: 'lorewefrefcdfvfbgfbgfbdfbxfbcbvcbgfbdfxcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      },
      {
        id: 9,
        titulo: 'Tecnica X',
        tipo: 'Kinestésico',
        descripcion: 'Usa objetos físicos, modelos o materiales manipulables para aprender.',
        detalles: 'lorewefrefcdfvfbgfbgfbdfbxfbcbvcbgfbdfxcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
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
