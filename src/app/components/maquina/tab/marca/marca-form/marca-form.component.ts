import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Marca } from '../../../../../models/marca';

@Component({
  selector: 'marca-form',
  imports: [FormsModule],
  templateUrl: './marca-form.component.html',
  styleUrl: './marca-form.component.css'
})
export class MarcaFormComponent {
  @Input() marca:Marca;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() newTipoEventEmitter: EventEmitter<Marca>=new EventEmitter();

  constructor(){
    this.marca=new Marca();
  }

    onSubmit(tipoForm:NgForm):void{
    
    if(tipoForm.valid){
      this.newTipoEventEmitter.emit(this.marca);
    }
    tipoForm.reset();
    this.onOpen();
  }
    onOpen(){
    this.openEventEmitter.emit();
  }
}
