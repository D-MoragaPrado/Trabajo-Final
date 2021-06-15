import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';

import {ManejoProductosService} from '../../services/manejo-productos.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {
  productos : Array<Producto> = [];
  categoria:string='';
  subcategoria:string='';
  
  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.productos = [];
    this.categoria=this.rutaActiva.snapshot.params.animal;
    this.subcategoria=this.rutaActiva.snapshot.params.subcategoria;
    console.log(this.categoria,this.subcategoria);
    this.servicioProducto.getProductosSubcategoria(this.rutaActiva.snapshot.params.animal,this.rutaActiva.snapshot.params.subcategoria).subscribe((producto) => {
      for (let i = 0; i < producto.length; i++) {
        this.productos.push(producto[i]);
        console.log(producto[i]);
      }
    });
  }

}
