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
    titulo: 'Aprendizaje Basado en la Experimentación Inmediata',
    estilo: 'Activo',
    descripcion: 'Aprender haciendo desde el primer momento, probando y corrigiendo.',
    detalles: `
      <div class="tecnica-imagen">
    <img src="assets/tecnicas/Exp inmediata.jpeg"
         alt="Aprendizaje basado en la experimentación inmediata">
  </div>
      <h3>¿Qué es?</h3>
      <p>
        Para un aprendiz Activo, la mejor forma de aprender es haciendo algo de inmediato,
        sin una preparación excesiva y con interacción directa. La experimentación inmediata
        genera comprensión rápida del tema al exponerse directamente a la experiencia.
      </p>
      <h3>¿Cómo llevarla a cabo?</h3>
      <ul>
        <li>Comienza con una actividad práctica antes de ver toda la teoría.</li>
        <li>Prueba distintos enfoques, aunque no estés seguro/a del correcto.</li>
        <li>Acepta el error como parte del proceso, corrigiendo poco a poco.</li>
        <li>Realiza sesiones cortas de 10–15 minutos para evitar monotonía.</li>
        <li>Al finalizar, escribe en pocas líneas qué funcionó y qué no.</li>
      </ul>
    `
  },
  {
    id: 2,
    titulo: 'Aprendizaje Cooperativo y Dinámicas Grupales',
    estilo: 'Activo',
    descripcion: 'Aprender en equipo mediante actividades prácticas y debate.',
    detalles: `
      <div class="tecnica-imagen">
    <img src="assets/tecnicas/Aprendizaje Coop.jpeg"
         alt="Aprendizaje cooperativo y dinámicas grupales">
  </div>
      <h3>¿Qué es?</h3>
      <p>
        El aprendizaje cooperativo convierte el estudio en una experiencia dinámica,
        permitiendo que varias personas trabajen juntas para resolver problemas
        y construir conocimiento a través de la interacción y la acción.
      </p>
      <h3>¿Cómo llevarla a cabo?</h3>
      <ul>
        <li>Forma grupos pequeños (3–5 personas) para que todos participen.</li>
        <li>Asignen roles rotativos (coordinador, expositor, investigador...).</li>
        <li>Realicen actividades prácticas: maquetas, ejercicios, dramatizaciones.</li>
        <li>Usen debates rápidos y lluvias de ideas para estimular pensamiento.</li>
        <li>Cierre grupal: cada integrante comparte qué aprendió.</li>
      </ul>
    `
  },
  {
    id: 3,
    titulo: 'Simulaciones, Juegos de Rol y Aprendizaje Basado en Retos',
    estilo: 'Activo',
    descripcion: 'Representar situaciones reales para aprender actuando.',
    detalles: `
      <div class="tecnica-imagen">
    <img src="assets/tecnicas/Simulacion.jpeg"
         alt="Simulaciones, juegos de rol y aprendizaje basado en retos">
  </div>
      <h3>¿Qué es?</h3>
      <p>
        Las simulaciones y juegos de rol permiten experimentar situaciones reales
        donde el estudiante activa la toma de decisiones, creatividad y emoción.
      </p>
      <h3>¿Cómo llevarla a cabo?</h3>
      <ul>
        <li>Elige una situación a representar (entrevista, caso técnico, debate...).</li>
        <li>Asigna roles claros a cada participante.</li>
        <li>Define un objetivo concreto o reto a resolver.</li>
        <li>Actúa sin guion estricto, priorizando espontaneidad.</li>
        <li>Reflexiona brevemente al final: ¿Qué funcionó? ¿Qué cambiarías?</li>
      </ul>
    `
  },
],

'Reflexivo': [
  {
    id: 4,
    titulo: 'Observación Analítica y Toma de Notas Detallada',
    estilo: 'Reflexivo',
    descripcion: 'Observar, analizar y registrar información antes de actuar.',
    detalles: `
      <div class="tecnica-imagen">
    <img src="assets/tecnicas/Observacion analitica.jpeg"
         alt="Observación analítica y toma de notas detallada">
  </div>
      <h3>¿Qué es?</h3>
      <p>
        El estilo Reflexivo se caracteriza por analizar con calma y profundidad
        antes de intervenir. Esta técnica fomenta el pensamiento estructurado,
        la observación atenta y la toma de decisiones informadas.
      </p>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Lee o escucha el contenido sin intervenir al inicio.</li>
        <li>Registra datos clave como conceptos, dudas y conexiones.</li>
        <li>Clasifica la información en: ideas principales, detalles, ejemplos.</li>
        <li>Haz pausas reflexivas y cuestiona lo aprendido.</li>
        <li>Contrasta varias fuentes antes de sacar conclusiones.</li>
        <li>Escribe una síntesis personal al finalizar.</li>
      </ol>
    `
  },
  {
    id: 5,
    titulo: 'Diario Reflexivo o Bitácora de Aprendizaje',
    estilo: 'Reflexivo',
    descripcion: 'Registrar pensamientos y aprendizajes para procesarlos mejor.',
    detalles: `
      <div class="tecnica-imagen">
    <img src="assets/tecnicas/Diario.jpeg"
         alt="Diario reflexivo o bitácora de aprendizaje">
  </div>
      <h3>¿Qué es?</h3>
      <p>
        Esta técnica convierte el análisis interno en un registro escrito que permite
        ordenar ideas, evaluar el proceso de aprendizaje y detectar mejoras.
      </p>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Usa un cuaderno o app exclusiva para reflexiones.</li>
        <li>Escribe 5–15 minutos después de cada sesión de estudio.</li>
        <li>Incluye: aprendizajes, dificultades, emociones y conexiones.</li>
        <li>Revisa el diario semanalmente para encontrar patrones y progresos.</li>
        <li>Escribe conclusiones o planes de mejora.</li>
        <li>Úsalo para estudiar antes de exámenes o proyectos.</li>
      </ol>
    `
  },
  {
    id: 6,
    titulo: 'Mapas Comparativos y Análisis de Perspectivas',
    estilo: 'Reflexivo',
    descripcion: 'Comparar conceptos desde diversos ángulos antes de decidir.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Esta técnica ayuda a entender un tema de forma global mediante la comparación
        de ideas y la evaluación de pros, contras y relaciones lógicas.
      </p>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Selecciona dos o más conceptos o teorías para comparar.</li>
        <li>Investiga distintas fuentes antes de analizarlos.</li>
        <li>Construye un cuadro comparativo o una tabla de análisis.</li>
        <li>Evalúa semejanzas, diferencias, ventajas y contextos de aplicación.</li>
        <li>Genera conclusiones basadas en el análisis.</li>
        <li>Incluye ejemplos reales o personales.</li>
        <li>Úsalo luego como herramienta clara de estudio.</li>
      </ol>
    `
  }
],
  'Teórico': [
  {
    id: 7,
    titulo: 'Construcción de Mapas Conceptuales Lógicos',
    estilo: 'Teórico',
    descripcion: 'Organizar información en esquemas jerárquicos y conectados.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Es una técnica que organiza la información mostrando cómo los conceptos se
        conectan lógicamente. Convierte datos dispersos en un sistema coherente.
      </p>

      <h3>¿Por qué funciona?</h3>
      <ul>
        <li>Muestra la estructura interna del contenido.</li>
        <li>Ayuda a comprender ideas complejas por partes (nodos).</li>
        <li>Refuerza el razonamiento inductivo y deductivo.</li>
      </ul>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Identifica el concepto principal del tema.</li>
        <li>Desglosa subtemas: principios, teorías, variables.</li>
        <li>Conecta nodos con relaciones lógicas (causa, consecuencia, composición).</li>
        <li>Verifica coherencia: jerarquía correcta, sin vacíos.</li>
        <li>Perfecciona el mapa hasta que sea claro y ordenado.</li>
      </ol>
    `
  },
  {
    id: 8,
    titulo: 'Lectura Analítica y Comparativa',
    estilo: 'Teórico',
    descripcion: 'Comparar fuentes para obtener una conclusión sólida y fundamentada.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Leer varias fuentes sobre el mismo tema y analizar diferencias, enfoques
        y fundamentos, desarrollando pensamiento crítico y estructurado.
      </p>

      <h3>¿Por qué funciona?</h3>
      <ul>
        <li>Permite contrastar modelos teóricos.</li>
        <li>Aumenta la profundidad conceptual del tema.</li>
        <li>Fortalece el análisis racional y crítico.</li>
      </ul>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Selecciona 2–4 fuentes confiables.</li>
        <li>Subraya definiciones, causas y argumentos clave.</li>
        <li>Haz una tabla comparativa (similitudes/diferencias).</li>
        <li>Analiza: ¿qué modelo es más lógico y completo?</li>
        <li>Redacta una conclusión teórica propia.</li>
      </ol>
    `
  },
  {
    id: 9,
    titulo: 'Modelización: Crear Modelos o Esquemas Teóricos',
    estilo: 'Teórico',
    descripcion: 'Diseñar un sistema que explique cómo funciona un fenómeno.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Crear representaciones conceptuales como diagramas, ciclos, ecuaciones
        o teorías simplificadas para explicar un proceso.
      </p>

      <h3>¿Por qué funciona?</h3>
      <ul>
        <li>Estimula el análisis estructural del conocimiento.</li>
        <li>Permite reorganizar la información de forma lógica.</li>
        <li>Ayuda a entender causas, efectos y relaciones clave.</li>
      </ul>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Estudia profundamente el tema.</li>
        <li>Identifica variables y relaciones entre ellas.</li>
        <li>Busca patrones y causas comunes.</li>
        <li>Diseña tu modelo (diagrama, ciclo, ecuación, flujo).</li>
        <li>Justifícalo: ¿por qué se relacionan esos conceptos?</li>
        <li>Compáralo con teorías existentes para validarlo.</li>
      </ol>
    `
  }
],

  'Pragmático': [
  {
    id: 10,
    titulo: 'Aprendizaje Basado en Casos (Case-Based Learning)',
    estilo: 'Pragmático',
    descripcion: 'Resolver problemas reales aplicando teoría a la práctica.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Es una técnica donde se analizan casos reales o simulados para aplicar
        conocimientos prácticos y desarrollar pensamiento estratégico.
      </p>

      <h3>¿Por qué funciona?</h3>
      <ul>
        <li>Muestra de forma directa cómo se usa la información.</li>
        <li>Desarrolla habilidades de toma de decisiones.</li>
        <li>Se enfoca en soluciones aplicables, no abstractas.</li>
      </ul>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Selecciona un caso real o verosímil relacionado con tu tema.</li>
        <li>Identifica el problema principal y los datos disponibles.</li>
        <li>Relaciona teoría con práctica para justificar tus decisiones.</li>
        <li>Propón soluciones concretas: pasos, herramientas, acciones.</li>
        <li>Evalúa si la solución funcionaría y qué mejorarías.</li>
      </ol>
    `
  },
  {
    id: 11,
    titulo: 'Aprendizaje Basado en Proyectos (ABP)',
    estilo: 'Pragmático',
    descripcion: 'Crear proyectos reales aplicando lo aprendido.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Consiste en resolver un reto real mediante la creación de un proyecto:
        planear, diseñar, ejecutar y presentar un producto funcional.
      </p>

      <h3>¿Por qué funciona?</h3>
      <ul>
        <li>Uso real de herramientas y conocimientos.</li>
        <li>Aprender haciendo: construir, probar, corregir.</li>
        <li>El progreso es tangible y mantiene motivación.</li>
      </ul>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Define un reto realista (web, prototipo, plan, etc.).</li>
        <li>Planifica requisitos, investigación, diseño y pruebas.</li>
        <li>Usa herramientas del mundo real (GitHub, Excel, Arduino...).</li>
        <li>Documenta decisiones y justifícalas.</li>
        <li>Evalúa el producto final: utilidad, mejoras y aprendizajes.</li>
      </ol>
    `
  },
  {
    id: 12,
    titulo: 'Experimentación Directa con Ensayo y Error Controlado',
    estilo: 'Pragmático',
    descripcion: 'Aprender probando, corrigiendo y optimizando iteraciones.',
    detalles: `
      <h3>¿Qué es?</h3>
      <p>
        Esta técnica se basa en aprender manipulando, probando y ajustando
        soluciones según resultados reales y errores constructivos.
      </p>

      <h3>¿Por qué funciona?</h3>
      <ul>
        <li>Permite validar ideas rápidamente.</li>
        <li>Aprendizaje sin teorizar demasiado al inicio.</li>
        <li>Los errores aclaran mejor el funcionamiento y la mejora.</li>
      </ul>

      <h3>¿Cómo llevarla a cabo?</h3>
      <ol>
        <li>Elige una herramienta o proceso concreto para dominar.</li>
        <li>Plantea un objetivo funcional simple (ej: login básico).</li>
        <li>Prueba directamente sin conocerlo todo primero.</li>
        <li>Registra errores, causas y cómo los solucionaste.</li>
        <li>Refina hasta lograr estabilidad en la solución.</li>
        <li>Documenta pasos en una mini guía personal.</li>
      </ol>
    `
  }
],



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
