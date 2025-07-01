// unidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tramite } from '../models/tramite';
import { Actuacion } from '../models/actuacion';
import { EstadoTramite } from '../models/enum/EstadoTramite';
import { TramiteDTO } from '../models/DTO/tramiteDTO';

@Injectable({
    providedIn: 'root',
})
export class TramiteService {
    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Tramite[]> {
        return this.http.get<Tramite[]>(`${environment.apiUrl}/api/tramites`);
    }

    findById(id: number): Observable<Tramite> {
        return this.http.get<Tramite>(
            `${environment.apiUrl}/api/tramites/${id}`);
    }

    addNew(tramite:TramiteDTO): Observable<Tramite> {
        return this.http.post<Tramite>(
            `${environment.apiUrl}/api/tramites`,
            tramite);
    }

    edit(id: number, tramite: TramiteDTO): Observable<Tramite> {
        return this.http.put<Tramite>(
            `${environment.apiUrl}/api/tramites/${id}`,
            tramite);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiUrl}/api/tramites/${id}`);
    }

    newActuacion(id:number, actuacion:Actuacion): Observable<Actuacion>{
        return this.http.post<Actuacion>(
            `${environment.apiUrl}/api/tramites/${id}/actuacion`, actuacion);
    }

    changeEstado(id:number, estado:EstadoTramite): Observable<Tramite>{
        return this.http.post<Tramite>(
            `${environment.apiUrl}/api/tramites/${id}/estado`, estado);
    }
}
