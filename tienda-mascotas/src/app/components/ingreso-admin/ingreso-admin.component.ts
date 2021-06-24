import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { ManejoAdminService } from 'src/app/services/manejo-admin.service';

@Component({
  selector: 'app-ingreso-admin',
  templateUrl: './ingreso-admin.component.html',
  styleUrls: ['./ingreso-admin.component.scss']
})
export class IngresoAdminComponent implements OnInit {
  formularioInicio : FormGroup;
  constructor(private fb : FormBuilder, private router : Router, private servicioAdmin : ManejoAdminService) {
    this.formularioInicio = this.fb.group(
      {
        Nombre:['',[Validators.required]],
        Password:['',[Validators.required, Validators.maxLength(15)]]
      }
    );
   }

  ngOnInit(): void {
  }

  InicioSesion(){
    if(this.formularioInicio.valid){
      let admin : Admin={
        nombre_admin: this.formularioInicio.get('Nombre')?.value,
        pass_admin: this.formularioInicio.get('Password')?.value,
        correo_electronico_admin: '',
        contacto_admin:''
      }
      this.servicioAdmin.inicioAdmin(admin).subscribe((res) => {
        console.log(res)
        console.log(admin.nombre_admin)
        if(res){
          this.router.navigateByUrl('/admin');
        }
        else{
          alert("Administrador incorrecto!")
        }
      })
    }else{
      alert("¡Hay campos por rellenar!")
    }
  }
}
