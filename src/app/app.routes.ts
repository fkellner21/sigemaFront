import { Routes } from '@angular/router';
//import { MaquinaComponent } from './components/maquina/tab/listado/maquina.component';
//import { MaquinaFormComponent } from './components/maquina/tab/listado/maquina-form/maquina-form.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TipoEquipoComponent } from './components/maquina/tab/tipo/tipo-equipo.component';
import { TabEquipos } from './components/maquina/tab/tab.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'/home',
    },
    // {
    //     path: 'maquinas',
    //     component: MaquinaComponent,
    // },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
    },
    {
        path: 'tipos',
        component: TipoEquipoComponent,
    },
            {
        path: 'tabEquipos',
        component: TabEquipos,
    },
];
