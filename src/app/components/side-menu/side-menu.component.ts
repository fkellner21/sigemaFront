import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NotificacionesService } from '../../services/notificacion.service';
import { Notificacion } from '../../models/notificacion';
import { interval, Subscription } from 'rxjs';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component';

@Component({
    selector: 'side-menu',
    imports: [
        RouterModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatBadgeModule,
        CommonModule,
        NotificacionesComponent,
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit, OnDestroy {
    isConfigOpen = false;
    notificaciones: Notificacion[] = [];
    abrirFormularioNotificaciones = false;
    intervaloSub?: Subscription;

    @Output() abrirPerfilEvent = new EventEmitter<void>();

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificacionesService: NotificacionesService
    ) {}

    ngOnInit() {
        this.authService
            .isTokenValid()
            .then((isValid) => {
                if (isValid) {
                    this.cargarNotificaciones();
                    this.intervaloSub = interval(3 * 60 * 1000).subscribe(() => {
                        this.cargarNotificaciones();
                    });
                } else {
                    this.router.navigate(['/login']);
                }
            })
            .catch(() => {
                this.router.navigate(['/login']);
            });
    }

    ngOnDestroy(): void {
        if (this.intervaloSub) {
            this.intervaloSub.unsubscribe();
        }
    }

    toggleConfig() {
        this.isConfigOpen = !this.isConfigOpen;
    }

    onClick(event: MouseEvent) {
        const el = event.currentTarget as HTMLElement;
        setTimeout(() => el.blur(), 0);
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    cargarNotificaciones() {
        this.notificacionesService.findAll().subscribe({
            next: (resp) => {
                this.notificaciones = resp;
            },
            error: (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar las notificaciones. ' + err.error,
                    icon: 'error',
                });
            },
        });
    }

    mostrarFormularioNotificaciones() {
        this.abrirFormularioNotificaciones = true;
    }

    cerrarFormularioNotificaciones() {
        this.abrirFormularioNotificaciones = false;
    }

    abrirModalPerfil() {
        // Simplemente emitimos un evento para que el componente padre abra el modal
        this.abrirPerfilEvent.emit();
    }
}