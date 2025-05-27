import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TipoEquipoComponent } from "./tipo/tipo-equipo.component";
//import { MaquinaComponent } from "./listado/maquina.component";
import { MarcaComponent } from "./marca/marca.component";
import { ModeloComponent } from './modelo/modelo.component';

/**
 * @title Basic use of the tab group
 */
@Component({
  selector: 'tabEquipos',
  templateUrl: 'tab.component.html',
  imports: [MatTabsModule, TipoEquipoComponent, MarcaComponent, ModeloComponent],
})
export class TabEquipos {}