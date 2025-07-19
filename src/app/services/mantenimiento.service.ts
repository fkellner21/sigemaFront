import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../models/mantenimiento';

@Injectable({
    providedIn: 'root',
})
export class MantenimientoService {
    private baseUrl = `${environment.apiUrl}/mantenimientos`;

    constructor(private http: HttpClient) {}

    findAll(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    addNew(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
        return this.http.post<Mantenimiento>(this.baseUrl, mantenimiento);
    }
    edit(id: number, mantenimiento: Mantenimiento): Observable<Mantenimiento> {
        return this.http.put<Mantenimiento>(
            `${environment.apiUrl}/api/mantenimientos/${id}`,
            mantenimiento
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
