import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VpnGroup } from '../components/home/Vpn';


@Injectable({
  providedIn: 'root'
})
export class VpngroupService {

  constructor(private http: HttpClient) { }

  getVpnGroups() {
    return this.http.get<{data:VpnGroup[]}>('assets/VpnGroups.json')
                .toPromise()
                .then(res => <VpnGroup[]>res.data)
                .then(data => { return data; });
  }
}
