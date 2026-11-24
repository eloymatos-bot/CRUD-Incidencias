import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Incidencia } from './models/incidencia';
import { IncidenciasService } from './services/incidencias.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  incidencias: Incidencia[] = [];
  incidenciaEditada: Incidencia = this.nuevaIncidencia();
  modalAbierto = false;
  modoEdicion = false;
  incidenciaAEliminar: Incidencia | null = null;

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit(): void {
    this.incidencias = this.incidenciasService.getIncidencias();
  }

  nuevaIncidencia(): Incidencia {
    return {
      codigo: '',
      titulo: '',
      prioridad: 'Media',
      estado: 'Pendiente',
      responsable: '',
      fecha: new Date().toLocaleDateString('es-PE'),
      descripcion: ''
    };
  }

  abrirNueva(): void {
    this.modoEdicion = false;
    const siguienteNumero = this.incidencias.length + 1;
    this.incidenciaEditada = this.nuevaIncidencia();
    this.incidenciaEditada.codigo = `INC-${String(siguienteNumero).padStart(3, '0')}`;
    this.modalAbierto = true;
  }

  editar(incidencia: Incidencia): void {
    this.modoEdicion = true;
    this.incidenciaEditada = { ...incidencia };
    this.modalAbierto = true;
  }

  guardar(): void {
    if (!this.incidenciaEditada.codigo.trim() || !this.incidenciaEditada.titulo.trim()) {
      return;
    }

    if (this.modoEdicion) {
      this.incidencias = this.incidencias.map((incidencia) =>
        incidencia.codigo === this.incidenciaEditada.codigo
          ? { ...this.incidenciaEditada }
          : incidencia
      );
    } else {
      this.incidencias = [this.incidenciaEditada, ...this.incidencias];
    }

    this.incidenciasService.saveIncidencias(this.incidencias);
    this.cerrarModal();
  }

  confirmarEliminar(incidencia: Incidencia): void {
    this.incidenciaAEliminar = incidencia;
  }

  eliminar(): void {
    if (!this.incidenciaAEliminar) {
      return;
    }
    this.incidencias = this.incidencias.filter(
      (incidencia) => incidencia.codigo !== this.incidenciaAEliminar?.codigo
    );
    this.incidenciasService.saveIncidencias(this.incidencias);
    this.incidenciaAEliminar = null;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  contarEstado(estado: 'Pendiente' | 'En proceso' | 'Resuelta'): number {
    return this.incidencias.filter((incidencia) => incidencia.estado === estado).length;
  }
}
