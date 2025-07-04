import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectCommand, Router, RouterModule } from '@angular/router';
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
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
    notificationCount = 2;
    isConfigOpen = false;
    roles!: { key: string; label: string }[];
    grados: Grado[] = [];
    unidades: Unidad[] = [];
    usuarioOriginal!: Usuario;
    usuario!: Usuario;
    mostrarFormularioPerfil = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private usuarioService: UsuarioService,
        private gradosService: gradoService,
        private unidadService: UnidadService
    ) {}

    ngOnInit() {
             this.authService.isTokenValid().then((isValid) => {
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
            } else {
                    this.router.navigate(['/login']);
                }
            }).catch(() => {
                this.router.navigate(['/login']);
            });
           
            
            let idUsuario = this.authService.getIdUsuario();
            if(idUsuario!=null){
                this.usuarioService.findById(idUsuario ?? 0).subscribe({
                    next: (resp) => {
                        this.usuarioOriginal = resp;
                    },
                    error: (err) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo cargar el usuario. ' + err.error,
                            icon: 'error',
                        });
                    },
                });
            }else{
                this.router.navigate(['/login'])
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

    abrirModalPerfil() {
        this.usuario= { ...this.usuarioOriginal }
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
                    this.mostrarFormularioPerfil = true;
                },
                error: (err) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudieron cargar las unidades. ' + err.error,
                        icon: 'error',
                    });
                },
            });
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
                    text: 'Ocurrió un error al guardar el usuario. '+err.error,
                });
            },
        });
    }
}
