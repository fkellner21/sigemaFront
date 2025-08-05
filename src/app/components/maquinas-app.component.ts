import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { UsuarioFormComponent } from '../components/usuarios/form/usuario-form.component'; // Asegúrate de que esta ruta sea correcta
import { Usuario } from '../models/usuario';
import { Rol } from '../models/enum/Rol';
import { Grado } from '../models/grado';
import { Unidad } from '../models/Unidad';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { gradoService } from '../services/grado.service';
import { UnidadService } from '../services/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'maquinas-app',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent, CommonModule, UsuarioFormComponent],
  templateUrl: './maquinas-app.component.html',
  styleUrls: ['./maquinas-app.component.css'],
})
export class MaquinasAppComponent implements OnInit {
  mostrarFormularioPerfil = false;
  usuario!: Usuario;
  usuarioOriginal!: Usuario;
  roles!: { key: string; label: string }[];
  grados: Grado[] = [];
  unidades: Unidad[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private gradosService: gradoService,
    private unidadService: UnidadService
  ) {}

  ngOnInit(): void {
    // Aquí puedes cargar datos iniciales si es necesario
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  abrirModalPerfil(): void {
    const idUsuario = this.authService.getIdUsuario();
    if (idUsuario) {
      // Cargar el usuario, grados y unidades para el formulario
      this.usuarioService.findById(idUsuario).subscribe({
        next: (resp) => {
          this.usuarioOriginal = resp;
          this.usuario = { ...this.usuarioOriginal }; // Clonar para evitar mutaciones directas
          this.roles = Object.keys(Rol).map((key) => ({ key, label: Rol[key as keyof typeof Rol] }));
          this.gradosService.findAll().subscribe(resp => this.grados = resp);
          this.unidadService.findAll().subscribe(resp => this.unidades = resp);
          this.mostrarFormularioPerfil = true;
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo cargar el usuario para el perfil. ' + err.error, 'error');
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarModalPerfil(): void {
    this.mostrarFormularioPerfil = false;
  }

  guardarUsuario(usuario: any): void {
    const request$ = usuario.id
      ? this.usuarioService.edit(usuario.id, usuario)
      : this.usuarioService.addNew(usuario);

    request$.subscribe({
      next: () => {
        this.cerrarModalPerfil();
        Swal.fire({
          icon: 'success',
          title: usuario.id ? 'Usuario actualizado' : 'Usuario creado',
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
          text: 'Ocurrió un error al guardar el usuario. ' + err.error,
        });
      },
    });
  }
}