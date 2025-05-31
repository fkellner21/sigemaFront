import { EstadoEquipo } from "./enum/EstadoEquipo";
import { UnidadMedida } from "./enum/UnidadMedida";
import { modeloEquipo } from "./modeloEquipo";

export class Equipo{
    id!:number;
    matricula!:string;
    observaciones!:string;
    unidadMedida!:UnidadMedida;
    cantidadUnidadMedida!:number;
    idUltimaPosicion!:number;//todo cambiar por el objeto
    modeloEquipo!:modeloEquipo;
    estadoEquipo!:EstadoEquipo;
}