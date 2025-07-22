import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';
import { Equipo } from '../../models/equipo';

@Component({
    selector: 'app-mantenimientos',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './mantenimiento.component.html',
    styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientosComponent implements OnInit {
    displayedColumns: string[] = ['fecha', 'vehiculo', 'detalle', 'acciones'];
    dataSource: any[] = [];
    isLoading: boolean = false;
    
    // Filtros de fecha
    fechaDesde: Date | null = null;
    fechaHasta: Date | null = null;
    
    @Input() equipo!: Equipo;
    @Output() openEventEmitter = new EventEmitter();

    constructor(private mantenimientoService: MantenimientoService) {
        // Establecer fechas por defecto (últimos 7 días)
        const hoy = new Date();
        const haceUnaSemana = new Date();
        haceUnaSemana.setDate(hoy.getDate() - 7);
        
        this.fechaDesde = haceUnaSemana;
        this.fechaHasta = hoy;
    }

    ngOnInit(): void {
        this.cargarMantenimientos();
    }

    cargarMantenimientos() {
        this.isLoading = true;
        
        // Formatear fechas para el backend (yyyy-MM-dd)
        const desde = this.fechaDesde ? this.formatDateForBackend(this.fechaDesde) : null;
        const hasta = this.fechaHasta ? this.formatDateForBackend(this.fechaHasta) : null;
        
        this.mantenimientoService.findAllByDates(desde, hasta).subscribe({
            next: (resp) => {
                this.dataSource = resp;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar mantenimientos',
                    text: err.error || 'Error desconocido',
                });
            },
        });
    }

    private formatDateForBackend(date: Date): string {
        return date.toISOString().split('T')[0]; // yyyy-MM-dd
    }

    aplicarFiltro() {
        this.cargarMantenimientos();
    }

    limpiarFiltros() {
        // Restablecer a los últimos 7 días
        const hoy = new Date();
        const haceUnaSemana = new Date();
        haceUnaSemana.setDate(hoy.getDate() - 7);
        
        this.fechaDesde = haceUnaSemana;
        this.fechaHasta = hoy;
        
        this.cargarMantenimientos();
    }

    eliminarMantenimiento(id: number) {
        Swal.fire({
            title: '¿Eliminar mantenimiento?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.mantenimientoService.delete(id).subscribe({
                    next: () => {
                        Swal.fire(
                            'Eliminado',
                            'Mantenimiento eliminado correctamente.',
                            'success'
                        );
                        this.cargarMantenimientos();
                    },
                    error: (err) => {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar: ' + (err.error || 'Error desconocido'),
                            'error'
                        );
                    },
                });
            }
        });
    }
}