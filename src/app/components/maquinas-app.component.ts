import { Component, OnInit } from '@angular/core';
import { Maquina } from '../models/maquina';
import { MaquinaService } from '../services/maquina.service';
import { MaquinaComponent } from './maquina/maquina.component';
import { MaquinaFormComponent } from './maquina-form/maquina-form.component';
import Swal from 'sweetalert2';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'maquinas-app',
  standalone:true,
  imports: [MaquinaComponent, MaquinaFormComponent, SideMenuComponent],
  templateUrl: './maquinas-app.component.html',
  styleUrls:['./maquinas-app.component.css'],
})
export class MaquinasAppComponent implements OnInit{

  title:string='Listado de maquinas'

  maquinas: Maquina[] = [];

  maquinaSelected:Maquina;

  open:boolean = false;

  constructor(private service:MaquinaService){
    this.maquinaSelected=new Maquina();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(maquinas => this.maquinas = maquinas);
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

  removeMaquina(id:number): void{
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
  setSelectedMaquina(maquina:Maquina):void{
    this.maquinaSelected={...maquina}; //esa notacion crea una copia del dato que vino
    this.setOpen();
  }

  setOpen(){
    this.open=!this.open;
  }
  setNew(){
    this.maquinaSelected=new Maquina;
    this.open=true;
  }

}
