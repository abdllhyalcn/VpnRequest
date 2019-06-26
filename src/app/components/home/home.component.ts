import { Component, OnInit } from '@angular/core';

import { CarService } from 'src/app/services/car.service';
import {Car} from './car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayDialog: boolean;

  car: Car = {};

  selectedCar: Car;

  newCar: boolean;

  cars: Car[];

  cols: any[];

  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsSmall().then(cars => this.cars = cars);

      this.cols = [
          { field: 'Kullanıcı_Adi', header: 'Kullanıcı Adı' },
          { field: 'Request_ID', header: 'Request ID' },
          { field: 'Baslangic_Tarihi', header: 'Başlangıç Tarihi' },
          { field: 'Bitis_Tarihi', header: 'Bitiş Tarihi' },
          { field: 'Talep_Acan', header: 'Talep Açan' },
          { field: 'Kullanici', header: 'Kullanıcı' },
          { field: 'Grup_Adi', header: 'Grup Adı' }
      ];
  }

  showDialogToAdd() {
      this.newCar = true;
      this.car = {};
      this.displayDialog = true;
  }

  save() {
      let cars = [...this.cars];
      if (this.newCar)
          cars.push(this.car);
      else
          cars[this.cars.indexOf(this.selectedCar)] = this.car;

      this.cars = cars;
      this.car = null;
      this.displayDialog = false;
  }

  delete() {
      let index = this.cars.indexOf(this.selectedCar);
      this.cars = this.cars.filter((val, i) => i != index);
      this.car = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newCar = false;
      this.car = this.cloneCar(event.data);
      this.displayDialog = true;
  }

  cloneCar(c: Car): Car {
      let car = {};
      for (let prop in c) {
          car[prop] = c[prop];
      }
      return car;
  }
  
}

