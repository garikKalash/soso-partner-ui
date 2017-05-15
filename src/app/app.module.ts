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
import {PartnerOrdersComponent} from "./components/partner-orders-component/partner-orders.component";
import {ScheduleService} from "./_services/schedule.service";
import {DataListModule} from "primeng/components/datalist/datalist";
import {AuthenticationService} from "./_services/authentication.service";
import {InputTextModule,ScheduleModule,CalendarModule,
        DialogModule,TabViewModule,DropdownModule,InputSwitchModule} from 'primeng/primeng';
import {ConnectToSystemComponent} from "./components/register-partner-component/connectToSystem.component";
import {LoginComponent} from "./components/login-component/login.component";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EventListenerService} from "./_services/event-listener.service";
import {ClientService} from "./_services/client.service";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {RatingModule} from "ngx-rating";
import {TranslateService} from "./translate/translate.service";
import {TRANSLATION_PROVIDERS} from "./translate/translations";
import {TranslatePipe} from "./translate/translate.pipe";



@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PartnerAccountComponent,
    FileSelectDirective,
    PartnerOrdersComponent,
    ConnectToSystemComponent,
    LoginComponent,
    TranslatePipe
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDh-16Z7kQiLfD0Fsit_myRwtUCC79JMrc",
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ButtonModule,
    InputTextModule,
    ScheduleModule,
    CalendarModule,
    DialogModule,
    TabViewModule,
    DataListModule,
    DropdownModule,
    InputSwitchModule,
    DataTableModule,
    DataGridModule,
    RatingModule
  ],
  providers: [
    HttpWrap,
    PartnerService,
    ClassifierService,
    AddressService,
    ScheduleService,
    AuthenticationService,
    EventListenerService,
    ClientService,
    TranslateService,
    TRANSLATION_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
