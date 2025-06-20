import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {

    }

    findAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuarios`);
    }

    findById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(
            `${environment.apiUrl}/api/usuarios/${id}` );
    }

    addNew(unidad: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(
            `${environment.apiUrl}/api/usuarios`,
            unidad);
    }

    edit(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(
            `${environment.apiUrl}/api/usuarios/${id}`,
            usuario);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiUrl}/api/usuarios/${id}`);
    }
}
