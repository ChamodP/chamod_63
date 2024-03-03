import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseAPIurl = 'http://localhost:5500/api/users';

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error('EmployeeService::handleError', error);
    return throwError(error);
  }

  login(loginDetails){
    let APIurl = this.BaseAPIurl + 'login';
    return this.http.post<any>(APIurl,loginDetails).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }


}
