import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../models/mantenimiento';
import { MantenimientoDTO } from '../models/DTO/mantenimientoDTO';

@Injectable({
    providedIn: 'root',
})
export class MantenimientoService {
    // Asegúrate de que la ruta sea consistente
    private baseUrl = `${environment.apiUrl}/api/mantenimientos`;

    constructor(private http: HttpClient) {}

    findAll(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    addNew(mantenimiento: MantenimientoDTO): Observable<Mantenimiento> {
        return this.http.post<Mantenimiento>(this.baseUrl, mantenimiento);
    }

    edit(id: number, mantenimiento: MantenimientoDTO): Observable<Mantenimiento> {
        return this.http.put<Mantenimiento>(
            `${this.baseUrl}/${id}`, 
            mantenimiento
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    obtenerPorEquipo(idEquipo: number): Observable<Mantenimiento[]> {
        return this.http.get<Mantenimiento[]>(`${this.baseUrl}/equipo/${idEquipo}`);
    }
}