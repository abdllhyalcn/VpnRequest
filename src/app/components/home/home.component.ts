import { Component, OnInit } from '@angular/core';

import { VpnService } from 'src/app/services/vpn.service';
import {Vpn} from './Vpn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayDialog: boolean;

  vpn: Vpn = {};

  selectedVpn: Vpn;

  newVpn: boolean;

  vpns: Vpn[];

  cols: any[];

  disabled: boolean = false;

  constructor(private vpnService: VpnService) { }

  ngOnInit() {
      this.vpnService.getVpns().then(vpns => this.vpns = vpns);

      this.cols = [
          { field: 'Kullanici_Adi', header: 'Kullanıcı Adı' },
          { field: 'Request_ID', header: 'Request ID' },
          { field: 'Baslangic_Tarihi', header: 'Başlangıç Tarihi' },
          { field: 'Bitis_Tarihi', header: 'Bitiş Tarihi' },
          { field: 'Talep_Acan', header: 'Talep Açan' },
          { field: 'Kullanici', header: 'Kullanıcı' },
          { field: 'Grup_Adi', header: 'Grup Adı' }
      ];
  }

  showDialogToAdd() {
      this.newVpn = true;
      this.vpn = {};
      this.dialogDisable(false);
      this.displayDialog = true;
  }

  save() {
     // let vpns = [...this.vpns];
      if (this.newVpn)
            this.vpns.push(this.vpn);
            //should be sent to database
      else
            this.vpns[this.vpns.indexOf(this.selectedVpn)] = this.vpn;

    //  this.vpns = vpns;
      this.vpn = null;
      this.displayDialog = false;
  }

  delete() {
      let index = this.vpns.indexOf(this.selectedVpn);
      this.vpns = this.vpns.filter((val, i) => i != index);
      this.vpn = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newVpn = false;
      this.vpn = this.cloneVpn(event.data);
      this.dialogDisable(true);
      this.displayDialog = true;
  }

  cloneVpn(c: Vpn): Vpn {
      let vpn = {};
      for (let prop in c) {
            vpn[prop] = c[prop];
      }
      return vpn;
  }

  dialogDisable(disable:boolean){
    this.disabled = disable;
  }
  
}

