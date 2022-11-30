import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseURL = env.API_URL + '/auth';
  constructor(private http: HttpClient) {}

  signUp(
    username: string,
    email: string,
    password: string,
    confirm: string
  ): Observable<any> {
    return this.http
      .post(
        this.baseURL + '/signup',
        {
          username,
          email,
          password,
          confirm,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          observe: 'response',
          responseType: 'text',
          reportProgress: true,
        }
      )
      .pipe(retry(1));
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http
      .post(
        this.baseURL + '/signin',
        {
          email,
          password,
        },
        {
          observe: 'response',
        }
      )
      .pipe(retry(1));
  }
}
