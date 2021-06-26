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
  public show1:boolean = true;
  public show2:boolean = false;
  user:Array<Usuario>=[];

  constructor(private fb:FormBuilder,private servicioUsuario: ManejoUsuariosService ,private router : Router) {
    this.formularioI=this.fb.group({
      Correo:['',[Validators.required,Validators.email]],
      Contrasenia:['',[Validators.required,Validators.maxLength(15)]],
      checkbox:false,
  });}

  ngOnInit(): void {
    this.servicioUsuario.getUsuarioActivo().subscribe((usuario) => {
      console.log("cargando usuario activo");
      if(usuario!= null){
        this.show1=false;
        this.show2=true;
        this.user.push(usuario[0]);
      }else{
        this.show1=true;
        this.show2=false;
      }
    });
  }

  EnviarDatos() {
    if (this.formularioI.valid) {
      let usuario:Usuario={
        correo:this.formularioI.get('Correo')?.value,
        password:this.formularioI.get('Contrasenia')?.value,
        nombres:'',
        apellidos:'',
        rut:'',
        region:0,
        comuna:0,
        pregunta:'',
        respuesta:''
      };
      this.servicioUsuario.iniciarSesion(usuario).subscribe(respuesta=>{
        if(respuesta){
          location.reload();   
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
