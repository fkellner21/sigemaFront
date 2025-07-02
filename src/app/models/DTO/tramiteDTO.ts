import { TipoTramite } from "../enum/TipoTramite";
import { Tramite } from "../tramite";

export class TramiteDTO {
    tipoTramite?: TipoTramite;
    idUnidadOrigen?: number;
    idUnidadDestino?: number;
    idEquipo?: number;
    idRepuesto?: number;
    texto?: string;

    static toDto(tramite:Tramite):TramiteDTO{
        let salida = new TramiteDTO();

        salida.tipoTramite = tramite.tipoTramite;
        salida.idEquipo = tramite.equipo?.id??0;
        salida.idRepuesto = tramite.repuesto?.id??0;
        salida.idUnidadDestino = tramite.unidadDestino?.id??0;
        salida.idUnidadOrigen = tramite.unidadOrigen?.id??0 ;
        salida.texto = tramite.texto??'';

        return salida;
    }

}