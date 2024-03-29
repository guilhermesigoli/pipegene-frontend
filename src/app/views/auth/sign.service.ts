import { ILogin, ISignup, IUser } from './../../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(
    private http: HttpClient
  ) { }


  login(login: ILogin): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/login`, login, {observe: 'response'});
  }


  signup(signup: ISignup): Observable<IUser> {
    return this.http.post<IUser>(`${environment.baseUrl}/register`, signup);
  }
}
