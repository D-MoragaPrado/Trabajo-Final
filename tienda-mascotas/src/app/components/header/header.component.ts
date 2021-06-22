import { Component, OnInit } from '@angular/core';
import { ManejoProductosService } from '../../services/manejo-productos.service'
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';
import { Categoria } from 'src/app/interfaces/categoria';
import {Usuario}from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoriasPerro : Array<Categoria> = [];
  subCategoriasGato : Array<Categoria> = [];
  public show1:boolean = true;
  public show2:boolean = false;
  user:Array<Usuario>=[];
  
  constructor(private servicioProducto : ManejoProductosService,private servicioUsuario: ManejoUsuariosService){ 
  }

  ngOnInit(): void {
    this.servicioProducto.getCategorias(1).subscribe((categoriaP) => {
      for (let i = 0; i < categoriaP.length; i++) {
        this.subCategoriasPerro.push(categoriaP[i])
        console.log(categoriaP[i])
      }
    });
    this.servicioProducto.getCategorias(2).subscribe((categoria) => {
      for (let i = 0; i < categoria.length; i++) {
        this.subCategoriasGato.push(categoria[i])
        console.log(categoria[i])
      }
    });

    this.servicioUsuario.getUsuarioActivo().subscribe((usuario) => {
      console.log("cargando usuario activo");
      if(usuario!= null){
        this.show1=false;
        this.show2=true;
        this.user.push(usuario[0]);
      }else{
        this.show1=true;
        this.show2=false;
      }
    });
  }

  cerrarSesion(){
    this.user.splice(0,1); 
    this.servicioUsuario.CerrarSesion().subscribe((usuario) => { 
      console.log(usuario);
    });
    console.log("sesion cerrada"); 
    location.reload();
  }

}
