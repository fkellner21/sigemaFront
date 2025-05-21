import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Maquina } from '../../models/maquina';
import { MaquinaService } from '../../services/maquina.service';
import Swal from 'sweetalert2';
import { MaquinaFormComponent } from '../maquina-form/maquina-form.component';

@Component({
  selector: 'maquina',
  standalone:true,
  imports: [MaquinaFormComponent],
  templateUrl: './maquina.component.html',
})
export class MaquinaComponent implements OnInit{

  maquinas:Maquina[]=[];
  maquinaSelected: Maquina = new Maquina;
  open:boolean=false;

  @Output() idMaquinaEmitter = new EventEmitter();

  @Output() selectedMaquinaEventEmitter = new EventEmitter();

  constructor(private service:MaquinaService){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(maquinas => this.maquinas = maquinas);
  }

  onRemoveMaquina(id:number):void{
  Swal.fire({
  title: "Seguro de borrar?",
  text: "Cuidado!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "si!"
    }).then((result) => {
    if (result.isConfirmed) {
      this.maquinas = this.maquinas.filter(maquina => maquina.id != id);
        Swal.fire({
          title: "Eliminado!",
          text: "Borrado.",
          icon: "success"
        });
      }
    });
  }

  addMaquina(maquina:Maquina){
        if(maquina.id>0){ 
          this.maquinas = this.maquinas.map(m => (m.id==maquina.id)?{...maquina}:m);
        }else{
          var id:number=1;
          this.maquinas.forEach(m => {
            if(m.id>id) id=m.id;
          });
          maquina.id=id+1;
          this.maquinas=[... this.maquinas, {...maquina}];
        }
        Swal.fire({
        title: "Guardado!",
        text: "Maquina guardada!",
        icon: "success"
          });
        this.maquinaSelected=new Maquina();
  }
  setNew(){
    this.maquinaSelected=new Maquina;
    this.open=true;
  }
    setSelectedMaquina(maquina:Maquina):void{
    this.maquinaSelected={...maquina}; //esa notacion crea una copia del dato que vino
    this.setOpen();
  }
    setOpen(){
    this.open=!this.open;
  }
}
