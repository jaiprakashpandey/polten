import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/empty";

@Injectable()
export class IntegrationService {

  microServiceStatusUrl = 'http://localhost:8080/status';
  microServiceMigrateUrl = 'http://localhost:8080/status/migrate';
  microServiceClearTestDataUrl = 'http://localhost:8080/status/clear';

  constructor(private http: HttpClient) {
  }

  getStatus(): Observable<any> {
    return this.http.get(this.microServiceStatusUrl, {responseType: 'json'})
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
    ;
  }

  addSomeTestVehicles(): Observable<any> {
    return this.http.get(this.microServiceMigrateUrl, {responseType: 'json'})
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }

  clearTestVehicles(): Observable<any> {
    return this.http.get(this.microServiceClearTestDataUrl, {responseType: 'json'})
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }
}
