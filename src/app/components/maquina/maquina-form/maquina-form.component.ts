import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Equipo } from '../../../models/equipo';


@Component({
  selector: 'maquina-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './maquina-form.component.html',
})
export class MaquinaFormComponent {

  @Input() maquina:Equipo;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() newMaquinaEventEmitter: EventEmitter<Equipo>=new EventEmitter();
  
  constructor(){
    this.maquina = new Equipo();
  }

  onSubmit(maquinaForm:NgForm):void{
    
    if(maquinaForm.valid){
      this.newMaquinaEventEmitter.emit(this.maquina);
    }
    maquinaForm.reset();
    this.onOpen();
  }
  
  onOpen(){
    this.openEventEmitter.emit();
  }
}
