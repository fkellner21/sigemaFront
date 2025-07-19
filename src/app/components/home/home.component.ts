import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MapComponent } from './map/map.component';
import { EquipoDashboardDTO } from '../../models/DTO/EquipoDashboardDTO';
import { MaquinaService } from '../../services/equipo.service';

@Component({
  selector: 'home',
  imports: [MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  equiposDTO:EquipoDashboardDTO[]=[];
  equipoService:MaquinaService

  constructor(equiposService:MaquinaService){
    this.equipoService=equiposService;
  }
  
  ngOnInit(): void {
    this.equipoService.findAllDashboard().subscribe(data=>{
      this.equiposDTO=[...data];    
    })
  }


}
