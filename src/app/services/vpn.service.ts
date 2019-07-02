import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vpn } from '../components/home/Vpn';

@Injectable({
  providedIn: 'root'
})
export class VpnService {

  constructor(private http: HttpClient) { }
  
  getVpns() {
    return this.http.get<{data:Vpn[]}>('assets/VpnRequests.json')
                .toPromise()
                .then(res => <Vpn[]> res.data)
                .then(data => { return data; });
  }
}
