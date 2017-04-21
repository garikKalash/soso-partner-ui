import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import {InputTextModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PartnerAccountComponent,
    FileSelectDirective
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
    InputTextModule
  ],
  providers: [
    HttpWrap,
    PartnerService,
    ClassifierService,
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
