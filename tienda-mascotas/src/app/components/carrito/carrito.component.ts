import { Component, OnInit } from '@angular/core';
import{Producto}from '../../interfaces/producto';
import {CarroCompra,Carro}from '../../interfaces/carro-compra'
import { ProductoComponent } from '../producto/producto.component';
import {ManejoProductosService} from '../../services/manejo-productos.service';
import {Usuario} from '../../interfaces/usuario';
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito:Array<CarroCompra>=[];
  cantidad:number;
  total:number;
  user:Array<Usuario>=[];
  show:boolean = false;

  constructor(private servicioProducto : ManejoProductosService,private servicioUsuario: ManejoUsuariosService) { 
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
    this.servicioUsuario.getUsuarioActivo().subscribe((usuario) => {
      console.log("cargando usuario activo");
      if(usuario!= null){
        this.show=true;
        this.user.push(usuario[0]);
      }else{
        this.show=false;
      }
    });  
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
    this.servicioProducto.RealizarCompra().subscribe((prod) => {
      console.log(prod);
    });
  }
}
