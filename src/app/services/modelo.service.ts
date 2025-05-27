import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { modeloEquipo } from "../models/modeloEquipo";

@Injectable({
  providedIn: 'root'
})

export class modeloService{
  
    constructor(private http:HttpClient) { }

      findAll():Observable<modeloEquipo[]>{
        return this.http.get<modeloEquipo[]>('http://localhost:8080/api/modelosEquipo');
      }

      addNew(modelo: modeloEquipo): Observable<modeloEquipo> {
        return this.http.post<modeloEquipo>('http://localhost:8080/api/modelosEquipo', modelo);
      }
      edit(id: number, modelo: modeloEquipo): Observable<modeloEquipo> {
        return this.http.put<modeloEquipo>(`http://localhost:8080/api/modelosEquipo/${id}`, modelo);
      }
    }