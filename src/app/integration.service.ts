import { Injectable } from '@angular/core';
import {HttpClient }from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class IntegrationService {

microServiceUrl = 'http://localhost:8080/status';
constructor(private http: HttpClient) { }

  getStatus(): Observable<any> {
      return this.http.get(this.microServiceUrl, {responseType: 'json'});
}
}
