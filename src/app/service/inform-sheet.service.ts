import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InformSheetService {
  constructor(private http: HttpClient) {}
  rootURL = 'http://localhost:5000/informs';

  handleError(error: HttpErrorResponse) {
    let errorMessage = '發生未知的錯誤!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `錯誤內容: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `錯誤程式碼: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getInform() {
    return this.http
      .get(this.rootURL)
      .pipe(retry(3), catchError(this.handleError));
  }

  addInform(details: any) {
    // let headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data'});
    //   let options = { headers: headers };
    return this.http.post(this.rootURL, details);
  }
}
