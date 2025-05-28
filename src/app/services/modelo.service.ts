import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { modeloEquipo } from "../models/modeloEquipo";
import { ModeloEquipoDTO } from "../models/DTO/modeloEquipoDTO";

@Injectable({
  providedIn: 'root'
})

export class modeloService{
  
    constructor(private http:HttpClient) { }

      findAll():Observable<modeloEquipo[]>{
        return this.http.get<modeloEquipo[]>('http://localhost:8080/api/modelosEquipo');
      }

      addNew(modelo: modeloEquipo): Observable<ModeloEquipoDTO> {
        let modeloDTO:ModeloEquipoDTO=ModeloEquipoDTO.toDTO(modelo);
        return this.http.post<ModeloEquipoDTO>('http://localhost:8080/api/modelosEquipo', modeloDTO);
      }
      edit(id: number, modelo: modeloEquipo): Observable<modeloEquipo> {
        return this.http.put<modeloEquipo>(`http://localhost:8080/api/modelosEquipo/${id}`, modelo);
      }
    }