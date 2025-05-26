import { map, Observable, of } from "rxjs";
import { TipoEquipo } from "../models/tipoEquipo";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class tipoEquipoService{
  
    constructor(private http:HttpClient) { }

      findAll():Observable<TipoEquipo[]>{
        return this.http.get<TipoEquipo[]>('http://localhost:8080/api/tiposEquipos/activos/true');
      }

      addNew(tipoEquipo: TipoEquipo): Observable<TipoEquipo> {
        return this.http.post<TipoEquipo>('http://localhost:8080/api/tiposEquipos/', tipoEquipo);
      }
      edit(id: number, tipoEquipo: TipoEquipo): Observable<TipoEquipo> {
        return this.http.put<TipoEquipo>(`http://localhost:8080/api/tiposEquipos/${id}`, tipoEquipo);
      }
    }