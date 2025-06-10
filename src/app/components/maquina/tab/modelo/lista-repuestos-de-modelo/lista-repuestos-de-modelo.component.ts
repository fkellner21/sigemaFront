import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'lista-repuestos-de-modelo',
  imports: [],
  templateUrl: './lista-repuestos-de-modelo.component.html',
  styleUrl: './lista-repuestos-de-modelo.component.css'
})
export class ListaRepuestosDeModeloComponent {
  @Input() modeloId: number | null=null;

}
