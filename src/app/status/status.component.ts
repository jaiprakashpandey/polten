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
  filteredVehicles: Vehicle[] = [];
  cachedVehicles: Vehicle[];
  loadedFlag: boolean;

  constructor(private _int: IntegrationService) {
  }

  ngOnInit() {
    this.getStatus();

    this.vColumns = ["Vehicle Id", "Status", "Registration#", "Owner", "Owner Id", "Address"];
  }

  getStatus(): void {
    this._int.getStatus().subscribe(vehicles => {
        this.loadedFlag = false;
        this.vehicles = vehicles;
        this.cachedVehicles = vehicles;
        this.subscribeToData();
        this.vehicleCount = this.vehicles.length;
        this.loadedFlag = true;
      }
    );
  }

  private subscribeToData(): void {
    Observable.timer(60000).first().subscribe(() => this.getStatus());
  }


  private applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.filteredVehicles.length = 0;
    for (let v of this.vehicles) {
      if ((filterValue === v.status.toLowerCase()) || (filterValue === v.ownerId.toLowerCase())) {
        this.filteredVehicles.push(v);
      }
    }
    if (this.filteredVehicles.length != 0) {
      this.vehicles = this.filteredVehicles;
    } else {
      this.vehicles = this.cachedVehicles;
    }
  }
}
