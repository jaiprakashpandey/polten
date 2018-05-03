import {Component, OnInit} from '@angular/core';
import {IntegrationService} from '../integration.service';
import {Vehicle} from "../vehicle";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  msg: string;
  tasks: string[];
  flag: boolean;
  statusList: Vehicle[] = [];

  constructor(private _int: IntegrationService) {
  }

  ngOnInit() {
    this.tasks = ["Add Vehicles", "Delete Vehicles", "Enable Simulation of Vehicles updating their status every minute"];
    this.flag = false;
    this.msg = "";
    this.statusList = this._int.cachedVehicles;
  }

  onSelect(task: string): void {
    this.flag = true;
    this.statusList = this._int.cachedVehicles;
    if (task === "Add Vehicles") {
      console.log(task)
      this.addTestVehicles()
    }

    if (task === "Delete Vehicles") {
      console.log(task)
      this.deleteTestVehicles()
    }
    if (task === "Enable Simulation of Vehicles updating their status every minute") {
      console.log(task)
      this.flag = false;
      this.vehicleRandomSttausUpdateSimulation()
    }
  }

  addTestVehicles(): void {
    this.msg = "";
    this._int.addSomeTestVehicles().subscribe(resp => {
        this.msg = resp.status;
        this.flag = false;
      }, error => {
        this.msg = "Backend server is down , please try later";
        this.flag = true;
      }
    );
  }

  deleteTestVehicles(): void {
    this.msg = "";
    this._int.clearTestVehicles().subscribe(resp => {
        this.msg = resp.status;
        this.flag = false;
      }, error => {
        this.msg = "Backend server is down , please try later";
        this.flag = true;
      }
    );
  }

  vehicleRandomSttausUpdateSimulation(): void {
    if (typeof this.statusList != 'undefined') {
      for (let v of this.statusList) {
        if (v.status === "DC") {
          v.status = "CON"
        } else {
          v.status = "DC"
        }
      }
      this.statusList.forEach(vehicle => this.sendStatus(vehicle));
      this.simulateRandomVehiclesSendingTheirStatusEveryMinute();
    } else {
      this.msg = "Simulation is NOT enabled as there are not any registered vehicles, please register/add some vehicles"
    }
  }

  private simulateRandomVehiclesSendingTheirStatusEveryMinute(): void {
    Observable.timer(60000).first().subscribe(() => this.vehicleRandomSttausUpdateSimulation());
  }

  sendStatus(v: Vehicle) {
    this._int.simulateVehiclesSendingTheirStatus(v).subscribe(resp => {
        this.msg = "VEHICLES " + resp.status + ", Simulation for Vehicles to send their status every minute has been ENABLED";
      }, error => {
        this.msg = "Backend server is down , please try later" + error;
      }
    );
  }
}
