import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { APIError } from '../model/api-error';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  public static readonly ROOT_URL: string = environment.apiUrl;
  public static readonly DEFAULT_HEADERS: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public static readonly FORM_HEADERS: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  jwt = '';

  constructor(private httpClient: HttpClient) {}

  httpError(error: HttpErrorResponse): Observable<never> {
    let msg = '';
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      const apiError: APIError | null =
        typeof error.error === 'object' ? (error.error as APIError) : null;
      msg =
        'Status : ' +
        error.status +
        '\n' +
        'Message : ' +
        (apiError?.message ?? error.message) +
        '\n' +
        'Resource : ' +
        (apiError?.resourceType ?? 'unknown') +
        '\n' +
        'Id : ' +
        (apiError?.id ?? 'N/A');
    }
    console.log(msg);
    return throwError(() => new Error(msg));
  }

  public sendGetRequest<T>(url: string, headers: HttpHeaders | null): Observable<T> {
    const safeHeaders = headers ?? APIService.DEFAULT_HEADERS;
    const httpOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: safeHeaders
    };
    return this.httpClient.get<T>(url, httpOptions).pipe(retry(1), catchError((error) => this.httpError(error)));
  }

  public sendDeleteRequest<T>(url: string, headers: HttpHeaders | null): Observable<T> {
    const safeHeaders = headers ?? APIService.DEFAULT_HEADERS;
    const httpOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: safeHeaders
    };
    return this.httpClient
      .delete<T>(url, httpOptions)
      .pipe(retry(1), catchError((error) => this.httpError(error)));
  }

  public sendPostRequest<T>(url: string, data: T, headers: HttpHeaders | null): Observable<HttpResponse<T>> {
    const safeHeaders = headers ?? APIService.FORM_HEADERS;
    const httpOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
      headers: safeHeaders
    };
    return this.httpClient.post<T>(url, data, httpOptions).pipe(retry(1), catchError((error) => this.httpError(error)));
  }

  public sendPutRequest<T>(url: string, body: object, headers: HttpHeaders | null): Observable<T> {
    const safeHeaders = headers ?? APIService.DEFAULT_HEADERS;
    const httpOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: safeHeaders
    };
    return this.httpClient.put<T>(url, body, httpOptions).pipe(retry(1), catchError((error) => this.httpError(error)));
  }

  public sendPatchRequest<T>(url: string, body: object, headers: HttpHeaders | null): Observable<T> {
    const safeHeaders = headers ?? APIService.DEFAULT_HEADERS;
    const httpOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: safeHeaders
    };
    return this.httpClient
      .patch<T>(url, body, httpOptions)
      .pipe(retry(1), catchError((error) => this.httpError(error)));
  }

}
