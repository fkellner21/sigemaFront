// unidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/Unidad';  

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private baseUrl = 'http://tu-backend-api/api/unidades'; // Adaptar a api nuestra cuando la hagamos

  constructor(private http: HttpClient) {}

  // Obtener todas las unidades
  findAll(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.baseUrl);
  }

  // Obtener unidad por id
  findById(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.baseUrl}/${id}`);
  }

  // Crear nueva unidad
  addNew(unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(this.baseUrl, unidad);
  }

  // Actualizar unidad existente
  edit(id: number, unidad: Unidad): Observable<Unidad> {
    return this.http.put<Unidad>(`${this.baseUrl}/${id}`, unidad);
  }

  // Eliminar unidad
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
