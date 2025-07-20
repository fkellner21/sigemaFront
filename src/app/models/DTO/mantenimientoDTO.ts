import { UnidadMedida } from "../enum/UnidadMedida";

export class MantenimientoDTO{
    id?: number;
    fechaRegistro?: string;
    fechaMantenimiento?: string;
    descripcion?: string;
    idEquipo?: number;
    unidadMedida?: UnidadMedida;
    cantidadUnidadMedida?: number;
    esService?: boolean;
    //repuestosMantenimiento?: RepuestoMantenimiento[];
}