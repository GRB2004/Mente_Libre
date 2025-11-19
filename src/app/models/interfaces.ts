// src/app/models/interfaces.ts

export type EstiloAprendizaje = 'Activo' | 'Reflexivo' | 'Teórico' | 'Pragmático';

export interface PreguntaHoneyAlonso {
  numero: number;
  texto: string;
  estilo: EstiloAprendizaje;
}

export interface RespuestaHoneyAlonso {
  preguntaNumero: number;
  deAcuerdo: boolean; // true = más de acuerdo (+), false = más en desacuerdo (-)
}

export interface ResultadoHoneyAlonso {
  estiloPredominate: EstiloAprendizaje;
  puntajes: {
    Activo: number;
    Reflexivo: number;
    Teórico: number;
    Pragmático: number;
  };
  porcentajes: {
    Activo: number;
    Reflexivo: number;
    Teórico: number;
    Pragmático: number;
  };
}

export interface Tecnica {
  id: number;
  titulo: string;
  estilo: EstiloAprendizaje;
  descripcion: string;
  detalles: string;
}
