import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  rootURL = 'http://localhost:5000/users';

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getUser(){
    return this.http.get(this.rootURL).pipe(retry(3), catchError(this.handleError));
  }

  addUser(details:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      let options = { headers: headers };   
      return this.http.post(this.rootURL ,details, options);
  }


}
