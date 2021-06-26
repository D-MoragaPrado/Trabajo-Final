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
      Rating:['',[Validators.required]],
    })
  }

  ngOnInit(): void {
      this.servicioProducto.getProducto(this.rutaActiva.snapshot.params.id).subscribe((prod) => {
        for (let i = 0; i < prod.length; i++) {
          this.producto.push(prod[i]);
        }
      });
      this.servicioProducto.getComentarios(this.rutaActiva.snapshot.params.id).subscribe((comentario) => {
        for (let i = 0; i < comentario.length; i++) {
          this.comentarios.push(comentario[i]);
        }
      });
      this.servicioUsuario.getUsuarioActivo().subscribe((usuario) => {
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
      if(this.carrito[i].producto.id==this.producto[0].id){
        this.carrito[i].cantidadProducto+=this.cantidad;
        if(this.carrito[i].cantidadProducto>this.producto[0].stock){
          this.carrito[i].cantidadProducto=this.producto[0].stock;
        }
        noexiste=false;
      }
    }
    if(noexiste){   
      this.carrito.push(acarrito);
    }
  }

  AgregarComentario(){
    let comment:Comentario={
      id_producto   : this.producto[0].id,
      comment       : this.formComment.get('Comentario')?.value,
      rating        : this.formComment.get('Rating')?.value,
      nombre_usuario: this.user[0].nombres,
    }
    let newProducto=this.producto[0];
    let newRating=((this.producto[0].calificacion*this.comentarios.length + parseInt(this.formComment.get('Rating')?.value))/ (this.comentarios.length + 1));
    newProducto.calificacion=newRating;
    this.servicioProducto.agregarComentario(comment).subscribe(respuesta=>{    
      console.log(respuesta);   
    });

    this.servicioProducto.cambiarValoracion(newProducto).subscribe(respuesta=>{
      console.log(respuesta);
    });
    location.reload();
  }

}
