// unidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/Unidad';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  constructor(private http: HttpClient) {}

  // Obtener todas las unidades
  findAll(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${environment.apiUrl}/api/unidades`);
  }

  // Obtener unidad por id
  findById(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${environment.apiUrl}/api/unidades/${id}`);
  }

  // Crear nueva unidad
  addNew(unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(`${environment.apiUrl}/api/unidades`, unidad);
  }

  // Actualizar unidad existente
  edit(id: number, unidad: Unidad): Observable<Unidad> {
    return this.http.put<Unidad>(`${environment.apiUrl}/api/unidades/${id}`, unidad);
  }

  // Eliminar unidad
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/unidades/${id}`);
  }
}
