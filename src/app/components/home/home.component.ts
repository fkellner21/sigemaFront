import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MapComponent } from './map/map.component';
import { EquipoDashboardDTO } from '../../models/DTO/EquipoDashboardDTO';
import { MaquinaService } from '../../services/equipo.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartEstadoComponent } from "./chart-estado/chart-estado.component";
import { ChartCapacidadComponent } from './chart-capacidad/chart-capacidad.component';

@Component({
  selector: 'home',
  imports: [MapComponent, NgApexchartsModule, ChartEstadoComponent, ChartCapacidadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  equiposDTO:EquipoDashboardDTO[]=[];
  equipoService:MaquinaService
  equiposEnVerde:number=0;
  equiposEnAmarillo:number=0;
  equiposEnRojo:number=0;
  equiposEnNegro:number=0;
  verde:string="Verde";
  amarillo:string="Amarillo";
  rojo:string="Rojo";
  negro:string="Negro";

  constructor(equiposService:MaquinaService){
    this.equipoService=equiposService;
  }
  
  ngOnInit(): void {
    this.equipoService.findAllDashboard().subscribe(data=>{
      this.equiposDTO=[...data];    
      this.equiposDTO.forEach(equipo => {
        switch(equipo.estado){
          case "Verde":
            this.equiposEnVerde++;
            break;
          case "Amarillo":
            this.equiposEnAmarillo++;
            break;
          case "Rojo":
            this.equiposEnRojo++;
            break;
          case "Negro":
            this.equiposEnNegro++;
            break;
          default:
            break;
        }
      });
      this.transformarAporcentajes();
    })
  }
  transformarAporcentajes() {
    let total:number = this.equiposEnVerde+this.equiposEnAmarillo+this.equiposEnRojo+this.equiposEnNegro;
    this.equiposEnVerde=this.equiposEnVerde/total*100;
    this.equiposEnAmarillo=this.equiposEnAmarillo/total*100;
    this.equiposEnRojo=this.equiposEnRojo/total*100;
    this.equiposEnNegro=this.equiposEnNegro/total*100;
  }


}

