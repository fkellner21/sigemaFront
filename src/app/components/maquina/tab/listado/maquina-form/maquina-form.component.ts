// maquina-form.component.ts
import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { modeloEquipo } from '../../../../../models/modeloEquipo';
import { Equipo } from '../../../../../models/equipo'; 
import { EstadoEquipo } from '../../../../../models/enum/EstadoEquipo';


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
export class MaquinaFormComponent implements OnChanges {
  @Input() equipo: Equipo = new Equipo();
  @Input() editando: boolean = false;
  @Input() modelos: modeloEquipo[] = [];
  @Output() guardar = new EventEmitter<Equipo>();
  @Output() cancelar = new EventEmitter<void>();

  equipoForm: Equipo = new Equipo();
  estadoEquipoEnum = EstadoEquipo; // Para acceder en el template
  estados = Object.keys(this.estadoEquipoEnum).filter(k => isNaN(Number(k))); // Solo las keys


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipo'] && this.equipo) {
      this.equipoForm = Object.assign(new Equipo(), this.equipo);
    }
  }
onSubmit(): void {
  this.guardar.emit(this.equipoForm);
}


  onCancel(): void {
    this.cancelar.emit();
  }

  onModeloChange(modeloId: number) {
  const modeloSeleccionado = this.modelos.find(m => m.id === modeloId);
  if (modeloSeleccionado) {
    this.equipoForm.modeloEquipo = modeloSeleccionado;
  } else {
    this.equipoForm.modeloEquipo = new modeloEquipo(); // o null según tu diseño
  }
}

}
