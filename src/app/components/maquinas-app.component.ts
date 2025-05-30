import { Component} from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'maquinas-app',
  standalone:true,
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './maquinas-app.component.html',
  styleUrls:['./maquinas-app.component.css'],
})
export class MaquinasAppComponent{

}
//todo prueba de git