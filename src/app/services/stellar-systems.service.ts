import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { StellarSystem } from '../model/stellar-system';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StellarSystemsService {
  readonly ROOT_SYS_URL: string = APIService.ROOT_URL + '/StellarSystem';

  constructor(private apiService: APIService) {}

  addSystem(sys: StellarSystem): Observable<StellarSystem> {
    const url = this.ROOT_SYS_URL;
    return this.apiService.sendPostRequest<StellarSystem>(url, sys, null).pipe(
      map((response) => {
        if (response.body === null) {
          throw new Error('Reponse vide.');
        }
        return response.body;
      })
    );
  }

  getAllSystems(): Observable<Array<StellarSystem>> {
    const url = this.ROOT_SYS_URL + '/all';
    return this.apiService.sendGetRequest<Array<StellarSystem>>(url, null);
  }

  getSystemById(id: number): Observable<StellarSystem> {
    const url = this.ROOT_SYS_URL + '/' + id;
    return this.apiService.sendGetRequest<StellarSystem>(url, null);
  }

  updateSystem(sys: StellarSystem): Observable<StellarSystem> {
    const url = this.ROOT_SYS_URL;
    return this.apiService.sendPutRequest<StellarSystem>(url, sys, null);
  }

  patchSystem(sys: StellarSystem): Observable<StellarSystem> {
    const url = this.ROOT_SYS_URL;
    return this.apiService.sendPatchRequest<StellarSystem>(url, sys, null);
  }

  deleteSystem(id: number): Observable<StellarSystem> {
    const url = this.ROOT_SYS_URL + '/' + id;
    return this.apiService.sendDeleteRequest<StellarSystem>(url, null);
  }
}
