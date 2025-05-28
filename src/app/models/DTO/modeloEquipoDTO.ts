import { Equipo } from "../equipo";
import { Marca } from "../marca";
import { modeloEquipo } from "../modeloEquipo";
import { Repuesto } from "../Repuesto";
import { TipoEquipo } from "../tipoEquipo";

export class ModeloEquipoDTO{
    id!:number;
    anio!:number;
    modelo!:string;
    capacidad!:number;
    idMarca!:number;
    idTipoEquipo!:number;
    equipos!:Array<Equipo>;
    repuestos!:Array<Repuesto>;

    constructor(){}

    static toDTO(modelo:modeloEquipo):ModeloEquipoDTO{
        let salida = new ModeloEquipoDTO();

        salida.id = modelo.id;
        salida.anio = modelo.anio;
        salida.modelo = modelo.modelo;
        salida.capacidad = modelo.capacidad;
        salida.idMarca = modelo.marca?.id ?? 0;
        salida.idTipoEquipo = modelo.tipoEquipo?.id ?? 0;
        salida.equipos = modelo.equipos ?? [];
        salida.repuestos = modelo.repuestos ?? [];
        return salida;
  }
}