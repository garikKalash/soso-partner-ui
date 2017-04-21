/**
 * Created by Garegin.Kalashyan on 12/28/2016.
 */
import {Routes, RouterModule} from '@angular/router';
import {WelcomePageComponent} from "./components/welcome-page-component/wlcPage.component";
import {ConnectToSystemComponent} from "./components/register-partner-component/connectToSystem.component";
import {LoginComponent} from "./components/login-component/login.component";
import {PartnerAccountComponent} from "./components/partner-account-component/partner-account.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: WelcomePageComponent,
  },
  {
    path: "partneraccount",
    component: PartnerAccountComponent
  },
 /* {
    path: "connectPartnerToSystem",
    component: ConnectToSystemComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },*/


  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
