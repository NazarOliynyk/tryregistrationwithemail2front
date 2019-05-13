import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './User';
import {Observable} from 'rxjs';
import {ResponseTransfer} from './ResponseTransfer';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/saveUser', user);
  }

  login(user: User) {
    return this.http.post(this.url + '/login',
      JSON.stringify({username: user.username,
        password: user.password}),
      {observe: 'response'});
  }

  getUsers(headersOption: HttpHeaders): Observable<User[]> {
    return this.http.get<User[]>(
      this.url + '/getUsers', {headers: headersOption});
  }

  deleteUser(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteUser/' + id, {headers: headersOption});
  }

}
