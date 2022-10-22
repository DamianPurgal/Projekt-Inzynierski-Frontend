import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { JwtToken } from './interfaces/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  private loginURL: string = 'http://localhost:8080/login'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  authenticate(username: string, password: string) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.loginURL, { username: username, password: password })
    .pipe(
      map(authData => {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("token", "Bearer " + authData.accessToken);
          return authData;
      })
    );
  }

  isUserLogged() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logoutUser() {
    sessionStorage.removeItem("username");
  }
}
