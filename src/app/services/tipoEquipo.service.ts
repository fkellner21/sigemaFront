import { Observable } from 'rxjs';
import { TipoEquipo } from '../models/tipoEquipo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class tipoEquipoService {
    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        );
    }

    findAll(): Observable<TipoEquipo[]> {
        return this.http.get<TipoEquipo[]>(
            `${environment.apiUrl}/api/tiposEquipos/activos/true`,
            {
                headers: this.headers,
            }
        );
    }

    addNew(tipoEquipo: TipoEquipo): Observable<TipoEquipo> {
        return this.http.post<TipoEquipo>(
            `${environment.apiUrl}/api/tiposEquipos/`,
            tipoEquipo,
            {
                headers: this.headers,
            }
        );
    }
    edit(id: number, tipoEquipo: TipoEquipo): Observable<TipoEquipo> {
        return this.http.put<TipoEquipo>(
            `${environment.apiUrl}/api/tiposEquipos/${id}`,
            tipoEquipo,
            {
                headers: this.headers,
            }
        );
    }
}
