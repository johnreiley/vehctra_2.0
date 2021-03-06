import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle/vehicle.model';
import { Subscription } from 'rxjs';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  subscription: Subscription;

  constructor(private vehicleService: VehicleService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.startLoading();
    this.vehicleService.getVehicles();
    this.subscription = this.vehicleService.vehicleChangedEvent.subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        this.loadingService.stopLoading();
      }
    )
  }

}
