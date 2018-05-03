import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/empty";
import {Vehicle} from "./vehicle";
import {tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class IntegrationService {

  µ_ServiceStatusUrl = 'http://localhost:8080/status';
  µ_ServiceMigrateUrl = 'http://localhost:8080/status/migrate';
  µ_ServiceClearTestDataUrl = 'http://localhost:8080/status/clear';
  µ_ServiceUpdateDataUrl = 'http://localhost:8080/status/update';

  cachedVehicles: any;

  constructor(private http: HttpClient) {
  }

  getStatus(): Observable<any> {
    return this.http.get(this.µ_ServiceStatusUrl, {responseType: 'json'})
      .pipe(tap(statusList => this.cachedVehicles = statusList))
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
    ;
  }

  addSomeTestVehicles(): Observable<any> {
    return this.http.get(this.µ_ServiceMigrateUrl, {responseType: 'json'})
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }

  clearTestVehicles(): Observable<any> {
    return this.http.get(this.µ_ServiceClearTestDataUrl, {responseType: 'json'})
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }

  simulateVehiclesSendingTheirStatus(veh: Vehicle): Observable<any> {
    console.log("Service hit")
    return this.http.post<Vehicle>(this.µ_ServiceUpdateDataUrl, veh, httpOptions)
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }
}
