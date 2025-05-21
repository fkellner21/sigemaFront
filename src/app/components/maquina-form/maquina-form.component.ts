import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Maquina } from '../../models/maquina';


@Component({
  selector: 'maquina-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './maquina-form.component.html',
})
export class MaquinaFormComponent {

  @Input() maquina:Maquina;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() newMaquinaEventEmitter: EventEmitter<Maquina>=new EventEmitter();
  
  constructor(){
    this.maquina = new Maquina();
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
