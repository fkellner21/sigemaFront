import { Component, OnInit } from '@angular/core';
import { TipoEquipo } from '../../../models/tipoEquipo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { tipoEquipoService } from '../../../services/tipoEquipo.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tipo-equipo',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './tipo-equipo.component.html',
  styleUrl: './tipo-equipo.component.css'
})
export class TipoEquipoComponent implements OnInit {

  tiposDeEquipo:TipoEquipo[]=[];
  open:boolean=false;
  dataSource!: MatTableDataSource<any>;



  constructor(private service:tipoEquipoService){

  }
  ngOnInit(): void {
  this.service.findAll().subscribe(tipo => {
    console.log('Datos recibidos:', tipo); // 👈
    this.tiposDeEquipo = tipo;
    this.dataSource = new MatTableDataSource(this.tiposDeEquipo);
    });
  }

  // onRemoveMaquina(id:number):void{
  // Swal.fire({
  // title: "Seguro de borrar?",
  // text: "Cuidado!",
  // icon: "warning",
  // showCancelButton: true,
  // confirmButtonColor: "#3085d6",
  // cancelButtonColor: "#d33",
  // confirmButtonText: "si!"
  //   }).then((result) => {
  //   if (result.isConfirmed) {
  //     this.maquinas = this.maquinas.filter(maquina => maquina.id != id);
  //     this.dataSource.data= this.maquinas;
  //       Swal.fire({
  //         title: "Eliminado!",
  //         text: "Borrado.",
  //         icon: "success"
  //       });
  //     }
  //   });
  // }

  addTipoEquipo(tipo:TipoEquipo){
        // if(tipo.id>0){
        //   this.tipo = this.maquinas.map(m => (m.id==maquina.id)?{...maquina}:m);
        // }else{
          var id:number=1;
          this.tiposDeEquipo.forEach(m => {
            if(m.id>id) id=m.id;
          });
          tipo.id=id+1;
          this.tiposDeEquipo=[... this.tiposDeEquipo, {...tipo}];
        
        this.dataSource.data = this.tiposDeEquipo;
        Swal.fire({
        title: "Guardado!",
        text: "Maquina guardada!",
        icon: "success"
          });
        //this.maquinaSelected=new Maquina();
  }
  // setNew(){
  //   this.maquinaSelected=new Maquina;
  //   this.open=true;
  // }
  //   setSelectedMaquina(maquina:Maquina):void{
  //   this.maquinaSelected={...maquina}; //esa notacion crea una copia del dato que vino
  //   this.setOpen();
  // }
  setOpen(){
    this.open=!this.open;
  }

  displayedColumns: string[] = [ 'Codigo', 'Descripcion'];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

