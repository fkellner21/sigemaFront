import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { modeloEquipo } from "../models/modeloEquipo";
import { ModeloEquipoDTO } from "../models/DTO/modeloEquipoDTO";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class modeloService{
  
    constructor(private http:HttpClient) { }

      findAll():Observable<modeloEquipo[]>{
        return this.http.get<modeloEquipo[]>(`${environment.apiUrl}/api/modelosEquipo`);
      }

      addNew(modelo: modeloEquipo): Observable<ModeloEquipoDTO> {
        let modeloDTO:ModeloEquipoDTO=ModeloEquipoDTO.toDTO(modelo);
        return this.http.post<ModeloEquipoDTO>(`${environment.apiUrl}/api/modelosEquipo`, modeloDTO);
      }
      edit(id: number, modelo: modeloEquipo): Observable<modeloEquipo> {
        let modeloDTO:ModeloEquipoDTO=ModeloEquipoDTO.toDTO(modelo);
        return this.http.put<modeloEquipo>(`${environment.apiUrl}/api/modelosEquipo/${id}`, modeloDTO);
      }
    }