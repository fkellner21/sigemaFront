import { EstadoEquipo } from "./enum/EstadoEquipo";
import { modeloEquipo } from "./modeloEquipo";
import { Posicion } from "./posicion";

export class Equipo{
    id!:number;
    matricula!:string;
    observaciones!:string;
    cantidadUnidadMedida!:number;
    ultimaPosicion!:Posicion;//todo cambiar por el objeto
    modeloEquipo!:modeloEquipo;
    estadoEquipo!:EstadoEquipo;
}