import { Component, Input } from '@angular/core';
import { Tramite } from '../../../models/tramite';

@Component({
  selector: 'tramite-repuesto-form',
  imports: [],
  templateUrl: './tramite-repuesto-form.component.html',
  styleUrl: './tramite-repuesto-form.component.css'
})
export class TramiteRepuestoFormComponent {
  @Input() tramite:Tramite;

  constructor(){
    this.tramite=new Tramite;
  }
}
