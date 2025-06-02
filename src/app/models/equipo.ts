import { EstadoEquipo } from "./enum/EstadoEquipo";
import { modeloEquipo } from "./modeloEquipo";

export class Equipo{
    id!:number;
    matricula!:string;
    observaciones!:string;
    cantidadUnidadMedida!:number;
    idUltimaPosicion!:number;//todo cambiar por el objeto
    modeloEquipo!:modeloEquipo;
    estadoEquipo!:EstadoEquipo;
}