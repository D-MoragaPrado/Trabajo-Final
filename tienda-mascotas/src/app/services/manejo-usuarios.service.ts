import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class ManejoUsuariosService {
  url="http://127.0.0.1:3000";

  constructor(private servicio : HttpClient) { }


  RegistrarUsuario(newUsuario : Usuario):Observable<any>{
    console.log("aqui toy");
    console.log(newUsuario);
    return this.servicio.post(`${this.url}/crearUsuario`,newUsuario);
  }
  checkeoCorreo(correo :string):Observable<any>{
    return this.servicio.get(`${this.url}/formulario-registro/${correo}`);
  }
}
