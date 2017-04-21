/**
 * Created by Home on 12/28/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  selector: 'login-component',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  ngOnInit(): void {
  }

  /*constructor(private clientService: ClientService,
   private authenticationService: AuthenticationService) {
   this.userTypeProvider = new UserTypeItems();
   }


   ngOnInit(): void {
   this.userTypeProvider.initItems();
   }

   login() {
   this.loading = true;
   this.userTypeProvider.isCLient ? this.clientLogin() : {};
   }

   clientLogin(): void {
   this.clientService.signin(this.model)
   .subscribe(
   (responseString: string) => {
   this.authenticationService.login(responseString, true);
   });
   }

   getUserTypes(): MenuItem[] {
   return this.userTypeProvider.items;
   }

   getStartIndexOfUserTypes(): number {
   return this.userTypeProvider._activeIndex;
   }*/
}

