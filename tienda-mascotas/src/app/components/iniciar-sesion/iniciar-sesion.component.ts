import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import {Usuario} from '../../interfaces/usuario';
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {
  task="primary";
  formularioI:FormGroup;
  constructor(private fb:FormBuilder,private servicioUsuario: ManejoUsuariosService ,private router : Router) {
    this.formularioI=this.fb.group({
      Correo:['',[Validators.required,Validators.email]],
      Contrasenia:['',[Validators.required,Validators.maxLength(15)]],
      checkbox:false,
  });}


  ngOnInit(): void {
  }

  EnviarDatos() {
    if (this.formularioI.valid) {
      let valid:boolean;
      console.log(this.formularioI.value)
      let usuario:Usuario={
        correo:this.formularioI.get('Correo')?.value,
        password:this.formularioI.get('Contrasenia')?.value,
        nombres:'',
        apellidos:'',
        rut:'',
        region:0,
        comuna:0,
      };
      this.servicioUsuario.iniciarSesion(usuario).subscribe(respuesta=>{
        console.log("holi  ",respuesta);
        if(respuesta){
          console.log("valido wey");
          this.router.navigateByUrl('/');  
        }else{
          alert("Correo y/o contraseña incorrectos");
        }

      });
      
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }

  
}
