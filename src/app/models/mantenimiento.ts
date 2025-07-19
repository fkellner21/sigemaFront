import { UnidadMedida } from "./enum/UnidadMedida";

export class Mantenimiento{
    id?: number;
    fechaRegistro?: Date;
    fechaMantenimiento?: Date;
    descripcion?: string;
    idEquipo?: number;
    unidadMedida?: UnidadMedida;
    cantidadUnidadMedida?: number;
    esServicio?: boolean;
    //repuestosMantenimiento?: RepuestoMantenimiento[];
}