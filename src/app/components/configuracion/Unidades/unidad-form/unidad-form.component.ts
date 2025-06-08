import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Unidad } from '../../../../models/Unidad';

@Component({
  selector: 'unidad-form',
  imports: [FormsModule],
  templateUrl: './unidad-form.component.html',
  styleUrl: './unidad-form.component.css'
})

export class UnidadFormComponent {
  @Input() unidad:Unidad;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() newUnidadEventEmitter: EventEmitter<Unidad>=new EventEmitter();

  constructor(){
    this.unidad=new Unidad();
  }

    onSubmit(unidadForm:NgForm):void{
    
    if(unidadForm.valid){
      this.newUnidadEventEmitter.emit(this.unidad);
    }
    unidadForm.reset();
    this.onOpen();
  }
    onOpen(){
    this.openEventEmitter.emit();
  }
}
