import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { EquipoDashboardDTO } from '../models/DTO/EquipoDashboardDTO';

@Injectable({
    providedIn: 'root',
})
export class MaquinaService {
    private baseUrl = `${environment.apiUrl}/api/equipos`;

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Equipo[]> {
        return this.http
            .get<Equipo[]>(this.baseUrl)
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

    findAllDashboard(): Observable<EquipoDashboardDTO[]> {
        return this.http
            .get<EquipoDashboardDTO[]>(`${this.baseUrl}/dashboard`);
    }

    // Crear una nueva máquina
    addNew(maquina: Equipo): Observable<Equipo> {
        return this.http.post<Equipo>(this.baseUrl, maquina);
    }

    // Obtener máquina por ID
    findById(id: number): Observable<Equipo> {
        return this.http
            .get<Equipo>(`${this.baseUrl}/${id}`)
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
        return this.http.put<Equipo>(`${this.baseUrl}/${id}`, maquina,);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {
            responseType: 'text',
        });
    }

    generarReporteIndicadoresGestion(): Observable<any> {
        return this.http.get(`${this.baseUrl}/reporteIndicadoresGestion`, {
            responseType: 'blob',
        });
    }
}
