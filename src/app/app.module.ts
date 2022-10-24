import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from './services/authorization/authorization.service';
import { UserinfoPageComponent } from './components/userinfo-page/userinfo-page.component';
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InfoPageComponent,
    NotFoundPageComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserinfoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthorizationService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
