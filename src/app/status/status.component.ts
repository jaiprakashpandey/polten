import {Component, OnInit} from '@angular/core';
import {IntegrationService} from '../integration.service';
import {Vehicle} from '../vehicle';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/observable/timer";
import "rxjs/add/operator/first";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  vehicles: Vehicle[];
  vColumns: string[];
  vehicleCount: number;

  constructor(private _int: IntegrationService) {
  }

  ngOnInit() {
    this.getStatus();
    this.vColumns = ["VEHICLE#", "STATUS", "REGISTRATION#"];
  }

  getStatus(): void {
    this._int.getStatus().subscribe(vehicles => {
        this.vehicles = vehicles;
        this.subscribeToData();
        this.vehicleCount = this.vehicles.length;
      }
    );
  }

  private subscribeToData(): void {
    Observable.timer(5000).first().subscribe(() => this.getStatus());
  }
}
