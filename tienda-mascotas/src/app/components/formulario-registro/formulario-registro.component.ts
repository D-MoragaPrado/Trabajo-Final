import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalidadService } from '../../services/localidad.service';
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';
import { Region } from '../../interfaces/region';
import { Comuna } from '../../interfaces/comuna';
import {Usuario} from '../../interfaces/usuario';
import { ListadoPreguntas } from '../../interfaces/preguntas-secretas';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {
  formulario:FormGroup;
  regiones : Array<Region> = [];
  comunas : Array<Comuna> = [];
  preguntas = ListadoPreguntas;
  //exis:boolean=false;

  constructor(private fb:FormBuilder,private router : Router, private servicioLocalidad : LocalidadService , private servicioUsuario: ManejoUsuariosService) {
    this.formulario=this.fb.group({
      Nombres:['',[Validators.required]],
      Apellidos:['',[Validators.required]],
      Rut:['',[Validators.required,Validators.pattern("[1-9][0-9]{6,7}[-][0-9kK]")]],
      Region:['',[Validators.required]],
      Comuna:['',[Validators.required]],
      Correo:['',[Validators.required,Validators.email]],
      Contrasenia:['',[Validators.required,Validators.maxLength(15)]],
      Contrasenia2:['',[Validators.required,Validators.maxLength(15)]],
      Pregunta:['',[Validators.required]],
      Respuesta:['',[Validators.required, Validators.maxLength(32)]],
    });}

  ngOnInit(): void {
    
    this.servicioLocalidad.conseguirRegiones().subscribe((region) => {
      for (let i = 0; i < region.length; i++) {
        this.regiones.push(region[i]);
        console.log(region[i]);
      }
    })

  }

 ObtenerComunas(){
  this.comunas = [];
    let id_reg = this.formulario.get('Region')?.value;
    console.log(id_reg)
    this.servicioLocalidad.conseguirComunaPorRegion(id_reg).subscribe(Listacomuna => {
      for (let i = 0; i < Listacomuna.length; i++) {
        this.comunas.push(Listacomuna[i]);
      }
      console.log(Listacomuna)
    })
 }


  EnviarDatos() {
    if (this.formulario.valid) {
      if(this.formulario.value.Contrasenia != this.formulario.value.Contrasenia2){
        alert("Las contraseñas no coinciden");
      }else{
        this.servicioUsuario.checkeoCorreo(this.formulario.value.Correo).subscribe((existe) => {
          console.log('viendo existencia:',existe);
          if(existe){    
            alert("Correo ya registrado"); 
          }else{
            let nuevoUsuario:Usuario={
              correo:this.formulario.get('Correo')?.value,
              nombres:this.formulario.get('Nombres')?.value,
              apellidos:this.formulario.get('Apellidos')?.value,
              rut:this.formulario.get('Rut')?.value,
              region:this.formulario.get('Region')?.value,
              comuna:this.formulario.get('Comuna')?.value,
              password:this.formulario.get('Contrasenia')?.value,
              pregunta:this.formulario.get('Pregunta')?.value,
              respuesta:this.formulario.get('Respuesta')?.value,
            };     
            this.servicioUsuario.RegistrarUsuario(nuevoUsuario).subscribe(usuario=>{
              console.log(usuario);
            });
            this.router.navigateByUrl('/');
            alert("Usuario Registrado correctamente"); 
          }
        });



        
      }
    }
  }
}
