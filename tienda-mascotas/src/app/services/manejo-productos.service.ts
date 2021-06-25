import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../interfaces/comentario';
import { Producto } from '../interfaces/producto';
import { CarroCompra,Carro} from '../interfaces/carro-compra';
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
  agregarComentario(comentario:Comentario):Observable<any>{
    return this.servicio.post(`${this.url}/agregar-comentario`,comentario);
  }
  cambiarValoracion(producto:Producto):Observable<any>{
    console.log(producto.calificacion);
    return this.servicio.put(`${this.url}/cambiar-valoracion`,producto);
  }
  RealizarCompra():Observable<any>{
    return this.servicio.post(`${this.url}/realizar-compra`,Carro);
  }
  getProductosReporte() : Observable<any>{
    return this.servicio.get(`${this.url}/obtener-productos`);
  }

  filtroTotal(cat:string,subcat:string,pmin:number,pmax:number,rmin:number,rmax:number):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-total/${cat}/${subcat}/${pmin}/${pmax}/${rmin}/${rmax}`);
  }
  filtroDisponibilidad(cat:string,subcat:string):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-disponible/${cat}/${subcat}`);
  }
  filtroPrecio(cat:string,subcat:string,pmin:number,pmax:number):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-precio/${cat}/${subcat}/${pmin}/${pmax}`);
  }
  filtroRating(cat:string,subcat:string,rmin:number,rmax:number):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-rating/${cat}/${subcat}/${rmin}/${rmax}`);
  }
  filtroDyP(cat:string,subcat:string,pmin:number,pmax:number):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-disponibilidad-precio/${cat}/${subcat}/${pmin}/${pmax}`);
  }

  filtroDyR(cat:string,subcat:string,rmin:number,rmax:number):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-disponibilidad-rating/${cat}/${subcat}/${rmin}/${rmax}`);

  }
  filtroPyR(cat:string,subcat:string,pmin:number,pmax:number,rmin:number,rmax:number):Observable<any>{
    return this.servicio.get(`${this.url}/filtro-precio-rating/${cat}/${subcat}/${pmin}/${pmax}/${rmin}/${rmax}`);

  }
}
