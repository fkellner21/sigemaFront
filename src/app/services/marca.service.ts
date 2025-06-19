import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marca } from '../models/marca';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class marcaService {
    token: string | null = null;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
        );
    }

    findAll(): Observable<Marca[]> {
        return this.http.get<Marca[]>(`${environment.apiUrl}/api/marcas`, {
            headers: this.headers,
        });
    }

    addNew(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>(
            `${environment.apiUrl}/api/marcas`,
            marca,
            {
                headers: this.headers,
            }
        );
    }
    edit(id: number, marca: Marca): Observable<Marca> {
        return this.http.put<Marca>(
            `${environment.apiUrl}/api/marcas/${id}`,
            marca,
            {
                headers: this.headers,
            }
        );
    }
}
