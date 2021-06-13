import { Component, OnInit } from '@angular/core';
//import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import{Producto}from '../../interfaces/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  constructor(/*config: NgbRatingConfig*/) {
    /*config.max = 5;
    config.readonly = true;*/
   }

  ngOnInit(): void {
  }

}
