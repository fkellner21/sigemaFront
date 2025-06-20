import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {
  @Input() usuario: any = {};
  @Input() roles!: { key: string; label: string }[];

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardarUsuario = new EventEmitter<any>();

  onSubmit() {
    this.guardarUsuario.emit(this.usuario);
  }

  onCancel() {
    this.cerrar.emit();
  }
}
