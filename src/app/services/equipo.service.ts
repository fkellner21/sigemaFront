//equipo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private baseUrl = `${environment.apiUrl}/api/equipos`;

  constructor(private http: HttpClient) {}

  // Obtener todas las máquinas
  findAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  // Crear una nueva máquina
  addNew(maquina: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.baseUrl, maquina);
  }

  // Obtener máquina por ID
  findById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.baseUrl}/${id}`);
  }

  // Editar máquina
  edit(id: number, maquina: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.baseUrl}/${id}`, maquina);
  }

  // Eliminar máquina
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
