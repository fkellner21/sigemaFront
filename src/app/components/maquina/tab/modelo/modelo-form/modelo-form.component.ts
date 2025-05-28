import { Component, EventEmitter, Input, Output } from '@angular/core';
import { modeloEquipo } from '../../../../../models/modeloEquipo';
import { Marca } from '../../../../../models/marca';
import { TipoEquipo } from '../../../../../models/tipoEquipo';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'modelo-form',
  imports: [FormsModule],
  templateUrl: './modelo-form.component.html',
  styleUrl: './modelo-form.component.css'
})
export class ModeloFormComponent {
@Input() modeloEquipo: modeloEquipo = new modeloEquipo();
@Input() marcas: Marca[] = [];
@Input() tiposEquipo: TipoEquipo[] = [];

@Output() newModeloEventEmitter = new EventEmitter<modeloEquipo>();
@Output() openEventEmitter = new EventEmitter();

onSubmit(form: NgForm): void {
  if (form.valid) {
    this.newModeloEventEmitter.emit(this.modeloEquipo);
    form.reset();
    this.onOpen();
  }
}

onOpen(): void {
  this.openEventEmitter.emit();
}

}
