import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comuna } from '../interfaces/comuna';
import { Region } from '../interfaces/region';
@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  url="http://127.0.0.1:3000";
  constructor(private servicio : HttpClient) { }


  conseguirRegiones():Observable<any>{
    return this.servicio.get(`${this.url}/regiones`)
  }

  conseguirComunaPorRegion(id_region : number):Observable<any>{
    return this.servicio.get(`${this.url}/regiones/${id_region}`)
  }
}
