import { Component} from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'maquinas-app',
  standalone:true,
  imports: [RouterOutlet, SideMenuComponent, CommonModule],
  templateUrl: './maquinas-app.component.html',
  styleUrls:['./maquinas-app.component.css'],
})
export class MaquinasAppComponent{
    constructor(private router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
