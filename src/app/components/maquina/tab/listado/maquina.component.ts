import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipo } from '../../../../models/equipo';
import { MaquinaService } from '../../../../services/equipo.service';
import Swal from 'sweetalert2';
import { MaquinaFormComponent } from '../../maquina-form/maquina-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'maquina',
  standalone:true,
  imports: [MaquinaFormComponent, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './maquina.component.html',
})
export class MaquinaComponent implements OnInit{

  maquinas:Equipo[]=[];
  maquinaSelected: Equipo = new Equipo;
  open:boolean=false;
  dataSource!: MatTableDataSource<any>;


  @Output() idMaquinaEmitter = new EventEmitter();

  @Output() selectedMaquinaEventEmitter = new EventEmitter();

  constructor(private service:MaquinaService){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(maquinas => this.maquinas = maquinas);
    this.dataSource = new MatTableDataSource(this.maquinas);
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
      this.dataSource.data= this.maquinas;
        Swal.fire({
          title: "Eliminado!",
          text: "Borrado.",
          icon: "success"
        });
      }
    });
  }

  addMaquina(maquina:Equipo){
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
        this.dataSource.data = this.maquinas;
        Swal.fire({
        title: "Guardado!",
        text: "Maquina guardada!",
        icon: "success"
          });
        this.maquinaSelected=new Equipo();
  }
  setNew(){
    this.maquinaSelected=new Equipo;
    this.open=true;
  }
    setSelectedMaquina(maquina:Equipo):void{
    this.maquinaSelected={...maquina}; //esa notacion crea una copia del dato que vino
    this.setOpen();
  }
    setOpen(){
    this.open=!this.open;
  }

  displayedColumns: string[] = ['Matricula', 'Marca', 'Modelo', 'Capacidad','Eliminar','Modificar' ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
