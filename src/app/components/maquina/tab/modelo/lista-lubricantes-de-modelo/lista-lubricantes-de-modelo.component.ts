import { Component, Input, OnInit } from '@angular/core';
import { Repuesto } from '../../../../../models/Repuesto';
import { modeloService } from '../../../../../services/modelo.service';
import { TipoRepuesto } from '../../../../../models/enum/TipoRepuesto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lista-lubricantes-de-modelo',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule],
  templateUrl: './lista-lubricantes-de-modelo.component.html',
  styleUrl: './lista-lubricantes-de-modelo.component.css'
})

export class ListaLubricantesDeModeloComponent implements OnInit{
  @Input() modeloId: number | null=null;
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
    this.open=false;
    //abre el modal
  }
}
