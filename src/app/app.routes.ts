import { Routes } from '@angular/router';
import { MaquinaComponent } from './components/maquina/maquina.component';
import { MaquinaFormComponent } from './components/maquina-form/maquina-form.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'/home',
    },
    {
        path: 'maquinas',
        component: MaquinaComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
    },
];
