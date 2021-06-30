import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import {Usuario} from '../../interfaces/usuario';
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import * as $ from "jquery";

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
  captcha:boolean =false
  user:Array<Usuario>=[];
  texto:string="hi";
  imagen:any;

  constructor(private fb:FormBuilder,private servicioUsuario: ManejoUsuariosService ,private router : Router) {
    this.formularioI=this.fb.group({
      Correo:['',[Validators.required,Validators.email]],
      Contrasenia:['',[Validators.required,Validators.maxLength(15)]],
      codigo:['',[Validators.required]],
  });
  }

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
    this.Generar();  
  }

  EnviarDatos() {
    if (this.formularioI.valid) {
      if(this.formularioI.get('codigo')?.value==this.texto){
        this.captcha=true;
      }else{
        this.captcha=false;
        this.Generar();
      }
      console.log(this.captcha);
      if(this.captcha){
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
      }else{
        alert("Captcha inválido");
      }    
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }
      
  GenerarClave(){                 
    let caracteres="ABCDFGEH123456778";
    let longitud=5;
    let codigo="";
    let aleatorio=0;
    for(var i=0;i<longitud;i++){
      aleatorio=Math.random()*caracteres.length;
      codigo+=caracteres.substr(aleatorio,1);
    }
    this.texto=codigo;     
    return codigo;
  }
            
  Generar(){
    let Textoclave=this.GenerarClave();
    let texto;
    let src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://password-and-captcha-generator.p.rapidapi.com/generateCaptcha?text="+Textoclave+"&width=160&height=62",
      "method": "GET",
      "headers": {
      "x-rapidapi-key": "4462a30b42mshb25346b7a93e401p1fd1b6jsn216ad7c81506",
      "x-rapidapi-host": "password-and-captcha-generator.p.rapidapi.com"
      }
    };
    $.ajax(settings).done(function (response) {
      var imagen="data:image/png;base64,"+response.captcha;
      $("#imagen").attr('src',imagen);
      texto=response.text;
    });
    console.log(Textoclave);
  }

}
