import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
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
  constructor(
    private router: Router){}

  registerPartner() {
    this.router.navigate(["/partneraccount"]);
  }

  ngOnInit(): void {
    this.router.navigate(["/partneraccount"],{queryParams: {partnerId:1}});
  }

  signin(){
    this.router.navigate(["/register"],{queryParams: {partnerId:1}});
  }
}
