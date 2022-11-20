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
import { UserinfoNavbarComponent } from './components/userinfo-page/userinfo-navbar/userinfo-navbar.component';
import { UserinfoEditComponent } from './components/userinfo-page/userinfo-edit/userinfo-edit.component';
import { UserinfoDeleteComponent } from './components/userinfo-page/userinfo-delete/userinfo-delete.component';
import { UserinfoHelpComponent } from './components/userinfo-page/userinfo-help/userinfo-help.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BlackboardListPageComponent } from './components/blackboard-list-page/blackboard-list-page.component';
import { MatCardModule } from '@angular/material/card';
import { BlackboardComponent } from './components/blackboard-list-page/components/blackboard/blackboard.component';
import { AddBlackboardComponent } from './components/blackboard-list-page/components/add-blackboard/add-blackboard.component';
import { FormsModule } from '@angular/forms';
import { AddBlackboardContributorComponent } from './components/dialogs/add-blackboard-contributor/add-blackboard-contributor.component';
import { DeleteBlackboardComponent } from './components/dialogs/delete-blackboard/delete-blackboard.component';
import { EditBlackboardComponent } from './components/dialogs/edit-blackboard/edit-blackboard.component';
import { BlackboardSortPipe } from './pipes/blackboard/blackboard-sort.pipe';
import { BlackboardContributorsComponent } from './components/dialogs/blackboard-contributors/blackboard-contributors.component';
import { ContributorComponent } from './components/dialogs/blackboard-contributors/components/contributor/contributor.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContributorSortPipe } from './pipes/contributor/contributor-sort.pipe';
import { BlackboardPageComponent } from './components/blackboard-page/blackboard-page.component';
import { BlackboardNavbarComponent } from './components/blackboard-page/components/blackboard-navbar/blackboard-navbar.component';
import { BlackboardColumnComponent } from './components/blackboard-page/components/blackboard-column/blackboard-column.component';
import { ColumnSortPipe } from './pipes/column/column-sort.pipe';
import { BlackboardTicketComponent } from './components/blackboard-page/components/blackboard-ticket/blackboard-ticket.component';
import { TicketSortPipe } from './pipes/ticket/ticket-sort.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTicketComponent } from './components/dialogs/add-ticket/add-ticket.component';
import { EditTicketComponent } from './components/dialogs/edit-ticket/edit-ticket.component';
import { DeleteTicketComponent } from './components/dialogs/delete-ticket/delete-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InfoPageComponent,
    NotFoundPageComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserinfoPageComponent,
    UserinfoNavbarComponent,
    UserinfoEditComponent,
    UserinfoDeleteComponent,
    UserinfoHelpComponent,
    BlackboardListPageComponent,
    BlackboardComponent,
    AddBlackboardComponent,
    AddBlackboardContributorComponent,
    DeleteBlackboardComponent,
    EditBlackboardComponent,
    BlackboardSortPipe,
    BlackboardContributorsComponent,
    ContributorComponent,
    ContributorSortPipe,
    BlackboardPageComponent,
    BlackboardNavbarComponent,
    BlackboardColumnComponent,
    ColumnSortPipe,
    BlackboardTicketComponent,
    TicketSortPipe,
    AddTicketComponent,
    EditTicketComponent,
    DeleteTicketComponent
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
    MatDividerModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    DragDropModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthorizationService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
