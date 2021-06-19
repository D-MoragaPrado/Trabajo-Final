import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-admin',
  templateUrl: './ingreso-admin.component.html',
  styleUrls: ['./ingreso-admin.component.scss']
})
export class IngresoAdminComponent implements OnInit {
  formularioInicio : FormGroup;
  constructor(private fb : FormBuilder, private router : Router) {
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
      
    }
  }
}
