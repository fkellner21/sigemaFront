import { Rol } from "./enum/Rol";

    export class Usuario{
        id!:number;
        nombreCompleto!:string;
        password!:string;
        idGrado!:number;
        idUnidad!:number;
        telefono!:number;
        rol!:Rol;

    }