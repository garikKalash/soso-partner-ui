import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
/**
 * Created by Garik.Kalashyan on 1/5/2017.
 */

@Component({
  moduleId: module.id,
  selector: 'wlcPage-component',
  templateUrl: 'wlcPage.component.html',
  styleUrls: ['wlcPage.component.css']
})
export class WelcomePageComponent implements OnInit{
  public _isSigningUser:boolean = false;
  public _isSignupingUser:boolean = false;


  constructor(public router: Router,public authenticationService:AuthenticationService){}

  showSigninDialog(){
    this._isSigningUser = true;
  }

  showSignupDialog(){
    this._isSignupingUser = true;
  }

  ngOnInit(): void {
    this.authenticationService.checkSignedPartner();
  }

}
