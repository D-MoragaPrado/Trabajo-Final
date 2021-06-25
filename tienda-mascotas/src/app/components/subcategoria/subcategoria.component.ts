import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {ManejoProductosService} from '../../services/manejo-productos.service';
import { config } from 'rxjs';
import {Form, FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {
  productos : Array<Producto> = [];
  productosfiltro: Array<Producto>=[];
  categoria:string='';
  subcategoria:string='';
  task="warn";
  formFiltro:FormGroup;

  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute, configRating : NgbRatingConfig,private fb:FormBuilder) { 
    configRating.max = 5;
    this.formFiltro=this.fb.group({
      Disponible:[false],
      min:[null],
      max:[null],
      Rating1:[0],
      Rating2:[0],
      
    })

  }

  ngOnInit(): void { 
    this.rutaActiva.params.subscribe(params =>{
      this.productos = [];
      this.categoria=params['animal'];
      this.subcategoria=params['subcategoria'];
      console.log(this.categoria,this.subcategoria);
      this.servicioProducto.getProductosSubcategoria(this.rutaActiva.snapshot.params.animal,this.rutaActiva.snapshot.params.subcategoria).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          this.productosfiltro.push(producto[i])
          console.log(producto[i]);
        }
      });
    })
  }
  Filtrar(){
    this.productos=[];
    let disponible=this.formFiltro.get("Disponible")?.value;
    let pmin=this.formFiltro.get("min")?.value;
    let pmax=this.formFiltro.get("max")?.value;
    let rmin=parseInt(this.formFiltro.get("Rating1")?.value);
    let rmax=parseInt(this.formFiltro.get("Rating2")?.value);

    if (((pmin!=null)&&(pmax==null)) || ((pmax!=null)&&(pmin==null))){
      alert("Rango de precios NO válido");
      console.log(pmin,pmax);
    }else if( ((pmax!=null)&&(pmin!=null)) && ((pmin<0) || (pmax<0) || (pmin>pmax)) ){
      alert("Rango de precios NO válido");

    }else if(rmin>rmax){
      alert("Rango de valoración NO válido");

    }else if((disponible==false) && (pmax==null) && (rmax==0)){//nada seleccionado
      for (let i = 0; i < this.productosfiltro.length; i++) {
        this.productos.push(this.productosfiltro[i]);
      }

    }else if((disponible==true) && (pmax!=null) && (rmax>0)){ //todo seleccionado
      this.servicioProducto.filtroTotal(this.categoria,this.subcategoria,pmin,pmax,rmin,rmax).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });
      console.log("Filtro de todo ");

    }else if((disponible==true) && (pmax==null) && (rmax==0)){//solo disponible
      console.log("solo disponibilidad");
      this.servicioProducto.filtroDisponibilidad(this.categoria,this.subcategoria).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });

    }else if((disponible==false) && (pmax!=null) && (rmax==0)){//solo precio
      console.log("solo rango");
      this.servicioProducto.filtroPrecio(this.categoria,this.subcategoria,pmin,pmax).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });

    }else if((disponible==false) && (pmax==null) && (rmax>0)){//solo valoracion
      console.log("solo valoracion");
      this.servicioProducto.filtroRating(this.categoria,this.subcategoria,rmin,rmax).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });

    }else if((disponible==true) && (pmax!=null) && (rmax==0)){//disponibilidad y precio
      console.log("disponibilidad y precio");
      this.servicioProducto.filtroDyP(this.categoria,this.subcategoria,pmin,pmax).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });

    }else if((disponible==true) && (pmax==null) && (rmax>0)){//disponibilidad y valoracion
      console.log("disponibilidad y valoracion");
      this.servicioProducto.filtroDyR(this.categoria,this.subcategoria,rmin,rmax).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });

    }else if((disponible==false) && (pmax!=null) && (rmax>0)){//precio y valoracion
      console.log("precio y valoracion");
      this.servicioProducto.filtroPyR(this.categoria,this.subcategoria,pmin,pmax,rmin,rmax).subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });
    }
  }

}
