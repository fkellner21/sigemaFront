import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Maquina } from '../../models/maquina';

@Component({
  selector: 'maquina',
  standalone:true,
  imports: [],
  templateUrl: './maquina.component.html',
})
export class MaquinaComponent {

  @Input() maquinas:Maquina[]=[];

  @Output() idMaquinaEmitter = new EventEmitter();

  @Output() selectedMaquinaEventEmitter = new EventEmitter();

  onRemoveMaquina(id:number):void{
    //const confirmRemove = confirm('Seguro que la borramos?');//metodo de js
    //if(confirmRemove){
    this.idMaquinaEmitter.emit(id);
    //}
  }
  onSelectedMaquina(maquina:Maquina):void{
    this.selectedMaquinaEventEmitter.emit(maquina);
  }

}
