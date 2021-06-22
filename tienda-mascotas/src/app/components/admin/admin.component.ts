import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { ManejoAdminService } from 'src/app/services/manejo-admin.service';
import { ManejoProductosService } from 'src/app/services/manejo-productos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin : Array<Admin>=[];
  constructor(private servicioAdmin : ManejoAdminService, private servicioProducto : ManejoProductosService, private router : Router) { }

  ngOnInit(): void {

    this.servicioAdmin.getAdminActivo().subscribe((admin) => {
      console.log("Cargando Administrador activo")
      this.admin.push(admin[0] as Admin);
    })
  }

  cerrarSesion(){
    this.admin.splice(0,1);
    this.servicioAdmin.CerrarSesion().subscribe((admin) => {
      console.log(admin)
    })
    alert("Sesion cerrada!")
    this.router.navigateByUrl('/login/admin')
  }

}
