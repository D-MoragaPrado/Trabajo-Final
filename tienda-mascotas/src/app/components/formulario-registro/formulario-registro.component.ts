import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {
  formulario:FormGroup;
  constructor(private fb:FormBuilder ) {
    this.formulario=this.fb.group({
      Nombres:['',[Validators.required]],
      Apellidos:['',[Validators.required]],
      Rut:['',[Validators.required]],
      Region:['',[Validators.required]],
      Comuna:['',[Validators.required]],
      Correo:['',[Validators.required,Validators.email]],
      Contraseña:['',[Validators.required]],
      Contraseña2:['',[Validators.required]],
    });}

  ngOnInit(): void {
  }
  EnviarDatos() {
    if (this.formulario.valid) {
      console.log(this.formulario.value)
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }
}
