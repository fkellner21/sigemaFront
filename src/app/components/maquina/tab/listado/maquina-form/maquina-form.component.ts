//maquina-form.component.ts
import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Equipo } from '../../../../../models/equipo'; 

@Component({
  selector: 'app-maquina-form',
  standalone: true,
  templateUrl: './maquina-form.component.html'
})
export class MaquinaFormComponent implements OnChanges {
  @Input() equipo: Equipo = new Equipo();
  @Input() editando: boolean = false;
  @Output() guardar = new EventEmitter<Equipo>();
  @Output() cancelar = new EventEmitter<void>();

  equipoForm: Equipo = new Equipo();

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

  
}
