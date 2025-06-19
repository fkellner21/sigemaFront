import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MaquinaService {
    private baseUrl = `${environment.apiUrl}/api/equipos`;

    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        );
    }

    findAll(): Observable<Equipo[]> {
        return this.http
            .get<Equipo[]>(this.baseUrl, {
                headers: this.headers,
            })
            .pipe(
                map((equipos) =>
                    equipos.map((equipo) => {
                        if (equipo.unidad) {
                            equipo.idUnidad = equipo.unidad.id;
                        }
                        if (equipo.modeloEquipo) {
                            equipo.idModeloEquipo = equipo.modeloEquipo.id;
                        }
                        return equipo;
                    })
                )
            );
    }

    // Crear una nueva máquina
    addNew(maquina: Equipo): Observable<Equipo> {
        return this.http.post<Equipo>(this.baseUrl, maquina, {
            headers: this.headers,
        });
    }

    // Obtener máquina por ID
    findById(id: number): Observable<Equipo> {
        return this.http
            .get<Equipo>(`${this.baseUrl}/${id}`, {
                headers: this.headers,
            })
            .pipe(
                map((equipo) => {
                    if (equipo.unidad) {
                        equipo.idUnidad = equipo.unidad.id;
                    }
                    if (equipo.modeloEquipo) {
                        equipo.idModeloEquipo = equipo.modeloEquipo.id;
                    }
                    return equipo;
                })
            );
    }

    edit(id: number, maquina: Equipo): Observable<Equipo> {
        return this.http.put<Equipo>(`${this.baseUrl}/${id}`, maquina, {
            headers: this.headers,
        });
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {
            responseType: 'text',
            headers: this.headers,
        });
    }
}
