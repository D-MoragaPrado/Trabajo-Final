import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalidadService } from '../../services/localidad.service';
import { Region } from '../../interfaces/region';
import { Comuna } from '../../interfaces/comuna'


@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {
  formulario:FormGroup;
  regiones : Array<Region> = [];
  comunas : Array<Comuna> = [];

  constructor(private fb:FormBuilder,private router : Router, private servicio : LocalidadService) {
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
    
    this.servicio.conseguirRegiones().subscribe((region) => {
      for (let i = 0; i < region.length; i++) {
        this.regiones.push(region[i]);
        console.log(region[i]);
      }
    })

  }

 ObtenerComunas(){
    let id_region = this.formulario.value.Region.region_id;
    this.servicio.conseguirComunaPorRegion(id_region).subscribe(Listacomuna => {
      for (let i = 0; i < Listacomuna.length; i++) {
        this.comunas.push(Listacomuna[i]);

      }
    })
 }


  EnviarDatos() {
    if (this.formulario.valid) {
      if(this.formulario.value.Contrasenia != this.formulario.value.Contrasenia2){
        console.log("no son iguales");
        alert("Las contraseñas no coinciden");
      }
      else{
      console.log(this.formulario.value)
      this.router.navigateByUrl('/');
      }
    }
  }
}
