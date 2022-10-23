import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserinfoPageComponent } from './components/userinfo-page/userinfo-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'info', component: InfoPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'userinfo', component: UserinfoPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
