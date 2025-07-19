import { DocumentoModeloEquipo } from "./DocumentoModeloEquipo";
import { UnidadMedida } from "./enum/UnidadMedida";
import { Equipo } from "./equipo";
import { Marca } from "./marca";
import { Repuesto } from "./Repuesto";
import { TipoEquipo } from "./tipoEquipo";

    export class modeloEquipo{
        id!:number;
        anio!:number;
        modelo!:string;
        capacidad!:number;
        marca!:Marca;
        tipoEquipo!:TipoEquipo;
        equipos!:Array<Equipo>;
        repuestos!:Array<Repuesto>;
        unidadMedida!:UnidadMedida;
        documentos!:Array<DocumentoModeloEquipo>;
        frecuenciaUnidadMedida!: number;
        frecuenciaTiempo!: number;
    }