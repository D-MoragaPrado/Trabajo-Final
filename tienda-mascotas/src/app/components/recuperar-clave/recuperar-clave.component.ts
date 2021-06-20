import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import {Usuario} from '../../interfaces/usuario';
import {ManejoUsuariosService} from '../../services/manejo-usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.scss']
})
export class RecuperarClaveComponent implements OnInit {
  formularioR:FormGroup;
  public show1:boolean = true;
  public show2:boolean = false;
  public show3:boolean = false;
  pregunta:string='nada';
  usuario:Array<Usuario>=[];

  constructor(private fb:FormBuilder,private servicioUsuario: ManejoUsuariosService,private router : Router) {
    this.formularioR=this.fb.group({
      Correo:['',[Validators.required,Validators.email]],
      Respuesta:['',[Validators.required]],
      Contrasenia:['',[Validators.required,Validators.maxLength(15)]],
      Contrasenia2:['',[Validators.required,Validators.maxLength(15)]],
  });

   }

  ngOnInit(): void {
  }
  EnviarCorreo(){
    this.servicioUsuario.checkeoCorreo(this.formularioR.value.Correo).subscribe((existe) => {
      console.log('existe el correo:',existe);
      if(existe){
        this.servicioUsuario.getPregunta(this.formularioR.value.Correo).subscribe((pregunta) => {
          this.pregunta=pregunta[0].pregunta_secreta;
          console.log(pregunta);
          this.show1=false;
          this.show2=true;
        });       
      }else{
        alert("Correo no registrado");
      }
    });
  }

  EnviarRespuesta(){
    this.servicioUsuario.getUsuarioPregunta(this.formularioR.value.Correo,this.formularioR.value.Respuesta).subscribe((usuario)=> {
      if(usuario==''){
        alert("respuesta erronea");
      }else{
        for (let i = 0; i < usuario.length; i++) {
          this.usuario.push(usuario[i]);
        }
        this.show2=false;
        this.show3=true;
      }
    });
  }

  ModificarContrasenia(){
    if(this.formularioR.value.Contrasenia != this.formularioR.value.Contrasenia2){
      alert("Las contraseñas no coinciden");
    }else{
      this.usuario[0].password=this.formularioR.value.Contrasenia;
      this.servicioUsuario.cambiarClave(this.usuario[0]).subscribe((usuario)=>{
      alert("Clave cambiada,Inicie Sesión");
      this.router.navigateByUrl('/iniciar-sesion');  
    });
    };
  }

}
