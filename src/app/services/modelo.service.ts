import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { modeloEquipo } from '../models/modeloEquipo';
import { ModeloEquipoDTO } from '../models/DTO/modeloEquipoDTO';
import { environment } from '../../environments/environment';
import { DocumentoModeloEquipo } from '../models/DocumentoModeloEquipo';
import { TipoRepuesto } from '../models/enum/TipoRepuesto';
import { Repuesto } from '../models/Repuesto';
import { Equipo } from '../models/equipo';

@Injectable({
    providedIn: 'root',
})
export class modeloService {
    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        );
    }

    findAll(): Observable<modeloEquipo[]> {
        return this.http.get<modeloEquipo[]>(
            `${environment.apiUrl}/api/modelosEquipo`,
            {
                headers: this.headers,
            }
        );
    }

    addNew(modelo: modeloEquipo): Observable<ModeloEquipoDTO> {
        let modeloDTO: ModeloEquipoDTO = ModeloEquipoDTO.toDTO(modelo);
        return this.http.post<ModeloEquipoDTO>(
            `${environment.apiUrl}/api/modelosEquipo`,
            modeloDTO,
            {
                headers: this.headers,
            }
        );
    }
    edit(id: number, modelo: modeloEquipo): Observable<modeloEquipo> {
        let modeloDTO: ModeloEquipoDTO = ModeloEquipoDTO.toDTO(modelo);
        return this.http.put<modeloEquipo>(
            `${environment.apiUrl}/api/modelosEquipo/${id}`,
            modeloDTO,
            {
                headers: this.headers,
            }
        );
    }

    cargarDocumentos(id: number): Observable<DocumentoModeloEquipo[]> {
        return this.http.get<DocumentoModeloEquipo[]>(
            `${environment.apiUrl}/api/modelosEquipo/${id}/documentos`,
            {
                headers: this.headers,
            }
        );
    }

    subirDocumento(id: number, archivo: FormData) {
        return this.http.post(
            `${environment.apiUrl}/api/modelosEquipo/${id}/documentos`,
            archivo,
            {
                headers: this.headers,
            }
        );
    }

    eliminarDocumento(id: number) {
        return this.http.delete(
            `${environment.apiUrl}/api/modelosEquipo/documentos/${id}`,
            {
                headers: this.headers,
            }
        );
    }

    cargarRepuestos(id: number, tipo: TipoRepuesto): Observable<Repuesto[]> {
        return this.http.get<Repuesto[]>(
            `${environment.apiUrl}/api/modelosEquipo/${id}/repuestos/tipoRepuesto/${tipo}`,
            {
                headers: this.headers,
            }
        );
    }
    editarRepuesto(repuesto: Repuesto): Observable<any> {
        return this.http.put(
            `${environment.apiUrl}/api/repuestos/${repuesto.id}`,
            repuesto,
            { responseType: 'text', headers: this.headers }
        );
    }
    crearRepuesto(repuesto: Repuesto) {
        return this.http.post(`${environment.apiUrl}/api/repuestos`, repuesto, {
            responseType: 'text',
            headers: this.headers,
        });
    }
    cargarEquipos(id: number): Observable<Equipo[]> {
        return this.http.get<Equipo[]>(
            `${environment.apiUrl}/api/modelosEquipo/${id}/equipos`,
            {
                headers: this.headers,
            }
        );
    }
}