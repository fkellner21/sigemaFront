import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Mantenimiento } from '../../../models/mantenimiento';
import { Equipo } from '../../../models/equipo';
import { UnidadMedida } from '../../../models/enum/UnidadMedida';
import { TipoRepuesto } from '../../../models/enum/TipoRepuesto';
import { Repuesto } from '../../../models/Repuesto';
import { modeloService } from '../../../services/modelo.service';

@Component({
    selector: 'mantenimiento-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mantenimiento-form.component.html',
})
export class MantenimientoFormComponent implements OnInit {
    @Input() mantenimiento: Mantenimiento = new Mantenimiento();
    @Input() equipo!: Equipo;

    @Output() newMantenimientoEventEmitter = new EventEmitter<Mantenimiento>();
    @Output() openEventEmitter = new EventEmitter<void>();

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

    constructor(private modeloService: modeloService) {}

    ngOnInit(): void {
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
            this.newMantenimientoEventEmitter.emit(this.mantenimiento);
            form.reset();
            this.onOpen();
        }
    }

    onOpen(): void {
        this.openEventEmitter.emit();
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
            error: (err) => {},
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
