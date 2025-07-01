import { TipoTramite } from "../enum/TipoTramite";

export class TramiteDTO {
    tipoTramite?: TipoTramite;
    idUnidadOrigen?: number;
    idUnidadDestino?: number;
    idEquipo?: number;
    idRepuesto?: number;
    texto?: string;
}