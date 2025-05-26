import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TipoEquipoComponent } from "./tipo/tipo-equipo.component";
import { MaquinasAppComponent } from "../../maquinas-app.component";
import { MaquinaComponent } from "./listado/maquina.component";

/**
 * @title Basic use of the tab group
 */
@Component({
  selector: 'tabEquipos',
  templateUrl: 'tab.component.html',
  imports: [MatTabsModule, TipoEquipoComponent, MaquinaComponent],
})
export class TabEquipos {}