import {Component, OnInit} from '@angular/core';
import {IntegrationService} from '../integration.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  msg: string;
  tasks: string[];
  flag: boolean;

  constructor(private _int: IntegrationService) {
  }

  ngOnInit() {
    this.tasks = ["Add Vehicles", "Delete Vehicles"];
    this.flag = false;
    this.msg = "";
  }

  onSelect(task: string): void {
    this.flag = true;
    if (task === "Add Vehicles") {
      console.log(task)
      this.addTestVehicles()
    }

    if (task === "Delete Vehicles") {
      console.log(task)
      this.deleteTestVehicles()
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
}
