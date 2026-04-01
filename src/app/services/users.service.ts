import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly loginUrl = `${APIService.ROOT_URL}/auth/login`;

  constructor(private apiService: APIService) {}

  login(login: string, password: string): void {
    const body = { login, password };
    this.apiService.sendPostRequest<unknown>(this.loginUrl, body, null).pipe(
      map((response: HttpResponse<unknown>) => {
        const authorizationHeader = response.headers.get('Authorization');
        if (!authorizationHeader?.startsWith('Bearer ')) {
          throw new Error('JWT non trouve dans le header Authorization.');
        }
        const jwt = authorizationHeader.replace('Bearer ', '');
        this.apiService.jwt = jwt;
      })
    ).subscribe();
  }
}
