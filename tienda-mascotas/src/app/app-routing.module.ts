import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../app/components/home/home.component'
import {FormularioRegistroComponent} from '../app/components/formulario-registro/formulario-registro.component'

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'formulario-registro',component:FormularioRegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
