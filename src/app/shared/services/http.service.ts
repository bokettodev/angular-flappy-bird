import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpArguments } from '@shared/interfaces';

function getUrl({ urlHost, urlPath }: IHttpArguments): string {
  return `${urlHost || ''}/${urlPath}`;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  get<T>({ urlHost, urlPath, httpClientOptions }: IHttpArguments): Observable<T> {
    return this.httpClient.get<T>(getUrl({ urlHost, urlPath }), httpClientOptions);
  }

  post<T>({ urlHost, urlPath, body, httpClientOptions }: IHttpArguments): Observable<T> {
    return this.httpClient.post<T>(getUrl({ urlHost, urlPath }), body, httpClientOptions);
  }

  put<T>({ urlHost, urlPath, body, httpClientOptions }: IHttpArguments): Observable<T> {
    return this.httpClient.put<T>(getUrl({ urlHost, urlPath }), body, httpClientOptions);
  }

  patch<T>({ urlHost, urlPath, body, httpClientOptions }: IHttpArguments): Observable<T> {
    return this.httpClient.patch<T>(getUrl({ urlHost, urlPath }), body, httpClientOptions);
  }

  delete<T>({ urlHost, urlPath, httpClientOptions }: IHttpArguments): Observable<T> {
    return this.httpClient.delete<T>(getUrl({ urlHost, urlPath }), httpClientOptions);
  }
}
