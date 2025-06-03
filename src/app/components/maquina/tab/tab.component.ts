import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TipoEquipoComponent } from "./tipo/tipo-equipo.component";
import { MarcaComponent } from "./marca/marca.component";
import { ModeloComponent } from './modelo/modelo.component';
import { Marca } from '../../../models/marca';
import { TipoEquipo } from '../../../models/tipoEquipo';
import { marcaService } from '../../../services/marca.service';
import { tipoEquipoService } from '../../../services/tipoEquipo.service';
import { MaquinaService } from '../../../services/equipo.service';
import { MaquinaComponent } from './listado/maquina.component';

import { forkJoin } from 'rxjs';
import { Equipo } from '../../../models/equipo';

@Component({
  selector: 'tabEquipos',
  templateUrl: 'tab.component.html',
  imports: [MatTabsModule, TipoEquipoComponent, MarcaComponent, ModeloComponent, MaquinaComponent],

})
export class TabEquipos implements OnInit{

  marcas: Marca[] = [];
  tipos: TipoEquipo[] = [];
  maquinas: Equipo[] = [];

 constructor(
  private marcaService: marcaService,
  private tipoService: tipoEquipoService,
  private maquinaService: MaquinaService
) {}


ngOnInit(): void {
  forkJoin({
    marcas: this.marcaService.findAll(),
    tipos: this.tipoService.findAll(),
    maquinas: this.maquinaService.findAll()
  }).subscribe(({ marcas, tipos, maquinas }) => {
    this.marcas = marcas;
    this.tipos = tipos;
    this.maquinas = maquinas;
  });
}

  loadTipos() {
    this.tipoService.findAll().subscribe(data => {
    this.tipos = [...data];  //genera una copia de los datos para que note el cambio
    });
  }
  loadMarcas() {
    this.marcaService.findAll().subscribe(data => {this.marcas = [...data]});
  }

  
  loadMaquinas() {
    this.maquinaService.findAll().subscribe(data => this.maquinas = [...data]);
  }
}