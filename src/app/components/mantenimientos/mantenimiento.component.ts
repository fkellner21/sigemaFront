// mantenimientos.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';
import { Mantenimiento } from '../../models/mantenimiento';
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
    ],
    templateUrl: './mantenimiento.component.html',
    styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientosComponent implements OnInit {
    displayedColumns: string[] = ['fecha', 'vehiculo', 'detalle', 'acciones'];
    dataSource: any[] = [];
    dataSourceOriginal: any[] = [];
    isLoading: boolean = false;
    filtro: string = '';
    @Input() equipo!: Equipo;
    @Output() openEventEmitter = new EventEmitter();

    constructor(private mantenimientoService: MantenimientoService) {}

    ngOnInit(): void {
        this.cargarMantenimientos();
    }

    cargarMantenimientos() {
        this.isLoading = true;
        this.mantenimientoService.findAll().subscribe({
            next: (resp) => {
                this.dataSourceOriginal = resp;
                this.dataSource = resp;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar mantenimientos',
                    text: err.error,
                });
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();
        this.dataSource = this.dataSourceOriginal.filter(
            (m) =>
                (m.detalle?.toLowerCase() ?? '').includes(filterValue) ||
                (m.vehiculo?.matricula?.toLowerCase() ?? '').includes(
                    filterValue
                )
        );
    }

    eliminarMantenimiento(id: number) {
        Swal.fire({
            title: '¿Eliminar mantenimiento?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
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
                            'No se pudo eliminar: ' + err.error,
                            'error'
                        );
                    },
                });
            }
        });
    }
}
