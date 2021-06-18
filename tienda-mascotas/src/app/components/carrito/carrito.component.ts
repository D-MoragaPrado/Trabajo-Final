import { Component, OnInit } from '@angular/core';
import{Producto}from '../../interfaces/producto';
import {CarroCompra,Carro}from '../../interfaces/carro-compra'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito:Array<CarroCompra>=Carro;
  cantidad:number;
  constructor() { 
    this.cantidad = 1;
  }

  ngOnInit(): void {
  }

  aumentar(produc:CarroCompra){
    produc.cantidadProducto+=1;
  }

  disminuir(produc:CarroCompra){
    if (produc.cantidadProducto>1){
      produc.cantidadProducto-=1;
    }
  }
}
