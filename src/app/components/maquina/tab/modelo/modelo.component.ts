import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { modeloEquipo } from '../../../../models/modeloEquipo';
import { modeloService } from '../../../../services/modelo.service';
import { ModeloFormComponent } from './modelo-form/modelo-form.component';
import { Marca } from '../../../../models/marca';
import { TipoEquipo } from '../../../../models/tipoEquipo';

@Component({
  selector: 'modelo',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, ModeloFormComponent ],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.css'
})
export class ModeloComponent {
  @Input() tipos: TipoEquipo[] = [];
  @Input() marcas: Marca[] = [];

  modelos:modeloEquipo[]=[];
  modeloSelected:modeloEquipo = new modeloEquipo();
  open:boolean=false;
  dataSource!: MatTableDataSource<any>;

  constructor(private service:modeloService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh():void{
    this.service.findAll().subscribe(modelo => {
    this.modelos = modelo;
    this.dataSource = new MatTableDataSource(this.modelos);
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

  addModelo(modelo:modeloEquipo){
    if(modelo.id>0){ //es una modificacion
      this.service.edit(modelo.id, modelo).subscribe({
      next: (resp) => {
        Swal.fire({
        title: "Editado!",
        text: "Modelo de equipo actualizado correctamente!",
        icon: "success"
      });
      //refresh de datos
      this.refresh();
    },
    error: (err) => {
      Swal.fire({
        title: "Error",
        text: "No se pudo editar este modelo de equipo. "+err.error,
        icon: "error"
      });
      //refresh de datos
      this.refresh();
    }
  });
    }else{
      //peticion al back
      this.service.addNew(modelo).subscribe({next:(resp)=>{
        Swal.fire({
          title: "Guardado!",
          text: "Modelo de equipo agregado con éxito!",
          icon: "success"
        });
        //refresh de datos
        this.refresh();
      },
      error:(err)=>{
        Swal.fire({
          title: "Error",
          text: "No se pudo agregar el modelo de equipo. " + err.error,
          icon: "error"
        });
      }
    });
    }
  }

   setNew(){
     this.modeloSelected=new modeloEquipo();
     this.open=true;
   }

  setOpen(){
    this.open=!this.open;
  }

  displayedColumns: string[] = [ 'Anio', 'Marca', 'Modelo', 'Capacidad', 'Tipo', 'VerEquipos','VerRepuestos','Modificar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } //todo, el filtro no agarra el tipo ni la marca

  setSelectedModelo(modelo:modeloEquipo) {
  this.modeloSelected=modelo;
  this.setOpen();
  }
}
