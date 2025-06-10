import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Repuesto } from '../../../../../models/Repuesto';
import { FormsModule, NgForm } from '@angular/forms';
import { TipoRepuesto } from '../../../../../models/enum/TipoRepuesto';
import { modeloEquipo } from '../../../../../models/modeloEquipo';

@Component({
  selector: 'repuesto-form',
  imports: [FormsModule],
  templateUrl: './repuesto-form.component.html',
  styleUrl: './repuesto-form.component.css'
})
export class RepuestoFormComponent {
  @Input() repuesto:Repuesto;
  @Input() tipoRepuesto:TipoRepuesto;
  @Input() modelo!:modeloEquipo;
  @Output() openEventEmitter = new EventEmitter();  
  @Output() repuestoTipoEventEmitter: EventEmitter<Repuesto>=new EventEmitter();

  
  constructor(){
    this.repuesto=new Repuesto();
    this.tipoRepuesto=TipoRepuesto.Lubricante;
  }
    onSubmit(repuestoForm:NgForm):void{
    
    if(repuestoForm.valid){
      this.repuesto.tipo=this.tipoRepuesto;
      this.repuesto.modelo=this.modelo;
      this.repuestoTipoEventEmitter.emit(this.repuesto);
    }
    repuestoForm.reset();
    this.onOpen();
  }
    onOpen(){
    this.openEventEmitter.emit();
  }
}
