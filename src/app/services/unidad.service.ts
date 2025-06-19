// unidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/Unidad';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UnidadService {
    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        );
    }

    findAll(): Observable<Unidad[]> {
        return this.http.get<Unidad[]>(`${environment.apiUrl}/api/unidades`, {
            headers: this.headers,
        });
    }

    findById(id: number): Observable<Unidad> {
        return this.http.get<Unidad>(
            `${environment.apiUrl}/api/unidades/${id}`,
            {
                headers: this.headers,
            }
        );
    }

    addNew(unidad: Unidad): Observable<Unidad> {
        return this.http.post<Unidad>(
            `${environment.apiUrl}/api/unidades`,
            unidad,
            {
                headers: this.headers,
            }
        );
    }

    edit(id: number, unidad: Unidad): Observable<Unidad> {
        return this.http.put<Unidad>(
            `${environment.apiUrl}/api/unidades/${id}`,
            unidad,
            {
                headers: this.headers,
            }
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiUrl}/api/unidades/${id}`,
            {
                headers: this.headers,
            }
        );
    }
}
