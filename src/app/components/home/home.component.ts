import { Component, OnInit } from '@angular/core';

import { VpnService } from 'src/app/services/vpn.service';
import {Vpn} from './Vpn';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayDialog: boolean;

  vpn: Vpn = {Grup_Adi:[]};

  selectedVpn: Vpn;

  newVpn: boolean;

  vpns: Vpn[];

  cols: any[];

  selectedValues: boolean[];

  disabledColumns: boolean = false;

  types: SelectItem[]=[
    {label:'İç', value:'İç'},
    {label:'Dış', value:'Dış'}
  ];

  sourceVpnGroup: string[];

  vpnGrupVisible:boolean=true;

  constructor(private vpnService: VpnService) { }

  ngOnInit() {
      this.vpnService.getVpns().then(vpns => this.vpns = vpns);

      this.cols = [
          { field: 'Kullanici_Adi', header: 'Kullanıcı Adı' },
          { field: 'Request_ID', header: 'Request ID' },
          { field: 'Baslangic_Tarihi', header: 'Başlangıç Tarihi' },
          { field: 'Bitis_Tarihi', header: 'Bitiş Tarihi' },
          { field: 'Talep_Acan', header: 'Talep Açan' },
          { field: 'KullaniciType', header: 'Kullanıcı Tipi' },
          { field: 'Grup_Adi', header: 'Grup Adı' }
      ];
  }

  showDialogToAdd() {
      this.newVpn = true;
      this.vpn = {Grup_Adi:[]};
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
      this.displayDialog = true;
  }

  cloneVpn(c: Vpn): Vpn {
      let vpn = {Grup_Adi:[]};
      for (let prop in c) {
            vpn[prop] = c[prop];
      }
      return vpn;
  }

  onDialogShow(){
    this.disabledColumns=!this.newVpn;
    //sourceVpnGroup will be taken from a dataset.
    this.sourceVpnGroup=['TEI_VPN_Ad1','TEI_VPN_Ad2','TEI_VPN_Ad3'];
    this.sourceVpnGroup = this.sourceVpnGroup.filter(item => this.vpn.Grup_Adi.indexOf(item) < 0);
  }

  onDialogHide(){
    this.vpnGrupVisible=true;
  }

  gTalepClick(){
    this.vpnGrupVisible=!this.vpnGrupVisible;
    this.selectedValues=[];
  }

  
  
} 

