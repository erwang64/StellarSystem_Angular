import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { APIService } from './api.service';
import { User } from '../model/user';
import { ConnectionCentralizer } from '../technical/connection-centralizer';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly loginUrl = `${APIService.ROOT_URL}/users/login`;

  constructor(private apiService: APIService) {}

  login(login: string, password: string): void {
    const usr : User = new User();
    usr.login = login;
    usr.password = password;
    let url = this.loginUrl
    let obs: Observable<HttpResponse<User>> = this.apiService.sendPostRequestWithResponseHeaders<User>(url, usr, null);
    obs.subscribe((data: HttpResponse<User>) => {
    let heeders: HttpHeaders = data.headers;
    let jwt: string | null = heeders.get("Authorization");
    let user: User = Object.assign(new User(), data.body);
    ConnectionCentralizer.getInstance().connectionChanged(user, jwt);
    console.log("**********************************************************");
    console.log("JWT : " + jwt);
    console.log("User : " + user);
    console.log("**********************************************************");
    });
  }

  disconnect(): void {
    ConnectionCentralizer.getInstance().connectionChanged(null, null);
    console.log("**********************************************************");
    console.log("User disconnected");
    console.log("**********************************************************"); 
  }
}
