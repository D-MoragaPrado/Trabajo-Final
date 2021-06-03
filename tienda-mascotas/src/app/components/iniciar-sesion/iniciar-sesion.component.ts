import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {
  formularioI:FormGroup;

  constructor(private fb:FormBuilder ) {
    this.formularioI=this.fb.group({
 

  });}


  ngOnInit(): void {
  }

  
}
