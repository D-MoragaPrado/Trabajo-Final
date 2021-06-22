import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../interfaces/comentario';

@Injectable({
  providedIn: 'root'
})
export class ManejoProductosService {

  url="http://127.0.0.1:3000";

  constructor(private servicio : HttpClient) { }

  getCategorias(id_categoria:number):Observable<any>{
    console.log(id_categoria);
    return this.servicio.get(`${this.url}/subcategorias/${id_categoria}`);
  }

  getProductosPerro():Observable<any>{
    return this.servicio.get(`${this.url}/categorias/perros`);
  }
  getProductosGato():Observable<any>{
    return this.servicio.get(`${this.url}/categorias/gatos`);
  }

  getProducto(id_producto:number):Observable<any>{
    console.log(id_producto);
    return this.servicio.get(`${this.url}/producto/${id_producto}`);
  }
  getProductosSubcategoria(name_cat:string, name_subcat:string):Observable<any>{
    return this.servicio.get(`${this.url}/subcategorias/${name_cat}/${name_subcat}`);
  }
  getComentarios(id_producto:number):Observable<any>{
    return this.servicio.get(`${this.url}/comentarios/${id_producto}`);
  }
  agregarComentario(comentario:Comentario){
    return this.servicio.post(`${this.url}/agregar-comentario`,comentario);
  }
}
