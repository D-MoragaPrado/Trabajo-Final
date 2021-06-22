import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin'

@Injectable({
  providedIn: 'root'
})
export class ManejoAdminService {

  url="http://127.0.0.1:3000"
  constructor(private servicio : HttpClient) { }

  inicioAdmin(admin : Admin): Observable<any>{
    return this.servicio.post(`${this.url}/login/admin`, admin)
  }

  getAdminActivo() : Observable<any>{
    return this.servicio.get(`${this.url}/obtener-administrador-activo`);
  }

  CerrarSesion() : Observable<any>{
    return this.servicio.get(`${this.url}/cerrar-sesion-admin`);
  }
}
