import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

interface region {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {
  formulario:FormGroup;
  Regiones: region[] = [
    {value: 'arica', viewValue: 'XI-Arica y Parinacota'},
    {value: 'tarapaca', viewValue: 'I-Tarapacá'},
    {value: 'antofagasta', viewValue: 'II-Antofagasta'},
    {value: 'atacama', viewValue: 'III-Atacama'},
    {value: 'coquimbo', viewValue: 'IV-Coquimbo'},
    {value: 'valparaiso', viewValue: 'V-Valparaíso'},
    {value: 'metropolitana', viewValue: 'Metropolitana'},
    {value: 'ohiggins', viewValue: 'VI-O\'Higgins'},
    {value: 'maule', viewValue: 'VII-Maule'},
    {value: 'nuble', viewValue: 'XVI-Ñuble'},
    {value: 'biobio', viewValue: 'VIII-Bío Bío'},
    {value: 'araucania', viewValue: 'IX-Araucanía'},
    {value: 'losrios', viewValue: 'XIV-Los Rios'},
    {value: 'loslagos', viewValue: 'X-Los Lagos'},
    {value: 'aysen', viewValue: 'XI-Aysén'},
    {value: 'magallanes', viewValue: 'XII-Magallanes'},
  ];


  constructor(private fb:FormBuilder,private router: Router) {
    this.formulario=this.fb.group({
      Nombres:['',[Validators.required]],
      Apellidos:['',[Validators.required]],
      Rut:['',[Validators.required]],
      Region:['',[Validators.required]],
      Comuna:['',[Validators.required]],
      Correo:['',[Validators.required,Validators.email]],
      Contrasenia:['',[Validators.required]],
      Contrasenia2:['',[Validators.required]],
    });}

  ngOnInit(): void {
  }

 
  EnviarDatos() {
    if (this.formulario.valid) {
      if(this.formulario.value.Contrasenia != this.formulario.value.Contrasenia2){
        console.log("no son iguales");
        alert("Las contraseñas no coinciden")
      }
      else{
      console.log(this.formulario.value)
      this.router.navigateByUrl('/');
      }
    }
  }
}
