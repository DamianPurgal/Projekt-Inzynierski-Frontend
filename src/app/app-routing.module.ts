import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserinfoPageComponent } from './components/userinfo-page/userinfo-page.component';
import { AuthGuard } from './guards/AuthGuard/auth.guard';
import { UserinfoEditComponent } from './components/userinfo-page/userinfo-edit/userinfo-edit.component';
import { UserinfoDeleteComponent } from './components/userinfo-page/userinfo-delete/userinfo-delete.component';
import { UserinfoHelpComponent } from './components/userinfo-page/userinfo-help/userinfo-help.component';
import { BlackboardListPageComponent } from './components/blackboard-list-page/blackboard-list-page.component';
import { BlackboardPageComponent } from './components/blackboard-page/blackboard-page.component';
import { UserinfoInfoComponent } from './components/userinfo-page/userinfo-info/userinfo-info.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'help', component: InfoPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'user', component: UserinfoPageComponent,
    data:{authRequired: true},
    canActivate: [AuthGuard],
    children: [
      {path: 'info', component: UserinfoInfoComponent},
      {path: 'edit', component: UserinfoEditComponent},
      {path: 'delete', component: UserinfoDeleteComponent},
      {path: 'help', component: UserinfoHelpComponent}
    ]
  },
  { path: 'blackboards', component: BlackboardListPageComponent, data:{authRequired: true}, canActivate: [AuthGuard]},
  { path: 'blackboard/:uuid', component: BlackboardPageComponent, data:{authRequired: true}, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

