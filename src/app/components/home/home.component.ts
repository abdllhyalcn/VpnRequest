import { Component, OnInit } from '@angular/core';

import { VpnService } from 'src/app/services/vpn.service';
import {Vpn, Username} from './Vpn';
import { SelectItem } from 'primeng/components/common/selectitem';
import { UsernameService } from 'src/app/services/username.service';

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

  username:Username;


  constructor(private vpnService: VpnService,
              private usernameService: UsernameService) { }

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
      if (this.newVpn){
            this.vpns.push(this.vpn);
            //should be sent to database
      }
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

  
  filteredUsernames:Username[];

  filterUsernameSingle(event) {
    let query = event.query;
    this.usernameService.getUsernames().then(usernames => {
        this.filteredUsernames = this.filterUsername(query, usernames);
    });
}

  filterUsername(query, usernames: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < usernames.length; i++) {
        let username = usernames[i];
        if(username.code.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(username);
        }
    }
    if(filtered.length==0){
      filtered.push({"nameusername": "Kullanıcı Adı Ekleyiniz", "code": "nwusr"});
      console.log("asdasd")
    }
    return filtered;
  }

  newUsername(value){
    console.log(value);
    if(value.code=="nwusr"){
      console.log("here");
    }
    
  }


} 

