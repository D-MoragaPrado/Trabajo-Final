import { Component, OnInit } from '@angular/core';
import { ManejoProductosService } from '../../services/manejo-productos.service'
import { Categoria } from 'src/app/interfaces/categoria';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategoriasPerro : Array<Categoria> = [];
  subCategoriasGato : Array<Categoria> = [];


  constructor(private servicioProducto : ManejoProductosService) { }

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
  }

}
