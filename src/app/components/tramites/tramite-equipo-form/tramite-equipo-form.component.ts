import { Component, Input } from '@angular/core';
import { Tramite } from '../../../models/tramite';

@Component({
  selector: 'tramite-equipo-form',
  imports: [],
  templateUrl: './tramite-equipo-form.component.html',
  styleUrl: './tramite-equipo-form.component.css'
})
export class TramiteEquipoFormComponent {
  @Input() tramite:Tramite;

  constructor(){
    this.tramite=new Tramite;
  }
}
