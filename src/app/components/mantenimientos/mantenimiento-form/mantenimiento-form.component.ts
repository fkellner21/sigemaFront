import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Mantenimiento } from '../../../models/mantenimiento';
import { Equipo } from '../../../models/equipo';
import { UnidadMedida } from '../../../models/enum/UnidadMedida';
import { TipoRepuesto } from '../../../models/enum/TipoRepuesto';
import { Repuesto } from '../../../models/Repuesto';
import { modeloService } from '../../../services/modelo.service';
import { MantenimientoService } from '../../../services/mantenimiento.service'; // AGREGAR
import Swal from 'sweetalert2'; // AGREGAR

@Component({
    selector: 'mantenimiento-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mantenimiento-form.component.html',
})
export class MantenimientoFormComponent implements OnInit {
    @Input() mantenimiento: Mantenimiento = new Mantenimiento();
    @Input() equipo!: Equipo;

    // CAMBIAR LOS NOMBRES DE LOS OUTPUTS PARA COINCIDIR CON EL HTML
    @Output() cerrarFormulario = new EventEmitter<void>();
    @Output() mantenimientoAgregado = new EventEmitter<void>();

    unidadesDeMedida = [
        { label: 'Kilómetros', value: UnidadMedida.KMs },
        { label: 'Horas de trabajo', value: UnidadMedida.HT },
    ];

    tiposRepuesto = [
        { label: 'Pieza', value: TipoRepuesto.Pieza },
        { label: 'Lubricante', value: TipoRepuesto.Lubricante },
    ];

    tipoRepuestoSeleccionado: TipoRepuesto = TipoRepuesto.Pieza;
    TipoRepuesto = TipoRepuesto;
    repuestos: Repuesto[] = [];

    constructor(
        private modeloService: modeloService,
        private mantenimientoService: MantenimientoService 
    ) {}

    ngOnInit(): void {
        console.log('MantenimientoFormComponent initialized with:', { 
            mantenimiento: this.mantenimiento, 
            equipo: this.equipo 
        }); // DEBUG
        
        if (
            typeof this.mantenimiento.unidadMedida === 'string' &&
            Object.values(UnidadMedida).includes(
                this.mantenimiento.unidadMedida
            )
        ) {
            this.mantenimiento.unidadMedida = this.mantenimiento
                .unidadMedida as UnidadMedida;
        }

        if (this.equipo?.modeloEquipo?.id) {
            this.obtenerRepuestosDelEquipo(
                this.equipo,
                this.tipoRepuestoSeleccionado
            );
        }
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            console.log('Enviando mantenimiento:', this.mantenimiento); 
            
            // AGREGAR LÓGICA PARA GUARDAR EL MANTENIMIENTO
            if (this.mantenimiento.id && this.mantenimiento.id > 0) {
                // Editar
                this.mantenimientoService.edit(this.mantenimiento.id, this.mantenimiento).subscribe({
                    next: () => {
                        console.log('Mantenimiento editado exitosamente');
                        Swal.fire('Éxito', 'Mantenimiento actualizado correctamente', 'success');
                        this.mantenimientoAgregado.emit();
                        form.reset();
                    },
                    error: (error) => {
                        console.error('Error al editar mantenimiento:', error);
                        Swal.fire('Error', 'No se pudo actualizar el mantenimiento', 'error');
                    }
                });
            } else {
                // Agregar nuevo
                this.mantenimientoService.addNew(this.mantenimiento).subscribe({
                    next: () => {
                        console.log('Mantenimiento agregado exitosamente');
                        Swal.fire('Éxito', 'Mantenimiento agregado correctamente', 'success');
                        this.mantenimientoAgregado.emit();
                        form.reset();
                    },
                    error: (error) => {
                        console.error('Error al agregar mantenimiento:', error);
                        Swal.fire('Error', 'No se pudo agregar el mantenimiento', 'error');
                    }
                });
            }
        }
    }

    onOpen(): void {
        this.cerrarFormulario.emit();
    }

    onUnidadMedidaChange(): void {
        this.mantenimiento.cantidadUnidadMedida = 0;
    }

    obtenerRepuestosDelEquipo(equipo: Equipo, tipo: TipoRepuesto): void {
        const idModelo = equipo.modeloEquipo.id;
        this.modeloService.cargarRepuestos(idModelo, tipo).subscribe({
            next: (data) => {
                this.repuestos = data;
            },
            error: (err) => {
                console.error('Error al cargar repuestos:', err);
            },
        });
    }

    onTipoRepuestoChange(): void {
        if (this.equipo?.modeloEquipo?.id) {
            this.obtenerRepuestosDelEquipo(
                this.equipo,
                this.tipoRepuestoSeleccionado
            );
        }
    }
}