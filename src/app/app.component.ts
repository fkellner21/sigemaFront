import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaquinasAppComponent } from './components/maquinas-app.component';


@Component({
  selector: 'app-root',
  imports: [MaquinasAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maquinas';
}
