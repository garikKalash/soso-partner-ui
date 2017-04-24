import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ChangeDetectorRef} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GMapModule,ButtonModule} from 'primeng/primeng';

import {PartnerAccountComponent} from "./components/partner-account-component/partner-account.component";
import {WelcomePageComponent} from "./components/welcome-page-component/wlcPage.component";
import {HttpWrap} from "./_commonServices/httpWrap.service";
import {PartnerService} from "./_services/partner.service";
import {routing} from "./app.routing";
import {ClassifierService} from "./_services/classifier.service";
import {FileSelectDirective} from "ng2-file-upload";
import {AgmCoreModule} from "angular2-google-maps/core";
import {AddressService} from "./_services/address.service";
import {InputTextModule,ScheduleModule,CalendarModule,DialogModule} from 'primeng/primeng';
import {PartnerOrdersComponent} from "./components/partner-orders-component/partner-orders.component";
import {ScheduleService} from "./_services/schedule.service";


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PartnerAccountComponent,
    FileSelectDirective,
    PartnerOrdersComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDh-16Z7kQiLfD0Fsit_myRwtUCC79JMrc",
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ButtonModule,
    InputTextModule,
    ScheduleModule,
    CalendarModule,
    DialogModule
  ],
  providers: [
    HttpWrap,
    PartnerService,
    ClassifierService,
    AddressService,
    ScheduleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
