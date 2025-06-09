import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { modeloEquipo } from '../../../../../models/modeloEquipo';
import { Equipo } from '../../../../../models/equipo';
import { Unidad } from '../../../../../models/Unidad';
import { EstadoEquipo } from '../../../../../models/enum/EstadoEquipo';
import { TipoEquipo } from '../../../../../models/tipoEquipo';
import { Marca } from '../../../../../models/marca';
import { UnidadService } from '../../../../../services/unidad.service';
import { modeloService } from '../../../../../services/modelo.service';
import { tipoEquipoService } from '../../../../../services/tipoEquipo.service';
import { marcaService } from '../../../../../services/marca.service';

@Component({
  selector: 'app-maquina-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './maquina-form.component.html'
})
export class MaquinaFormComponent implements OnChanges, OnInit {
  @Input() equipo: Equipo = new Equipo();
  @Input() editando: boolean = false;
  @Input() modelos: modeloEquipo[] = [];
  @Input() unidades: Unidad[] = [];
  @Input() tiposEquipo: TipoEquipo[] = [];
  @Input() marcas: Marca[] = [];
  @Output() guardar = new EventEmitter<Equipo>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(
    private unidadService: UnidadService, 
    private modeloService: modeloService,
    private tipoEquipoService: tipoEquipoService,
    private marcaService: marcaService
  ) {}

  equipoForm: Equipo = new Equipo();
  estadoEquipoEnum = EstadoEquipo;
  estados = Object.keys(this.estadoEquipoEnum).filter(k => isNaN(Number(k)));
  
  modelosFiltrados: modeloEquipo[] = [];
  marcasFiltradas: Marca[] = [];
  tipoSeleccionado: number | null = null;
  marcaSeleccionada: number | null = null;
  anioModelo: number | null = null;

  ngOnInit(): void {
    console.log('Equipo recibido:', this.equipo);
    console.log('Modelos disponibles:', this.modelos);
    this.refresh();
  }

  refresh(): void {
    this.unidadService.findAll().subscribe((unidad: Unidad[]) => {
      this.unidades = unidad;
    });

    this.modelosFiltrados = [...this.modelos];
    this.marcasFiltradas = [...this.marcas];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipo'] && this.equipo) {
      this.equipoForm = Object.assign(new Equipo(), this.equipo);
      
      if (this.equipoForm.modeloEquipo) {
        this.tipoSeleccionado = this.equipoForm.modeloEquipo.tipoEquipo?.id || null;
        this.marcaSeleccionada = this.equipoForm.modeloEquipo.marca?.id || null;
        this.anioModelo = this.equipoForm.modeloEquipo.anio || null;
        
        this.filtrarMarcas();
        this.filtrarModelos();
      } else {
        this.resetearTodosLosCampos();
      }
    }
    
    if (changes['modelos'] && this.modelos) {
      this.modelosFiltrados = [...this.modelos];
      console.log('Modelos actualizados:', this.modelos);
    }
    
    if (changes['marcas'] && this.marcas) {
      this.marcasFiltradas = [...this.marcas];
    }
  }

  onTipoEquipoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const tipoId = input.value ? Number(input.value) : null;
    console.log('Tipo seleccionado:', tipoId);
    this.tipoSeleccionado = tipoId;
    
    this.marcaSeleccionada = null;
    this.resetearModeloYAnio();
    
    this.filtrarMarcas();
    this.filtrarModelos();
  }

  onMarcaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const marcaId = input.value ? Number(input.value) : null;
    console.log('Marca seleccionada:', marcaId);
    this.marcaSeleccionada = marcaId;
    
    this.resetearModeloYAnio();
    
    this.filtrarModelos();
  }

  onModeloChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const modeloId = input.value ? Number(input.value) : null;
    console.log('Modelo seleccionado:', modeloId);

    if (modeloId !== null) {
      const modeloSeleccionado = this.modelosFiltrados.find(m => m.id === modeloId);
      if (modeloSeleccionado) {
        this.equipoForm.modeloEquipo = modeloSeleccionado;
        this.equipoForm.idModeloEquipo = modeloSeleccionado.id;
        this.anioModelo = modeloSeleccionado.anio;
        console.log('Modelo asignado:', modeloSeleccionado);
        return;
      }
    }
    this.resetearModeloYAnio();
  }

  private filtrarMarcas(): void {
    if (!this.tipoSeleccionado) {
      this.marcasFiltradas = [...this.marcas];
      return;
    }

    const marcasDelTipo = new Set<number>();
    this.modelos
      .filter(m => m.tipoEquipo && m.tipoEquipo.id === this.tipoSeleccionado)
      .forEach(m => {
        if (m.marca && m.marca.id) {
          marcasDelTipo.add(m.marca.id);
        }
      });

    this.marcasFiltradas = this.marcas.filter(marca => marcasDelTipo.has(marca.id));
    
    console.log('Marcas filtradas para tipo', this.tipoSeleccionado, ':', this.marcasFiltradas);
  }

  private filtrarModelos(): void {
    let modelosFiltrados = [...this.modelos];

    if (this.tipoSeleccionado) {
      modelosFiltrados = modelosFiltrados.filter(m => 
        m.tipoEquipo && m.tipoEquipo.id === this.tipoSeleccionado
      );
      console.log('Modelos después de filtrar por tipo:', modelosFiltrados);
    }

    if (this.marcaSeleccionada) {
      modelosFiltrados = modelosFiltrados.filter(m => 
        m.marca && m.marca.id === this.marcaSeleccionada
      );
      console.log('Modelos después de filtrar por marca:', modelosFiltrados);
    }

    this.modelosFiltrados = modelosFiltrados;
    console.log('Modelos finales filtrados:', this.modelosFiltrados);

    if (this.equipoForm.idModeloEquipo) {
      const modeloActualEnLista = this.modelosFiltrados.find(m => m.id === this.equipoForm.idModeloEquipo);
      if (!modeloActualEnLista) {
        this.resetearModeloYAnio();
      }
    }
  }

  private resetearTodosLosCampos(): void {
    this.tipoSeleccionado = null;
    this.marcaSeleccionada = null;
    this.resetearModeloYAnio();
    this.marcasFiltradas = [...this.marcas];
    this.modelosFiltrados = [...this.modelos];
  }

  private resetearModeloYAnio(): void {
    this.equipoForm.modeloEquipo = new modeloEquipo();
    this.equipoForm.idModeloEquipo = undefined;
    this.anioModelo = null;
  }

  onSubmit(): void {
    console.log('Enviando equipo:', this.equipoForm);
    this.guardar.emit(this.equipoForm);
    this.cancelar.emit();
  }

  onCancel(): void {
    this.cancelar.emit();
  }
}
