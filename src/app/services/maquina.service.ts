import { Injectable } from '@angular/core';
import { Maquina } from '../models/maquina';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private maquinas:Maquina[] = [{
    id:1,
    matricula:'ENT2548',
    marca:'Caterpillar',
    modelo:'Np300',
    capacidad:20,
  },
  {
    id:2,
    matricula:'ENT2550',
    marca:'Caterpillar',
    modelo:'Np300',
    capacidad:20,
  },  
  {
    id:3,
    matricula:'ENT1230',
    marca:'Zoomplion',
    modelo:'rar99',
    capacidad:1200,
  }]

  constructor() { }

  findAll():Observable<Maquina[]>{
    return of(this.maquinas);
  }
}
