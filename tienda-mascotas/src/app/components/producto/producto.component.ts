import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import{Producto}from '../../interfaces/producto';
import { ActivatedRoute, Params } from '@angular/router';
import {CarroCompra,Carro}from '../../interfaces/carro-compra';

import {ManejoProductosService} from '../../services/manejo-productos.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
  
export class ProductoComponent implements OnInit {
  cantidad:number;
  producto:Array<Producto>=[];
  carrito:Array<CarroCompra>=Carro;
  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute) {
    this.cantidad = 1;
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

  aumentar(){
    if(this.cantidad<this.producto[0].stock){
      this.cantidad+=1;
    }
    
  }

  disminuir(){
    if (this.cantidad>1){
      this.cantidad-=1;
    }
  }
  aniadirCarrito(){
    let noexiste:boolean=true;
    let acarrito:CarroCompra={producto:this.producto[0],
      cantidadProducto:this.cantidad};
    
    for(let i=0;i<this.carrito.length;i++){
      if(this.carrito[i].producto==this.producto[0]){
        this.carrito[i].cantidadProducto+=this.cantidad;
        console.log("ya existe");
        noexiste=false;
      }
    }
    if(noexiste){   
      console.log("añadido");
      this.carrito.push(acarrito);
    }
  }

}
