import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { JwtToken } from '../authentication/interfaces/jwt-token';
import { JwtAuthService } from '../authentication/jwt-auth.service';
import { EditUserData } from './interfaces/edit-user-data';
import { UserData } from './interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
    ) { }

  private loggedUserInfoURL : string = 'http://localhost:8080/api/users';

  private editUserDataURL : string = 'http://localhost:8080/api/users';

  private deleteUserDataURL : string = 'http://localhost:8080/api/users';

  getLoggedUserInfo() : Observable<UserData> {
    return this.http.get<UserData>(this.loggedUserInfoURL);
  }

  editLoggedUserData(userData : EditUserData) : Observable<JwtToken> {
    return this.http.put<JwtToken>(this.editUserDataURL, userData);
  }

  deleteLoggedUserAccount() {
    return this.http.delete<JwtToken>(this.deleteUserDataURL);
  }
}
