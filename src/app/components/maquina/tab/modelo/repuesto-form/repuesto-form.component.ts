import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Repuesto } from '../../../../../models/Repuesto';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'repuesto-form',
  imports: [FormsModule],
  templateUrl: './repuesto-form.component.html',
  styleUrl: './repuesto-form.component.css'
})
export class RepuestoFormComponent {
  @Input() repuesto!:Repuesto;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() newRepuestoEventEmitter: EventEmitter<Repuesto>=new EventEmitter();

  
  constructor(){
  }

  onSubmit(repuestoForm:NgForm):void{
    
    if(repuestoForm.valid){
      this.newRepuestoEventEmitter.emit(this.repuesto);
    }
    repuestoForm.reset();
    this.openEventEmitter.emit();
  }
  onOpen(){
    this.openEventEmitter.emit();
  }
}
