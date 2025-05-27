import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TipoEquipo } from '../../../../../models/tipoEquipo';

@Component({
  selector: 'tipo-form',
  imports: [FormsModule],
  templateUrl: './tipo-form.component.html',
  styleUrl: './tipo-form.component.css'
})
export class TipoFormComponent {
  @Input() tipoEquipo:TipoEquipo;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() newTipoEventEmitter: EventEmitter<TipoEquipo>=new EventEmitter();

  constructor(){
    this.tipoEquipo=new TipoEquipo();
  }

    onSubmit(tipoForm:NgForm):void{
    
    if(tipoForm.valid){
      this.newTipoEventEmitter.emit(this.tipoEquipo);
    }
    tipoForm.reset();
    this.onOpen();
  }
    onOpen(){
    this.openEventEmitter.emit();
  }
}
