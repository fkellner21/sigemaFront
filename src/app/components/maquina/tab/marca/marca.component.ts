import { Component, EventEmitter, Output } from '@angular/core';
import { Marca } from '../../../../models/marca';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { marcaService } from '../../../../services/marca.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MarcaFormComponent } from './marca-form/marca-form.component';

@Component({
  selector: 'marca',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MarcaFormComponent],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent {

  @Output() marcasActualizadas = new EventEmitter<void>();

  marcas:Marca[]=[];
  marcaSelected:Marca = new Marca();
  open:boolean=false;
  dataSource!: MatTableDataSource<any>;

  constructor(private service:marcaService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh():void{
    this.service.findAll().subscribe(marca => {
    this.marcas = marca;
    this.dataSource = new MatTableDataSource(this.marcas);
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

  addMarca(marca:Marca){
    if(marca.id>0){ //es una modificacion
      this.service.edit(marca.id, marca).subscribe({
      next: (resp) => {
        Swal.fire({
        title: "Editado!",
        text: "Marca actualizada correctamente!",
        icon: "success"
      });
      //refresh de datos
      this.refresh();
      this.marcasActualizadas.emit();
    },
    error: (err) => {
      console.error("Error al editar:", err); 
      Swal.fire({
        title: "Error",
        text: "No se pudo editar la marca.",
        icon: "error"
      });
      //refresh de datos
      this.refresh();
    }
  });
    }else{
      //peticion al back
      this.service.addNew(marca).subscribe({next:(resp)=>{
        Swal.fire({
          title: "Guardado!",
          text: "Marca agregada con éxito!",
          icon: "success"
        });
        //refresh de datos
        this.refresh();
        this.marcasActualizadas.emit();
      },
      error:(err)=>{
        console.log('error',err); 
        Swal.fire({
          title: "Error",
          text: "No se pudo agregar la marca.",
          icon: "error"
        });
        this.refresh();
      }
    });
    }
  }

   setNew(){
     this.marcaSelected=new Marca();
     this.open=true;
   }

  setOpen(){
    this.open=!this.open;
    this.refresh();
  }

  displayedColumns: string[] = [ 'Codigo', 'Nombre', 'Modificar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelectedMarca(marca:Marca) {
  this.marcaSelected=marca;
  this.setOpen();
  }
}
