import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vpn, Username } from '../components/home/Vpn';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private http: HttpClient) { }

    getUsernames() {
      return this.http.get<{data:Username[]}>('assets/Usernames.json')
                  .toPromise()
                  .then(res => <Username[]>res.data)
                  .then(data => { return data; });
    }

}
