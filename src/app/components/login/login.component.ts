import { Component } from '@angular/core';
import { LoginDTO } from '../../models/login';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule],
})
export class LoginComponent {
    loginDTO: LoginDTO = new LoginDTO();

    constructor(private service: AuthService, private router: Router) {}

    onSubmit(login: NgForm): void {
        if (login.valid) {
            this.service.login(this.loginDTO).subscribe({
                next: (resp) => {
                    localStorage.setItem('token', resp.token);
                    this.service.setRol(resp.rol);
                    this.router.navigate(['/home']);
                },
                error: (err) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Cedula y/o Contraseña incorrecta',
                        icon: 'error',
                    });
                },
            });
        }

        login.reset();
    }
}
