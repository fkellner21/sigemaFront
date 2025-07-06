import { EstadoTramite } from "./enum/EstadoTramite";
import { Usuario } from "./usuario";

export class EstadoTramiteHistorico {
    estadoTramite?: EstadoTramite;
    fecha?: Date;
    usuario?: Usuario;
}