import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UsuarioService {

  constructor(private http: HttpClient) {}


  // Obtener todas las Usuario
  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuarios`);
  }

  // Obtener Usuario por id
  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/api/usuarios/${id}`);
  }

  // Crear nueva Usuario
  addNew(unidad: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/api/usuarios`, unidad);
  }

  // Actualizar Usuario 
  edit(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.apiUrl}/api/usuarios/${id}`, usuario);
  }

  // Eliminar Usuario
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/usuarios/${id}`);
  }
}
