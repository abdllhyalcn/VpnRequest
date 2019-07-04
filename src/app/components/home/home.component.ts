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

  vpn: Vpn={Kullanici_Adi:{}, Talep_Acan:{} , Grup_Adi:[]} ;

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

  username:Username;


  constructor(private vpnService: VpnService,
              private usernameService: UsernameService) { }

  ngOnInit() {
      this.vpnService.getVpns().then(vpns => this.vpns = vpns);

      this.cols = [
          { field: 'Kullanici_Adi',subfield: 'userNameSurname', header: 'Kullanıcı Adı' },
          { field: 'Request_ID', header: 'Request ID' },
          { field: 'Baslangic_Tarihi', header: 'Başlangıç Tarihi' },
          { field: 'Bitis_Tarihi', header: 'Bitiş Tarihi' },
          { field: 'Talep_Acan', subfield: 'userNameSurname', header: 'Talep Açan' },
          { field: 'KullaniciType', header: 'Kullanıcı Tipi' },
          { field: 'Grup_Adi', header: 'Grup Adı' }
      ];
  }

  showDialogToAdd() {
      this.newVpn = true;
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
      this.displayDialog = false;
  }

  delete() {
      let index = this.vpns.indexOf(this.selectedVpn);
      this.vpns = this.vpns.filter((val, i) => i != index);
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newVpn = false;
      this.vpn = this.cloneVpn(event.data);
      this.displayDialog = true;
  }

  cloneVpn(c: Vpn): Vpn {
      let vpn = {};
      for (let prop in c) {
            vpn[prop] = c[prop];
      }
      return vpn;
  }

  sourceVpnGroup: string[];

  onDialogShow(){
    this.disabledColumns=!this.newVpn;
    this.selectedValues=null;
    //sourceVpnGroup will be taken from a dataset.
    this.sourceVpnGroup=['TEI_VPN_Ad1','TEI_VPN_Ad2','TEI_VPN_Ad3'];
    this.sourceVpnGroup = this.sourceVpnGroup.filter(item => this.vpn.Grup_Adi.indexOf(item) < 0);
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
    let filtered : Username[] = [];
    for(let i = 0; i < usernames.length; i++) {
        let username = usernames[i];
        if(username.code.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(username);
        }
    }
    if(filtered.length==0){
      filtered.push({"userNameSurname": "Kullanıcı Adı Ekleyiniz", "code": "nwusr"});
      console.log("asdasd")
    }
    return filtered;
  }

  displayNewUserDialog:boolean=false;

  autoConSelect(value){
    if(value.code=="nwusr"){
      this.displayNewUserDialog=!this.displayNewUserDialog;
    }
  }

  newUsername:Username={};

  saveUsername(username:Username){
    //this will be completed.
    this.newUsername={};

  }




} 

