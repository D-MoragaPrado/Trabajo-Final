import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subCategorias : Array<Categoria> = []

  constructor() { }

  ngOnInit(): void {
  }

}
