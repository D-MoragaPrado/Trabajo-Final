import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManejoProductosService {

  url="http://127.0.0.1:3000";

  constructor(private servicio : HttpClient) { }

  getCategorias():Observable<any>{
    return this.servicio.get(`${this.url}/subcategorias`)
  }

}
