import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PickListModule} from 'primeng/picklist';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import { CommonModule } from '@angular/common';
import { UsernameService } from './services/username.service';
import { VpnService } from './services/vpn.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CalendarModule,
    SelectButtonModule,
    PickListModule,
    CardModule,
    CheckboxModule,
    AutoCompleteModule,
    OverlayPanelModule,
    CommonModule

  ],
  providers: [UsernameService,VpnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
