import { Component, Input } from '@angular/core';
import { Tramite } from '../../../models/tramite';

@Component({
  selector: 'tramite-usuario-form',
  imports: [],
  templateUrl: './tramite-usuario-form.component.html',
  styleUrl: './tramite-usuario-form.component.css'
})
export class TramiteUsuarioFormComponent {
  @Input() tramite:Tramite;

  constructor(){
    this.tramite=new Tramite;
  }
}
