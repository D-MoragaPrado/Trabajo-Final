import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';
import {Form, FormBuilder,FormGroup, Validators} from '@angular/forms';

import {ManejoProductosService} from '../../services/manejo-productos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  productos : Array<Producto> = [];
  productosfiltro: Array<Producto>=[];
  task="warn";
  formFiltro:FormGroup;
  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute,private fb:FormBuilder) {
    this.formFiltro=this.fb.group({
      min:[null],
      max:[null],
      Rating1:[0],
      Rating2:[0],
      Disponible:[false],
      NoDisponible:[false],
    })
   }
  
  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.animal=="Perro"){
      this.servicioProducto.getProductosPerro().subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
        this.productosfiltro=this.productos;
      });
    }else if(this.rutaActiva.snapshot.params.animal=="Gato"){
      this.servicioProducto.getProductosGato().subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
        this.productosfiltro=this.productos;
      });
    }
  };

  Filtrar(){
    this.productos=[];
    //Disponibilidad
    let disponible=this.formFiltro.get("Disponible")?.value;
    let nodisponible=this.formFiltro.get("NoDisponible")?.value;
    if(disponible && !nodisponible){
      for (let i = 0; i < this.productosfiltro.length; i++) {
        if(this.productosfiltro[i].stock>0){
          this.productos.push(this.productosfiltro[i]);
        }
      }
    }else if((disponible && nodisponible)||(!disponible && !nodisponible)){
      for (let i = 0; i < this.productosfiltro.length; i++) {
        this.productos.push(this.productosfiltro[i]);
      }

    }else if(nodisponible && !disponible){
      for (let i = 0; i < this.productosfiltro.length; i++) {
        if(this.productosfiltro[i].stock==0){
          this.productos.push(this.productosfiltro[i]);
        }
      }
    }
    console.log("primero todos los productos son: ",this.productosfiltro);
    //rango de precios
    let pmin=this.formFiltro.get("min")?.value;
    let pmax=this.formFiltro.get("max")?.value;
    if((pmin!=null) && (pmax!=null) &&(pmin>=0)&&(pmax>=0)){
      if(pmin<=pmax){
        for (let i = 0; i < this.productos.length; i++) {
          if((this.productos[i].precio<pmin)||(this.productos[i].precio>pmax)){
            this.productos.splice(i,1);
          }
        }
      }else{
        alert("Rango de precios NO válido")
      }
    }

    console.log("segundo todos los productos son: ",this.productosfiltro);
    //rango de valoracion
    
    let rmin=parseInt(this.formFiltro.get("Rating1")?.value);
    let rmax=parseInt(this.formFiltro.get("Rating2")?.value);
    if(rmax!=0 ){
      console.log(this.productos,this.productos.length);
      console.log(" entre ",rmin," y ",rmax)
      if(rmin<=rmax){
        for (let j = 0; j < this.productos.length; j++) {
          console.log(this.productos[j]);
          console.log("contador es: ",j);
          if((this.productos[j].calificacion<rmin)||(this.productos[j].calificacion>rmax)){
            this.productos.splice(j,1);
            //console.log("eliminated");
          }
        }
      }else{
        alert("Rango de valoración NO válido")
      }
    }


  }

}
