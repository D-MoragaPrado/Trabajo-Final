import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../app/components/home/home.component';
import {FormularioRegistroComponent} from '../app/components/formulario-registro/formulario-registro.component';
import {IniciarSesionComponent} from '../app/components/iniciar-sesion/iniciar-sesion.component';
import {CarritoComponent} from '../app/components/carrito/carrito.component';
import {CategoriasComponent} from '../app/components/categorias/categorias.component';
import {ProductoComponent} from '../app/components/producto/producto.component';
import {SubcategoriaComponent} from '../app/components/subcategoria/subcategoria.component';
import { IngresoAdminComponent } from '../app/components/ingreso-admin/ingreso-admin.component';
import { AdminComponent } from '../app/components/admin/admin.component';
import {RecuperarClaveComponent} from '../app/components/recuperar-clave/recuperar-clave.component'

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'formulario-registro',component:FormularioRegistroComponent},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'categorias/:animal',component:CategoriasComponent},
  {path:'producto/:id',component:ProductoComponent},
  {path:'categorias/:animal/:subcategoria',component:SubcategoriaComponent},
  {path:'login/admin', component:IngresoAdminComponent, data:{header:false}},
  {path:'admin/', component:AdminComponent, data:{header:false}},
  {path:'recuperar-clave',component:RecuperarClaveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
