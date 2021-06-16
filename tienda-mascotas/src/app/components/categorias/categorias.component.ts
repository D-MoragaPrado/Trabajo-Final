import { Component, OnInit } from '@angular/core';
import {Producto} from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';

import {ManejoProductosService} from '../../services/manejo-productos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  productos : Array<Producto> = [];

  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute) { }
  
  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.animal=="Perro"){
      this.servicioProducto.getProductosPerro().subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });
    }else if(this.rutaActiva.snapshot.params.animal=="Gato"){
      this.servicioProducto.getProductosGato().subscribe((producto) => {
        for (let i = 0; i < producto.length; i++) {
          this.productos.push(producto[i]);
          console.log(producto[i]);
        }
      });
    }
  };

}
