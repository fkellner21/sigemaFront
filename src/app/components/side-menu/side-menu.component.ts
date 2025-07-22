import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { gradoService } from '../../services/grado.service';
import { UnidadService } from '../../services/unidad.service';
import Swal from 'sweetalert2';
import { Rol } from '../../models/enum/Rol';
import { Grado } from '../../models/grado';
import { Unidad } from '../../models/Unidad';
import { Usuario } from '../../models/usuario';
import { UsuarioFormComponent } from '../usuarios/form/usuario-form.component';
import { NotificacionesService } from '../../services/notificacion.service';
import { Notificacion } from '../../models/notificacion';
import { interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
        UsuarioFormComponent,
        NotificacionesComponent,
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit, OnDestroy {
    isConfigOpen = false;
    roles!: { key: string; label: string }[];
    grados: Grado[] = [];
    unidades: Unidad[] = [];
    usuarioOriginal!: Usuario;
    usuario!: Usuario;
    notificaciones: Notificacion[] = [];
    mostrarFormularioPerfil = false;
    abrirFormularioNotificaciones = false;
    intervaloSub?: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService,
        private usuarioService: UsuarioService,
        private gradosService: gradoService,
        private unidadService: UnidadService,
        private notificacionesService: NotificacionesService
    ) {}

    ngOnInit() {
        this.authService
            .isTokenValid()
            .then((isValid) => {
                if (isValid) {
                    this.roles = Object.keys(Rol).map((key) => ({
                        key: key,
                        label: Rol[key as keyof typeof Rol],
                    }));

                    this.gradosService.findAll().subscribe({
                        next: (resp) => {
                            this.grados = resp;
                        },
                        error: (err) => {
                            Swal.fire({
                                title: 'Error',
                                text:
                                    'No se pudieron cargar los grados. ' +
                                    err.error,
                                icon: 'error',
                            });
                        },
                    });

                    this.unidadService.findAll().subscribe({
                        next: (resp) => {
                            this.unidades = resp;
                        },
                        error: (err) => {
                            Swal.fire({
                                title: 'Error',
                                text:
                                    'No se pudieron cargar las unidades. ' +
                                    err.error,
                                icon: 'error',
                            });
                        },
                    });
                } else {
                    this.router.navigate(['/login']);
                }
            })
            .catch(() => {
                this.router.navigate(['/login']);
            });

        let idUsuario = this.authService.getIdUsuario();
        if (idUsuario != null) {
            this.usuarioService.findById(idUsuario ?? 0).subscribe({
                next: (resp) => {
                    this.usuarioOriginal = resp;

                    this.cargarNotificaciones();

                    this.intervaloSub = interval(3 * 60 * 1000).subscribe(
                        () => {
                            this.cargarNotificaciones();
                        }
                    );
                },
                error: (err) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo cargar el usuario. ' + err.error,
                        icon: 'error',
                    });
                },
            });
        } else {
            this.router.navigate(['/login']);
        }
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
                    text:
                        'No se pudieron cargar las notificaciones. ' +
                        err.error,
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
        this.usuario = { ...this.usuarioOriginal };
        this.gradosService.findAll().subscribe({
            next: (resp) => {
                this.grados = resp;
            },
            error: (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los grados. ' + err.error,
                    icon: 'error',
                });
            },
        });

        this.unidadService.findAll().subscribe({
            next: (resp) => {
                this.unidades = resp;
            },
            error: (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar las unidades. ' + err.error,
                    icon: 'error',
                });
            },
        });

        let idUsuario = this.authService.getIdUsuario();
        if (idUsuario != null) {
            this.usuarioService.findById(idUsuario ?? 0).subscribe({
                next: (resp) => {
                    this.usuarioOriginal = resp;
                    this.usuario = { ...this.usuarioOriginal };
                    this.mostrarFormularioPerfil = true;
                },
                error: (err) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo cargar el usuario. ' + err.error,
                        icon: 'error',
                    });
                },
            });
        }
    }

    cerrarModalPerfil() {
        this.mostrarFormularioPerfil = false;
    }

    guardarUsuario(usuario: any) {
        const request$ = usuario.id
            ? this.usuarioService.edit(usuario.id, usuario)
            : this.usuarioService.addNew(usuario);

        request$.subscribe({
            next: () => {
                this.cerrarModalPerfil();

                Swal.fire({
                    icon: 'success',
                    title: usuario.id
                        ? 'Usuario actualizado'
                        : 'Usuario creado',
                    text: usuario.id
                        ? 'El usuario ha sido actualizado correctamente.'
                        : 'El usuario ha sido creado correctamente.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
            error: (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text:
                        'Ocurrió un error al guardar el usuario. ' + err.error,
                });
            },
        });
    }
}
