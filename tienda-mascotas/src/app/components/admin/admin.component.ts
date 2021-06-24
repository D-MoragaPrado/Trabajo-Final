import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { Usuario } from 'src/app/interfaces/usuario';
import { Compras } from 'src/app/interfaces/compras';
import { ManejoAdminService } from 'src/app/services/manejo-admin.service';
import { ManejoProductosService } from 'src/app/services/manejo-productos.service';
import { ManejoUsuariosService } from 'src/app/services/manejo-usuarios.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin : Array<Admin> = [];
  usuarios : Array<Usuario> = [];
  compras : Array<Compras> = [];
  page = 1;
  pageSize = 10;
  collectionSize = this.compras.length;
  constructor(private servicioAdmin : ManejoAdminService, private servicioProducto : ManejoProductosService, private servicioUsuario : ManejoUsuariosService, private router : Router) { }

  ngOnInit(): void {

    this.servicioAdmin.getAdminActivo().subscribe((admin) => {
      console.log("Cargando Administrador activo")
      this.admin.push(admin[0] as Admin);
    })
    
    this.servicioUsuario.getUsuarios().subscribe((users) => {
      for (let i = 0; i < users.length; i++) {
        this.usuarios.push(users[i] as Usuario)
      }
    })

    this.servicioProducto.getProductosReporte().subscribe((prod) => {
      for (let i = 0; i < prod.length; i++) {
        this.compras.push(prod[i] as Compras)
      }
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

  refresh(){
    
  }
}
