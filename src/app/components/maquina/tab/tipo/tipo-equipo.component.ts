import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TipoEquipo } from '../../../../models/tipoEquipo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { tipoEquipoService } from '../../../../services/tipoEquipo.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoFormComponent } from "./tipo-form/tipo-form.component";

@Component({
  selector: 'tipo-equipo',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, TipoFormComponent],
  templateUrl: './tipo-equipo.component.html',
  styleUrl: './tipo-equipo.component.css'
})
export class TipoEquipoComponent implements OnInit {

  @Output() tiposActualizados = new EventEmitter<void>();
  tiposDeEquipo:TipoEquipo[]=[];
  tipoEquipoSelected:TipoEquipo = new TipoEquipo();
  open:boolean=false;
  dataSource!: MatTableDataSource<any>;

  constructor(private service:tipoEquipoService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh():void{
    this.service.findAll().subscribe(tipo => {
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
    if(tipo.id>0){ //es una modificacion
      tipo.codigo = tipo.codigo.toUpperCase();
      this.service.edit(tipo.id, tipo).subscribe({
      next: (resp) => {
        Swal.fire({
        title: "Editado!",
        text: "Tipo de equipo actualizado correctamente!",
        icon: "success"
      });
      //refresh de datos
      this.refresh();
      this.tiposActualizados.emit();
    },
    error: (err) => {
      console.error("Error al editar:", err); //todo mostrarlo en algun lugar
      Swal.fire({
        title: "Error",
        text: "No se pudo editar el tipo de equipo: \n"+ err.error,
        icon: "error"
      });
      this.refresh();
    }
  });
    }else{
      //peticion al back
      tipo.codigo=tipo.codigo.toUpperCase();
      this.service.addNew(tipo).subscribe({next:(resp)=>{
        Swal.fire({
          title: "Guardado!",
          text: "Tipo de equipo guardado con éxito!",
          icon: "success"
        });
        //refresh de datos
        this.refresh();
        this.tiposActualizados.emit();
      },
      error:(err)=>{
        console.log('error',err); //todo mostrar el error
        Swal.fire({
          title: "Error",
          text: "No se pudo agregar el tipo de equipo: \n"+ err.error,
          icon: "error"
        });
        //refresh de datos
        this.refresh();
      }
    });
    }
  }

   setNew(){
     this.tipoEquipoSelected=new TipoEquipo();
     this.open=true;
   }

  setOpen(){
    this.open=!this.open;
    this.refresh();
  }

  displayedColumns: string[] = [ 'Codigo', 'Descripcion', 'Modificar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelectedTipo(tipoEquipo:TipoEquipo) {
  this.tipoEquipoSelected=tipoEquipo;
  this.setOpen();
  }

}

