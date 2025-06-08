import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { modeloEquipo } from "../models/modeloEquipo";
import { ModeloEquipoDTO } from "../models/DTO/modeloEquipoDTO";
import { environment } from "../../environments/environment";
import { DocumentoModeloEquipo } from "../models/DocumentoModeloEquipo";

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

      cargarDocumentos(id:number):Observable<DocumentoModeloEquipo[]> {
      return this.http.get<DocumentoModeloEquipo[]>(`${environment.apiUrl}/api/modelosEquipo/${id}/documentos`);
      }

      subirDocumento(id:number, archivo:FormData){
        return this.http.post(`${environment.apiUrl}/api/modelosEquipo/${id}/documentos`, archivo)
      }

      eliminarDocumento(id: number) {
        return this.http.delete(`${environment.apiUrl}/api/modelosEquipo/documentos/${id}`);
      }

    }