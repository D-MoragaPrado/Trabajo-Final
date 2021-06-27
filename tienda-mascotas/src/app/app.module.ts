import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { SubcategoriaComponent } from './components/subcategoria/subcategoria.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { IngresoAdminComponent } from './components/ingreso-admin/ingreso-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { RecuperarClaveComponent } from './components/recuperar-clave/recuperar-clave.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    FormularioRegistroComponent,
    IniciarSesionComponent,
    ProductoComponent,
    CarritoComponent,
    CategoriasComponent,
    SubcategoriaComponent,
    IngresoAdminComponent,
    AdminComponent,
    RecuperarClaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    NgbModule,
    MatCardModule,
    NgbRatingModule,
    MatGridListModule,
    NgxCaptchaModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
