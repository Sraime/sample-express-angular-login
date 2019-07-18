import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpOptionsBuilder } from '../libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpBuilder: HttpOptionsBuilder;

  authUrl = 'http://localhost:3000/singin';

  constructor(private http: HttpClient) { 
    this.httpBuilder = new HttpOptionsBuilder();
  }

  singin(email: String, password: String): Observable<AuthResponse> {

    let h: HttpHeaders = this.httpBuilder.getHeader();
    return  this.http.post<AuthResponse>(this.authUrl, {email: email, password: password}, {headers: h})
      .pipe(
        tap((response) => {localStorage.setItem("token", response.token.toString())})
      )
  }

  isLoggedIn():boolean { 
    const delay = parseInt(localStorage.getItem('tokenExpiration')) - Date.now();
    return delay > 0 ? true : false;

   }
}
