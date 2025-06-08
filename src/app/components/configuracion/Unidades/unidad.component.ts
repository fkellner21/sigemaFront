import { Component, EventEmitter, Output } from '@angular/core';
import { Unidad } from '../../../models/Unidad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UnidadService } from '../../../services/unidad.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UnidadFormComponent } from './unidad-form/unidad-form.component';

@Component({
  selector: 'unidad',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, UnidadFormComponent],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css'
})
export class UnidadComponent {

  @Output() unidadesActualizadas = new EventEmitter<void>();

  unidades:Unidad[]=[];
  unidadSelected:Unidad = new Unidad();
  open:boolean=false;
  dataSource!: MatTableDataSource<any>;

  constructor(private service:UnidadService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh():void{
    this.service.findAll().subscribe((unidad: Unidad[]) => {
    this.unidades = unidad;
    this.dataSource = new MatTableDataSource(this.unidades);
    console.log(this.dataSource)
    });
  }

  addUnidad(unidad:Unidad){
    if(unidad.id>0){ //es una modificacion
      this.service.edit(unidad.id, unidad).subscribe({
      next: (resp:Unidad) => {
        Swal.fire({
        title: "Editado!",
        text: "Unidad actualizada correctamente!",
        icon: "success"
      });
      //refresh de datos
      this.refresh();
      this.unidadesActualizadas.emit();
    },
    error: (err:any) => {
      Swal.fire({
        title: "Error",
        text: "No se pudo editar la unidad. "+err.error,
        icon: "error"
      });
      //refresh de datos
      this.refresh();
    }
  });
    }else{
      //peticion al back
      this.service.addNew(unidad).subscribe({next:(resp: Unidad)=>{
        Swal.fire({
          title: "Guardado!",
          text: "Unidad agregada con éxito!",
          icon: "success"
        });
        //refresh de datos
        this.refresh();
        this.unidadesActualizadas.emit();
      },
      error:(err:any)=>{
        Swal.fire({
          title: "Error",
          text: "No se pudo agregar la unidad. "+ err.error,
          icon: "error"
        });
        this.refresh();
      }
    });
    }
  }

  setNew(){
    this.unidadSelected=new Unidad();
    this.open=true;
  }

  setOpen(){
    this.open=!this.open;
    this.refresh();
  }

  displayedColumns: string[] = [ 'Nombre', 'Modificar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelectedUnidad(unidad:Unidad) {
  this.unidadSelected=unidad;
  this.setOpen();
  }
}