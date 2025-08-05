import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
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

@Component({
    selector: 'side-menu',
    standalone: true,
    imports: [
        RouterModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatBadgeModule,
        CommonModule,
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit, OnDestroy {
    isConfigOpen = false;

    // Recibe las notificaciones del componente padre (maquinas-app)
    @Input() notificaciones: Notificacion[] = [];
    
    // Ahora, solo emite eventos para que el padre gestione los modales
    @Output() abrirPerfilEvent = new EventEmitter<void>();
    @Output() abrirNotificacionesEvent = new EventEmitter<void>();

    intervaloSub?: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificacionesService: NotificacionesService
    ) {}

    ngOnInit() {
        this.authService
            .isTokenValid()
            .then((isValid) => {
                if (!isValid) {
                    this.router.navigate(['/login']);
                }
            })
            .catch(() => {
                this.router.navigate(['/login']);
            });

        // La carga de notificaciones y el polling se mueven al componente padre
        // para que sea el que gestione el estado global de la aplicación.
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

    // Este método ya no gestiona el formulario, solo emite un evento
    abrirModalNotificaciones() {
        this.abrirNotificacionesEvent.emit();
    }

    // Este método ya no gestiona el formulario, solo emite un evento
    abrirModalPerfil() {
        this.abrirPerfilEvent.emit();
    }
}