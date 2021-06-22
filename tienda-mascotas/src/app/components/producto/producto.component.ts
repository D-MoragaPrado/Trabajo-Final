import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import {Form, FormBuilder,FormGroup, Validators} from '@angular/forms';
import{Producto}from '../../interfaces/producto';
import {CarroCompra,Carro}from '../../interfaces/carro-compra';
import {Comentario} from '../../interfaces/comentario'
import {Usuario} from '../../interfaces/usuario';
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';

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
  comentarios:Array<Comentario>=[];
  formComment:FormGroup;
  public show:boolean = false;
  user:Array<Usuario>=[];

  constructor(private servicioProducto : ManejoProductosService,private rutaActiva: ActivatedRoute,private servicioUsuario: ManejoUsuariosService,private fb:FormBuilder ) {
    this.cantidad = 1;
    this.formComment=this.fb.group({
      Comentario:['',[Validators.required,Validators.maxLength(150),Validators.minLength(2)]],
      //Rating:[''],
  })

  }

  ngOnInit(): void {
    console.log("holi",this.rutaActiva.snapshot.params.id);
      this.servicioProducto.getProducto(this.rutaActiva.snapshot.params.id).subscribe((prod) => {
        for (let i = 0; i < prod.length; i++) {
          this.producto.push(prod[i]);
          console.log(prod[i]);
        }
      });
      this.servicioProducto.getComentarios(this.rutaActiva.snapshot.params.id).subscribe((comentario) => {
        for (let i = 0; i < comentario.length; i++) {
          this.comentarios.push(comentario[i]);
          console.log(comentario[i]);
        }
      });


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

  AgregarComentario(){

  }

}
