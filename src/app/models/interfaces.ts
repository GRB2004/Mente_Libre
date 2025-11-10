// src/app/models/interfaces.ts

export interface Pregunta {
  id: number;
  texto: string;
  opciones: Opcion[];
}

export interface Opcion {
  texto: string;
  tipo: TipoAprendizaje;
}

export type TipoAprendizaje = 'Visual' | 'Auditivo' | 'Kinestésico';

export interface Respuesta {
  preguntaId: number;
  tipoSeleccionado: TipoAprendizaje;
}

export interface ResultadoEvaluacion {
  tipoPredominate: TipoAprendizaje;
  puntajes: {
    Visual: number;
    Auditivo: number;
    Kinestésico: number;
  };
}

export interface Tecnica {
  id: number;
  titulo: string;
  descripcion: string;
  detalles: string;
  tipo: TipoAprendizaje;
}
