import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { StellarSystem } from '../model/stellar-system';
import { APIService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionCentralizer } from '../technical/connection-centralizer';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StellarSystemsService {
  readonly ROOT_SYS_URL: string = APIService.ROOT_URL + '/StellarSystem';

// ************* SIGNAL *************
  private allSystems_signal = signal<StellarSystem[]>([]);
  allSystems = this.allSystems_signal.asReadonly();
  

  constructor(private apiService: APIService) {}

  

  addSystem(sys: StellarSystem): Observable<StellarSystem> {
    let header: HttpHeaders | null = null;
    let jwt: string | null = ConnectionCentralizer.getInstance().jwt;
    if (jwt != null) {
      header = new HttpHeaders({
        Authorization: jwt,
      });

      
    }
    return this.apiService.sendPostRequestWithResponseHeaders<StellarSystem>(this.ROOT_SYS_URL, sys, header).pipe(map((response) => response.body as StellarSystem));

  }

  getAllSystems(): Observable<Array<StellarSystem>> {
    let url = this.ROOT_SYS_URL + '/all';
    return this.apiService.sendGetRequest<Array<StellarSystem>>(url, null).pipe(map(data => { this.allSystems_signal.set(data);
      return data
    }))
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
    return this.apiService.sendDeleteRequest<StellarSystem>(url, null).pipe(map(data => {
      this.allSystems_signal.update(curr => curr.filter(sys => sys.id !== id));
      return data;
    }));
  }
}
