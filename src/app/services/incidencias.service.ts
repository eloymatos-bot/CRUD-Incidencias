import { Injectable } from '@angular/core';
import { Incidencia } from '../models/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private readonly storageKey = 'gestion-incidencias';

  private readonly iniciales: Incidencia[] = [
    {
      codigo: 'INC-001',
      titulo: 'Falla en el servidor',
      prioridad: 'Alta',
      estado: 'Pendiente',
      responsable: 'Carlos Gómez',
      fecha: '22/11/2026',
      descripcion: 'El servidor principal presenta interrupciones.'
    },
    {
      codigo: 'INC-002',
      titulo: 'Error en la base de datos',
      prioridad: 'Media',
      estado: 'En proceso',
      responsable: 'Lucía Torres',
      fecha: '22/11/2026',
      descripcion: 'Se presentan errores al consultar determinados registros.'
    },
    {
      codigo: 'INC-003',
      titulo: 'Actualización de sistema',
      prioridad: 'Baja',
      estado: 'Resuelta',
      responsable: 'Pedro Rojas',
      fecha: '22/11/2026',
      descripcion: 'Se completó la actualización y las pruebas correspondientes.'
    }
  ];

  getIncidencias(): Incidencia[] {
    const guardadas = localStorage.getItem(this.storageKey);
    if (!guardadas) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.iniciales));
      return [...this.iniciales];
    }
    return JSON.parse(guardadas) as Incidencia[];
  }

  saveIncidencias(incidencias: Incidencia[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(incidencias));
  }

  constructor() { }
}
