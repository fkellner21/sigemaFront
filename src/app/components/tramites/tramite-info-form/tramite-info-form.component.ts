import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tramite } from '../../../models/tramite';
import { Unidad } from '../../../models/Unidad';
import { EstadoTramite } from '../../../models/enum/EstadoTramite';
import { TipoTramite } from '../../../models/enum/TipoTramite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tramite-info-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './tramite-info-form.component.html',
  styleUrl: './tramite-info-form.component.css'
})
export class TramiteInfoFormComponent {
  @Input() tramite:Tramite;
  @Input() unidades!:Unidad[];
  @Output() cancelEventEmiter = new EventEmitter();
  nuevaActuacion:string='';

  constructor(){
    this.tramite=new Tramite;

  }
  isLoading = false;

  estadoOptions: { key: string; label: string }[] = [];
  tipoTramiteOptions: { key: string; label: string }[] = [];

  ngOnInit() {
    this.estadoOptions = this.enumToOptions(EstadoTramite);
    this.tipoTramiteOptions = this.enumToOptions(TipoTramite);
  }

  private enumToOptions(enumObj: any): { key: string; label: string }[] {
    return Object.entries(enumObj).map(([key, label]) => ({
      key,
      label: label as string,
    }));
  }

  onSubmit(){

  }
  onCancel(){
    this.cancelEventEmiter.emit();
  }

  guardarActuacion(){
    if (!this.nuevaActuacion.trim()) {
        return;
    }

    const textoActuacion = this.nuevaActuacion.trim();
  }
}
