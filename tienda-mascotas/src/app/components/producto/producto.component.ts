import { Component, OnInit } from '@angular/core';
//import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import{Producto}from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';

import {ManejoProductosService} from '../../services/manejo-productos.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto:Array<Producto>=[];
    
  constructor(/*config: NgbRatingConfig*/private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute) {
    /*config.max = 5;
    config.readonly = true;*/
   }

  ngOnInit(): void {
    console.log("holi",this.rutaActiva.snapshot.params.id);
      this.servicioProducto.getProducto(this.rutaActiva.snapshot.params.id).subscribe((prod) => {
        for (let i = 0; i < prod.length; i++) {
          this.producto.push(prod[i]);
          console.log(prod[i]);
        }
      });
  }

}
