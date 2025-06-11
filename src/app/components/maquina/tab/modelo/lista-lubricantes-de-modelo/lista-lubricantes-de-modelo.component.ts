import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repuesto } from '../../../../../models/Repuesto';
import { modeloService } from '../../../../../services/modelo.service';
import { TipoRepuesto } from '../../../../../models/enum/TipoRepuesto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RepuestoFormComponent } from '../repuesto-form/repuesto-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'lista-lubricantes-de-modelo',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule, RepuestoFormComponent],
  templateUrl: './lista-lubricantes-de-modelo.component.html',
  styleUrl: './lista-lubricantes-de-modelo.component.css'
})

export class ListaLubricantesDeModeloComponent implements OnInit{
  @Input() modeloId: number | null=null;
  @Output() newRepuestoEventEmitter:EventEmitter<Repuesto>=new EventEmitter()
  lubricantes!:Array<Repuesto>;
  isLoading:boolean=false;
  dataSource = new MatTableDataSource<Repuesto>([]);
  open:boolean=false;
  repuestoSelected:Repuesto=new Repuesto();

  constructor(private service:modeloService){}
  
  ngOnInit(): void {
    this.refresh()
  }

  refresh():void{
    this.isLoading=true;
    this.service.cargarRepuestos(this.modeloId??0, TipoRepuesto.Lubricante).subscribe(lubricantes=>{
      this.lubricantes=lubricantes;
      this.dataSource=new MatTableDataSource(lubricantes);
      this.isLoading=false;
    })
  }

  displayedColumns: string[] = [
  'codigo',
  'nombre',
  'cantidad',
  'acciones'
  ];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editarRepuesto(repuesto:Repuesto){
    this.repuestoSelected=repuesto
    this.open=true;
    //abre el modal de repuestos
  }

  setNew(){
    this.repuestoSelected=new Repuesto();
    this.repuestoSelected.tipo=TipoRepuesto.Lubricante
    this.open=true;
    //abre el modal
  }
  addRepuesto(repuesto:Repuesto){
   if(repuesto.id>0){ //es una modificacion
      this.service.editarRepuesto(repuesto).subscribe({
          
      next: (resp) => {
        Swal.fire({
        title: "Editado!",
        text: "Lubricante actualizado correctamente!",
        icon: "success"
      });
      //refresh de datos
      this.refresh();
    },
    error: (err) => {
      Swal.fire({
        title: "Error",
        text: "No se pudo editar el lubricante. "+err.error,
        icon: "error"
      });
      //refresh de datos
      this.refresh();
    }
  });
    }else{
      //peticion al back
      this.service.crearRepuesto(repuesto).subscribe({next:(resp)=>{
        Swal.fire({
          title: "Guardado!",
          text: "Lubricante agregado con éxito!",
          icon: "success"
        });
        //refresh de datos
        this.refresh();
      },
      error:(err)=>{
        Swal.fire({
          title: "Error",
          text: "No se pudo agregar el lubricante. "+ err.error,
          icon: "error"
        });
        this.refresh();
      }
    });
    }
  }
  setOpen(){
    this.open=false;
  }
}
