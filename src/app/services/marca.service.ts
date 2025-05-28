import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Marca } from "../models/marca";

@Injectable({
  providedIn: 'root'
})
export class marcaService{
  
    constructor(private http:HttpClient) { }

      findAll():Observable<Marca[]>{
        return this.http.get<Marca[]>('http://localhost:8080/api/marcas');
      }

      addNew(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>('http://localhost:8080/api/marcas', marca);
      }
      edit(id: number, marca: Marca): Observable<Marca> {
        return this.http.put<Marca>(`http://localhost:8080/api/marcas/${id}`, marca);
      }
    }