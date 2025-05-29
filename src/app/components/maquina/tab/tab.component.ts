import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TipoEquipoComponent } from "./tipo/tipo-equipo.component";
import { MarcaComponent } from "./marca/marca.component";
import { ModeloComponent } from './modelo/modelo.component';
import { Marca } from '../../../models/marca';
import { TipoEquipo } from '../../../models/tipoEquipo';
import { marcaService } from '../../../services/marca.service';
import { tipoEquipoService } from '../../../services/tipoEquipo.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'tabEquipos',
  templateUrl: 'tab.component.html',
  imports: [MatTabsModule, TipoEquipoComponent, MarcaComponent, ModeloComponent],
})
export class TabEquipos implements OnInit{

  marcas: Marca[] = [];
  tipos: TipoEquipo[] = [];
  constructor(private marcaService: marcaService, private tipoService: tipoEquipoService) {}

  ngOnInit(): void {
  forkJoin({
    marcas: this.marcaService.findAll(),
    tipos: this.tipoService.findAll()
  }).subscribe(({ marcas, tipos }) => {
    this.marcas = marcas;
    this.tipos = tipos;
  });
  }
  loadTipos() {
    this.tipoService.findAll().subscribe(data => {
    this.marcas = [...data];  //genera una copia de los datos para que note el cambio
    });
  }
  loadMarcas() {
    this.marcaService.findAll().subscribe(data => {this.marcas = [...data]});
  }
}