import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {ManejoProductosService} from '../../services/manejo-productos.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {
  productos : Array<Producto> = [];
  categoria:string='';
  subcategoria:string='';
  task="warn";
  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute, configRating : NgbRatingConfig) { 
    configRating.max = 5;
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
          console.log(producto[i]);
        }
      });
    })
  }

}
