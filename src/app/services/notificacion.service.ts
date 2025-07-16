import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Notificacion } from "../models/notificacion";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root',
})
export class NotificacionesService {

    constructor(private http: HttpClient) {

    }

    findAllByUser(idUsuario:number):Observable<Notificacion[]>{
        return this.http.get<Notificacion[]>(`${environment.apiUrl}/api/notificaciones/${idUsuario}`);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiUrl}/api/notificaciones/${id}`);
    }

}