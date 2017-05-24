/**
 * Created by Home on 12/28/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PartnerService} from "../../_services/partner.service";
import {Partner} from "../../_models/partner.model";
import {ConverterUtils} from "../../_commonServices/converter.service";

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  selector: 'login-component',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  _partnerModel: Partner = <Partner>{};
  public _isShortTelephone: boolean = false;
  public _wrongpartner: boolean = false;
  public _isInvalidPassword: boolean = false;

  ngOnInit(): void {
  }

  constructor( public router: Router,public partnerService: PartnerService) {

  }

  signin():void{
    this.partnerService.signin(this._partnerModel).subscribe(
      data => {

        if(<boolean>JSON.parse(data)["isShortTelephone"]){
          this._isShortTelephone = JSON.parse(data)["isShortTelephone"] === 'true';
        }
        if(<boolean>JSON.parse(data)["isInvalidPassword"]) {
          this._isInvalidPassword = JSON.parse(data)["isInvalidPassword"]=== 'true';
        }
        if(<boolean>JSON.parse(data)["wrongpartner"]) {
          this._wrongpartner = JSON.parse(data)["wrongpartner"] === 'true';
        }
        if(!this._isShortTelephone && !this._isInvalidPassword && !this._wrongpartner) {
          this._partnerModel.id = +ConverterUtils.partnerIdFromJson(data);
          this.partnerService.getAndPutToken(this._partnerModel);
        }
      });
  }
}

