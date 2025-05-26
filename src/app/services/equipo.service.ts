import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private maquinas:Equipo[] = [{
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
  },
{
    id:4,
    matricula:'ENT2548',
    marca:'Caterpillar',
    modelo:'Np300',
    capacidad:20,
  },
  {
    id:5,
    matricula:'ENT2550',
    marca:'Caterpillar',
    modelo:'Np300',
    capacidad:20,
  },  
  {
    id:6,
    matricula:'ENT1230',
    marca:'Zoomplion',
    modelo:'rar99',
    capacidad:1200,
  },{
    id:7,
    matricula:'ENT2548',
    marca:'Caterpillar',
    modelo:'Np300',
    capacidad:20,
  },
  {
    id:8,
    matricula:'ENT2550',
    marca:'Caterpillar',
    modelo:'Np300',
    capacidad:20,
  },  
  {
    id:9,
    matricula:'ENT1230',
    marca:'Zoomplion',
    modelo:'rar99',
    capacidad:1200,
  }]

  constructor() { }

  findAll():Observable<Equipo[]>{
    return of(this.maquinas);
  }
}
