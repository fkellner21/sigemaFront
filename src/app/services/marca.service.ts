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
    }

    findAll(): Observable<Marca[]> {
        return this.http.get<Marca[]>(`${environment.apiUrl}/api/marcas`);
    }

    addNew(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>(
            `${environment.apiUrl}/api/marcas`,
            marca);
    }
    edit(id: number, marca: Marca): Observable<Marca> {
        return this.http.put<Marca>(
            `${environment.apiUrl}/api/marcas/${id}`,
            marca);
    }
}
