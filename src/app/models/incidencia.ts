export interface Incidencia {
}
export type Prioridad = 'Alta' | 'Media' | 'Baja';
export type Estado = 'Pendiente' | 'En proceso' | 'Resuelta';

export interface Incidencia {
  codigo: string;
  titulo: string;
  prioridad: Prioridad;
  estado: Estado;
  responsable: string;
  fecha: string;
  descripcion: string;
}
