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
      Correo:['',[Validators.required,Validators.email]],
      Contraseña:['',[Validators.required]],
  });}


  ngOnInit(): void {
  }

  EnviarDatos() {
    if (this.formularioI.valid) {
      console.log(this.formularioI.value)
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }

  
}
