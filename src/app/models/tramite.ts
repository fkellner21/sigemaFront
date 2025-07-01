import { Actuacion } from "./actuacion";
import { EstadoTramite } from "./enum/EstadoTramite";
import { TipoTramite } from "./enum/TipoTramite";
import { Equipo } from "./equipo";
import { EstadoTramiteHistorico } from "./estadoTramiteHistorico";
import { Repuesto } from "./Repuesto";
import { Unidad } from "./Unidad";
import { Usuario } from "./usuario";

export class Tramite{
    id?:number;
    tipoTramite?: TipoTramite;
    estado?: EstadoTramite;
    fechaInicio?: Date;
    unidadOrigen?: Unidad;
    unidadDestino?: Unidad;
    usuario?: Usuario;
    equipo?: Equipo;
    repuesto?: Repuesto;
    texto?: string;
    historico?: EstadoTramiteHistorico[];
    actuaciones?: Actuacion[];
}