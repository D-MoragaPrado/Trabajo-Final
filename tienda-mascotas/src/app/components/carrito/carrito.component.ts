import { Component, OnInit } from '@angular/core';
import{Producto}from '../../interfaces/producto';
import {CarroCompra,Carro}from '../../interfaces/carro-compra'
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito:Array<CarroCompra>=[];
  cantidad:number;
  total:number;


  constructor() { 
    this.cantidad = 0;
    this.carrito=Carro;
    this.total=0;
    console.log("el carrito tiene :  ",this.carrito.length);
    for(let i=0;i<this.carrito.length;i++){
      this.total+=this.carrito[i].producto.precio*this.carrito[i].cantidadProducto;
      this.cantidad+=this.carrito[i].cantidadProducto;
    }
    
  }

  ngOnInit(): void {
    console.log(this.carrito.length);  
  }
  
  aumentar(produc:CarroCompra){
    if(produc.producto.stock>produc.cantidadProducto){
      produc.cantidadProducto+=1;
      this.total+=produc.producto.precio;
      this.cantidad+=1;
    }
  }

  disminuir(produc:CarroCompra){
    if (produc.cantidadProducto>1){
      produc.cantidadProducto-=1;
      this.total-=produc.producto.precio;
      this.cantidad-=1;
    }
  }

  eliminar(produc:CarroCompra){
    for(let i=0;i<this.carrito.length;i++){
      if(this.carrito[i]==produc){
        this.carrito.splice(i,1);
        this.total-=produc.producto.precio*produc.cantidadProducto;
        this.cantidad-=produc.cantidadProducto;
      }
    }
  }

  comprar(){

  }
}
