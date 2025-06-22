import {
    Component,
    EventEmitter,
    Output,
    Input,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grado } from '../../../models/grado';
import { Unidad } from '../../../models/Unidad';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {
    @Input() usuario: any = {};
    @Input() roles!: { key: string; label: string }[];
    @Input() unidades!: Unidad[];
    @Input() grados!: Grado[];

    @Output() cerrar = new EventEmitter<void>();
    @Output() guardarUsuario = new EventEmitter<any>();
    noPermitirEditarRol = false;
    noPermitirEditarUnidad = false;

    constructor(private authService: AuthService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['usuario'] && this.usuario) {
            let idUsuario = this.authService.getIdUsuario();
            console.log(idUsuario);
            console.log(this.usuario);

            this.usuario.idUnidad ??= null;
            this.usuario.idGrado ??= null;
            this.usuario.rol ??= '';

            if (this.usuario.grado != null) {
                this.usuario.idGrado = this.usuario.grado.id;
            }

            if (this.usuario.unidad != null) {
                this.usuario.idUnidad = this.usuario.unidad.id;
            }

            if (idUsuario == this.usuario.id) {
                this.noPermitirEditarRol = true;
                this.noPermitirEditarUnidad = true;
            } else {
                this.noPermitirEditarRol = false;
                this.noPermitirEditarUnidad = false;
            }
        }
    }

    onSubmit() {
        this.guardarUsuario.emit(this.usuario);
    }

    onCancel() {
        this.cerrar.emit();
    }
}
