import { Component, OnInit } from '@angular/core';
import { ManejoProductosService } from '../../services/manejo-productos.service'
import { Categoria } from '../../interfaces/categoria';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategorias : Array<Categoria> = []

  constructor(private servicioProducto : ManejoProductosService) { }

  ngOnInit(): void {
    this.servicioProducto.getCategorias().subscribe((categoria) => {
      for (let i = 0; i < categoria.length; i++) {
        this.subCategorias.push(categoria[i])
        console.log(categoria[i])
      }
    })
  }

}
