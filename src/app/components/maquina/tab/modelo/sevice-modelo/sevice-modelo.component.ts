import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RepuestoMantenimiento } from '../../../../../models/RepuestoMantenimiento';
import { TipoRepuesto } from '../../../../../models/enum/TipoRepuesto';
import { Repuesto } from '../../../../../models/Repuesto';
import { modeloService } from '../../../../../services/modelo.service';
import { modeloEquipo } from '../../../../../models/modeloEquipo';
import Swal from 'sweetalert2';

@Component({
  selector: 'sevice-modelo',
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './sevice-modelo.component.html',
  styleUrl: './sevice-modelo.component.css'
})
export class SeviceModeloComponent implements OnInit{
  @Input() modeloEquipo!:modeloEquipo;
  @Output() cerrarFormulario = new EventEmitter<void>();

  displayedRepuestoColumns: string[] = ['repuesto', 'cantidad', 'acciones'];
  dataSourceRepuestos = new MatTableDataSource<RepuestoMantenimiento>();
  tiposRepuesto = [
        { label: 'Pieza', value: TipoRepuesto.Pieza },
        { label: 'Lubricante', value: TipoRepuesto.Lubricante },
    ];

    tipoRepuestoSeleccionado: TipoRepuesto = TipoRepuesto.Pieza;
    TipoRepuesto = TipoRepuesto;
    repuestos: Repuesto[] = [];
    repuestoSeleccionado: RepuestoMantenimiento = new RepuestoMantenimiento();

    constructor(
        private modeloService: modeloService,
    ) {}

  ngOnInit(): void {
    if (this.modeloEquipo?.id) {
      this.obtenerRepuestosDelEquipo(this.tipoRepuestoSeleccionado);
      }
    this.dataSourceRepuestos.data = this.modeloEquipo.serviceModelo?.repuestosMantenimiento || [];
  }
    
  obtenerRepuestosDelEquipo(tipo: TipoRepuesto): void {
    this.repuestoSeleccionado=new RepuestoMantenimiento()
    const idModelo = this.modeloEquipo.id;
    this.modeloService.cargarRepuestos(idModelo, tipo).subscribe({
    next: (data) => {
      this.repuestos = [...data];
      },
      error: (err) => {
        console.error('Error al cargar repuestos:', err);
      },
    });
  }

  onRemoveRepuesto(index: number) {
        if (this.modeloEquipo.serviceModelo.repuestosMantenimiento) {
            this.modeloEquipo.serviceModelo.repuestosMantenimiento.splice(index, 1);
            this.dataSourceRepuestos.data =
                this.modeloEquipo.serviceModelo.repuestosMantenimiento;
        }
  }

  onAddRepuesto() {
    console.log(this.repuestoSeleccionado)
          if (
              this.repuestoSeleccionado.idRepuesto &&
              this.repuestoSeleccionado.cantidadUsada > 0
          ) {
              const repuesto = this.repuestos.find(
                  (r) => r.id == this.repuestoSeleccionado.idRepuesto
              );
  
              if (!repuesto) {
                  Swal.fire(
                      'Error',
                      'El repuesto seleccionado no existe en la lista',
                      'error'
                  );
                  return;
              }
  
              const repuestoMantenimiento = new RepuestoMantenimiento();
              repuestoMantenimiento.idRepuesto =
                  this.repuestoSeleccionado.idRepuesto;
              repuestoMantenimiento.cantidadUsada =
                  this.repuestoSeleccionado.cantidadUsada;
              repuestoMantenimiento.repuesto = repuesto;
  
              if (!this.modeloEquipo.serviceModelo.repuestosMantenimiento) {
                  this.modeloEquipo.serviceModelo.repuestosMantenimiento = [];
              }
  
              this.modeloEquipo.serviceModelo.repuestosMantenimiento.push(
                  repuestoMantenimiento
              );
  
              this.dataSourceRepuestos.data =
                  this.modeloEquipo.serviceModelo.repuestosMantenimiento;
              this.repuestoSeleccionado = new RepuestoMantenimiento();
          } else {
              Swal.fire(
                  'Error',
                  'Debe seleccionar un repuesto y una cantidad válida',
                  'error'
              );
          }
  }

  onTipoRepuestoChange() {
    if (this.tipoRepuestoSeleccionado != null) {
          this.obtenerRepuestosDelEquipo(
              this.tipoRepuestoSeleccionado
            );
        }
  }

  compareRpuestos(r1: Repuesto, r2: Repuesto): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  onSubmit(form: NgForm) {
  if (form.valid) {
    this.modeloService.edit(this.modeloEquipo.id, this.modeloEquipo)
      .subscribe({
        next: () => {
          Swal.fire(
            'Éxito',
            'Service actualizado correctamente',
            'success'
          );
        //this.mantenimientoAgregado.emit();
        this.cerrarFormulario.emit();
        form.resetForm();
          },
        error: (e) => {
          Swal.fire(
            'Error',
            'No se pudo actualizar el service. '+e.error,
            'error'
            );
          },
      });
    }
  }

  onOpen() {
    this.cerrarFormulario.emit();
  }

}
