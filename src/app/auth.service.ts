import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://34.207.183.15:4000/users/authenticate';
const RIG_API = 'http://34.207.183.15:4000/users/register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(RIG_API, {
      username: user.username,
      hash: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }, httpOptions);
  }
}
