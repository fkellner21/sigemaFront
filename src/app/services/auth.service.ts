import { Injectable } from '@angular/core';
import { LoginDTO } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRespuestaDTO } from '../models/DTO/loginRespuestaDTO';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { tipoEquipoService } from './tipoEquipo.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private rolUsuario: string | null = null;
    private baseUrl = `${environment.apiUrl}/api/login`;

    constructor(
        private http: HttpClient,
        private tipoEquipoService: tipoEquipoService
    ) {}

    setRol(rol: string): void {
        this.rolUsuario = rol;
    }

    getRol(): string | null {
        return this.rolUsuario;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
        this.rolUsuario = null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    login(loginDTO: LoginDTO): Observable<LoginRespuestaDTO> {
    return this.http.post<LoginRespuestaDTO>(this.baseUrl, loginDTO).pipe(
        map(res => {
            if (res && res.token) {
                localStorage.setItem('token', res.token);
                this.setRol(res.rol);
            }
            return res;
        })
    );
    }

    isTokenValid(): Promise<boolean> {
        const token = localStorage.getItem('token');
        
        // Validación del formato JWT
        if (!token || token.split('.').length !== 3) {
            return Promise.resolve(false); // ni intenta la llamada si no hay token válido
        }

        return firstValueFrom(
            this.tipoEquipoService.findAll().pipe(
            map(() => true),
            catchError(() => of(false))
            )
        );
    }
}
