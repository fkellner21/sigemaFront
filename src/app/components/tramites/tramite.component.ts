import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Unidad } from '../../models/Unidad';
import { Rol } from '../../models/enum/Rol';
import { UnidadService } from '../../services/unidad.service';
import { AuthService } from '../../services/auth.service';
import { TipoTramite } from '../../models/enum/TipoTramite';
import { EstadoTramite } from '../../models/enum/EstadoTramite';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../models/tramite';
import Swal from 'sweetalert2';

@Component({
    selector: 'tramites',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './tramite.component.html',
    styleUrls: ['./tramite.component.css'],
})
export class TramitesComponent implements OnInit {
    displayedColumns: string[] = [
        'Origen',
        'Destino',
        'Fecha',
        'Solicitante',
        'Tipo',
        'Estado',
        'acciones',
    ];
    dataSource: any[] = [];
    dataSourceOriginal: any[] = [];
    isLoading: boolean = false;

    mostrarFormulario: boolean = false;
    roles!: { key: string; label: string }[];
    estados!: { key: string; label: string }[];
    tipos!: { key: string; label: string }[];
    unidades!: Unidad[];
    Rol = Rol;
    TipoTramite = TipoTramite;
    EstadoTramite = EstadoTramite;
    tramiteSeleccionado: Tramite | null = null;

    constructor(
        private unidadService: UnidadService,
        private tramiteService: TramiteService,
        public authservice: AuthService
    ) {}

    getRolLabel(key: any): string {
        return this.Rol[key as keyof typeof Rol] ?? key;
    }

    getTipoLabel(key: any): string {
        return this.TipoTramite[key as keyof typeof TipoTramite] ?? key;
    }

    getEstadoLabel(key: any): string {
        return this.EstadoTramite[key as keyof typeof EstadoTramite] ?? key;
    }

    ngOnInit() {
        this.roles = Object.keys(Rol).map((key) => ({
            key: key,
            label: Rol[key as keyof typeof Rol],
        }));

        this.estados = Object.keys(EstadoTramite).map((key) => ({
            key: key,
            label: EstadoTramite[key as keyof typeof EstadoTramite],
        }));

        this.tipos = Object.keys(TipoTramite).map((key) => ({
            key: key,
            label: TipoTramite[key as keyof typeof TipoTramite],
        }));

        this.cargarTramites();
    }

    cargarTramites() {
        this.isLoading = true;
        this.tramiteService.findAll().subscribe({
            next: (data) => {
                this.dataSource = data;
                this.dataSourceOriginal = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error al cargar los trámites:', err);
                this.isLoading = false;
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();

        if (!filterValue) {
            this.dataSource = this.dataSourceOriginal;
            return;
        }
        this.dataSource = this.dataSourceOriginal.filter((tramite) => {
            const origen = tramite.unidadOrigen?.nombre?.toLowerCase() ?? '';
            const destino = tramite.unidadDestino?.nombre?.toLowerCase() ?? '';
            const fecha = new Date(tramite.fecha)
                .toLocaleDateString()
                .toLowerCase();
            const solicitante =
                tramite.solicitante?.nombreCompleto?.toLowerCase() ?? '';
            const tipo =
                this.tipos
                    .find((t) => t.key === tramite.tipo)
                    ?.label.toLowerCase() ?? '';
            const estado =
                this.estados
                    .find((e) => e.key === tramite.estado)
                    ?.label.toLowerCase() ?? '';

            return (
                origen.includes(filterValue) ||
                destino.includes(filterValue) ||
                fecha.includes(filterValue) ||
                solicitante.includes(filterValue) ||
                tipo.includes(filterValue) ||
                estado.includes(filterValue)
            );
        });
    }

    abrirFormularioTramite(idTramite?: number) {
        this.tramiteService.findById(idTramite ?? 0).subscribe({
            next: (tramite: Tramite) => {
                this.tramiteSeleccionado = tramite;
            },
            error: (err) => {
                console.error('Error al cargar el trámite:', err);
                this.tramiteSeleccionado = null;
            },
        });

        this.mostrarFormulario = true;
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
    }

    guardarTramite(tramite: any) {
        this.isLoading = true;

        const request$ = tramite.id
            ? this.tramiteService.edit(tramite.id, tramite)
            : this.tramiteService.addNew(tramite);

        request$.subscribe({
            next: () => {
                this.cargarTramites();
                this.cerrarFormulario();

                Swal.fire({
                    icon: 'success',
                    title: tramite.id
                        ? 'Tramite actualizado'
                        : 'Tramite creado',
                    text: tramite.id
                        ? 'El tramite ha sido actualizado correctamente.'
                        : 'El tramite ha sido creado correctamente.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
            error: (err) => {
                this.isLoading = false;

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text:
                        'Ocurrió un error al guardar el tramite. ' + err.error,
                });
            },
        });
    }

    eliminarTramite(id: number) {
        if (confirm('¿Está seguro de eliminar este tramite?')) {
            this.tramiteService.delete(id).subscribe(() => {
                this.cargarTramites();
            });
        }
    }
}
