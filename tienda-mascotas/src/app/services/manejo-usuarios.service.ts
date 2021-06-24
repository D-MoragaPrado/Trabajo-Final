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
  iniciarSesion(usuario:Usuario):Observable<any>{
    return this.servicio.post(`${this.url}/iniciar-sesion`,usuario);
  }
  getPregunta(correo :string):Observable<any>{
    return this.servicio.get(`${this.url}/obtener-pregunta/${correo}`);
  }
  getUsuarioPregunta(correo:string,respuesta:string):Observable<any>{
    return this.servicio.get(`${this.url}/obtener-usuario/${correo}/${respuesta}`);
  }
  cambiarClave(usuario:Usuario):Observable<any>{
    return this.servicio.put(`${this.url}/cambiar-clave`,usuario);
  }
  getUsuarioActivo():Observable<any>{
    return this.servicio.get(`${this.url}/obtener-usuario-activo`);
  }
  CerrarSesion():Observable<any>{
    return this.servicio.get(`${this.url}/cerrar-sesion`);
  }
  getUsuarios() : Observable<any>{
    return this.servicio.get(`${this.url}/obtener-usuarios`);
  }
}
