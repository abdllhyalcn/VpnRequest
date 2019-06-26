import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Car } from '../components/home/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

    getCarsSmall() {
        return this.http.get<{data:Car[]}>('assets/cars-small.json')
                    .toPromise()
                    .then(res => <Car[]> res.data)
                    .then(data => { return data; });
    }

}
