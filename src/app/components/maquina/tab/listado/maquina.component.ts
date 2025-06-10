import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipo } from '../../../../models/equipo';
import { MaquinaService } from '../../../../services/equipo.service';
import { modeloService } from '../../../../services/modelo.service';
import { tipoEquipoService } from '../../../../services/tipoEquipo.service';
import { marcaService } from '../../../../services/marca.service';
import { modeloEquipo } from '../../../../models/modeloEquipo';
import { TipoEquipo } from '../../../../models/tipoEquipo';
import { Marca } from '../../../../models/marca';
import Swal from 'sweetalert2';

import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MaquinaFormComponent } from './maquina-form/maquina-form.component';

@Component({
  selector: 'maquina',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaquinaFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css']
})
export class MaquinaComponent implements OnInit {
  maquinas: Equipo[] = [];
  maquinaSelected: Equipo = new Equipo();
  open: boolean = false;
  dataSource!: MatTableDataSource<Equipo>;
displayedColumns: string[] = [
  'unidad',
  'tipoMaquina',
  'matricula',
  'marca',
  'modelo',
  'capacidad',
  'tiempoDeTrabajo',
  'acciones'
];

  modelos: modeloEquipo[] = [];
  tiposEquipo: TipoEquipo[] = [];
  marcas: Marca[] = [];
  isLoading:boolean=false;
  
  constructor(
    private service: MaquinaService,
    private modeloService: modeloService,
    private tipoEquipoService: tipoEquipoService,
    private marcaService: marcaService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.refresh();
  }

  refresh(): void {
    this.isLoading=true;
    this.service.findAll().subscribe(maquinas => {
      this.maquinas = maquinas;
      this.dataSource = new MatTableDataSource(this.maquinas);
      this.isLoading=false;
    });
  }

  ngOnChanges() {
    if (this.maquinas) {
      this.dataSource = new MatTableDataSource(this.maquinas);
    }
  }

  cargarDatosIniciales() {
    // Cargar modelos
    this.modeloService.findAll().subscribe({
      next: (modelos) => {
        this.modelos = modelos;
      },
      error: (err) => {
        console.error('Error al cargar modelos:', err);
      }
    });

    // Cargar tipos de equipo
    this.tipoEquipoService.findAll().subscribe({
      next: (tipos) => {
        this.tiposEquipo = tipos;
      },
      error: (err) => {
        console.error('Error al cargar tipos de equipo:', err);
      }
    });

    // Cargar marcas
    this.marcaService.findAll().subscribe({
      next: (marcas) => {
        this.marcas = marcas;
      },
      error: (err) => {
        console.error('Error al cargar marcas:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setNew() {
    this.maquinaSelected = new Equipo();
    this.open = true;
  }

  setOpen() {
    this.open = !this.open;
  }

  setSelectedMaquina(maquina: Equipo) {
    this.maquinaSelected = maquina;
    this.setOpen();
  }

  addMaquina(maquina: Equipo) {
    if (maquina.id > 0) {
      this.service.edit(maquina.id, maquina).subscribe({
        next: () => {
          Swal.fire('Editado', 'Máquina actualizada correctamente', 'success');
          this.refresh();
        },
        error: err => {
          Swal.fire('Error', 'No se pudo editar la máquina. ' + err.error, 'error');
        }
      });
    } else {
      this.service.addNew(maquina).subscribe({
        next: () => {
          Swal.fire('Guardado', 'Máquina agregada con éxito', 'success');
          this.refresh();
        },
        error: err => {
          Swal.fire('Error', 'No se pudo agregar la máquina. ' + err.error, 'error');
        }
      });
    }
  }

  deleteMaquina(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La máquina fue eliminada', 'success');
            this.refresh();
          },
          error: err => {
            Swal.fire('Error', 'No se pudo eliminar la máquina. ' + err.error, 'error');
          }
        });
      }
    });
  }
}