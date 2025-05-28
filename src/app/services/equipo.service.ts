import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  constructor() { }

  // findAll():Observable<Equipo[]>{
  //   return of(this.maquinas);
  // }
}
