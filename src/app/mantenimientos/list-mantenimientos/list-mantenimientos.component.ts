import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { Mantenimiento } from '../../models/mantenimiento';
import { Equipo } from '../../models/equipo';
import { MantenimientoFormComponent } from '../../components/mantenimientos/mantenimiento-form/mantenimiento-form.component';

@Component({
    selector: 'app-list-mantenimientos',
    standalone: true,
    imports: [CommonModule, MantenimientoFormComponent],
    templateUrl: './list-mantenimientos.component.html',
    styleUrls: ['./list-mantenimientos.component.css']
})
export class ListMantenimientosComponent implements OnInit {
    @Input() equipo!: Equipo;
    @Output() cerrar = new EventEmitter<void>();

    mostrarFormulario = false;
    nuevoMantenimiento: Mantenimiento = new Mantenimiento(); // CAMBIO: usar constructor
    mantenimientos: Mantenimiento[] = [];
    isLoading = false;

    constructor(private mantenimientoService: MantenimientoService) {}

    ngOnInit() {
        console.log('ListMantenimientosComponent initialized with equipo:', this.equipo); 
        this.cargarMantenimientos();
    }

    cargarMantenimientos() {
        if (this.equipo?.id) {
            console.log('Cargando mantenimientos para equipo ID:', this.equipo.id); 
            this.isLoading = true;
            this.mantenimientoService.obtenerPorEquipo(this.equipo.id).subscribe({
                next: (mantenimientos) => {
                    console.log('Mantenimientos cargados:', mantenimientos); 
                    this.mantenimientos = mantenimientos;
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error al cargar mantenimientos:', error);
                    this.isLoading = false;
                }
            });
        } else {
            console.warn('No se puede cargar mantenimientos: equipo o equipo.id es null/undefined'); 
        }
    }

    cerrarModal() {
        this.cerrar.emit();
    }

    abrirFormulario() {
        console.log('Abriendo formulario de mantenimiento'); 
        this.mostrarFormulario = true;
        
        // CORRECCIÓN: Inicializar correctamente el nuevo mantenimiento
        this.nuevoMantenimiento = new Mantenimiento();
        this.nuevoMantenimiento.idEquipo = this.equipo?.id;
        this.nuevoMantenimiento.unidadMedida = this.equipo?.modeloEquipo?.unidadMedida;
        this.nuevoMantenimiento.fechaMantenimiento = new Date();
        this.nuevoMantenimiento.esServicio = false;
    }

    cerrarFormulario() {
        console.log('Cerrando formulario de mantenimiento'); 
        this.mostrarFormulario = false;
    }

    recargarLista() {
        console.log('Recargando lista de mantenimientos'); 
        this.mostrarFormulario = false;
        this.cargarMantenimientos();
    }
}