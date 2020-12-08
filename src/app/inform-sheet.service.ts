import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformSheetService {

  constructor(private http:HttpClient) { }
  rootURL = 'http://34.207.183.15:4000/inform';

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

  getInform(){
    return this.http.get(this.rootURL).pipe(retry(3), catchError(this.handleError));
  }

  addInform(details:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      let options = { headers: headers };   
      return this.http.post(this.rootURL ,details, options);
  }

}
