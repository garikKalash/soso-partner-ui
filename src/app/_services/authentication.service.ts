import {Injectable} from "@angular/core";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Router} from "@angular/router";
import {Client} from "../_models/client.model";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ConverterUtils} from "../_commonServices/converter.service";
import {Partner} from "../_models/partner.model";
import {ServiceUrlProvider} from "../_commonServices/mode-resolver.service";
/**
 * Created by Home on 3/4/2017.
 */
@Injectable()
export class AuthenticationService {
  private myUrl:string = ServiceUrlProvider.getAuthenticationServiceUrl();

  constructor(private httpWrap: HttpWrap,
              private router: Router) {

  }

  checkSignedPartner() {
    let partnerId: string = localStorage.getItem("soso_registered_partner_id");
    if (partnerId) {
      let token: string = localStorage.getItem("soso_partner_token")
      HttpWrap.getHeaders().set('token', token);
      HttpWrap.getHeaders().set('partnerId', partnerId);
      this.router.navigate(["/partneraccount"], {queryParams: {partnerId: +partnerId}});
    } else {
      this.router.navigate(["/home"]);
    }

  }

  checkUnSignedPartner() {
    let partnerId: string = localStorage.getItem("soso_registered_partner_id");
    if (!partnerId) {
      this.router.navigate(["/home"]);
    }

  }

  signin(partner: Partner): Observable<string> {
   return this.signinReq(partner);
  }

  signup(partner: Partner): Observable<string> {
    return this.registerReq(partner);
  }

  logout(id:number): void {
    this.logoutReq(id).subscribe(
      () => {
        HttpWrap.getHeaders().set('token', '');
        HttpWrap.getHeaders().set('partnerId', '');
        localStorage.removeItem("soso_partner_token");
        localStorage.removeItem("soso_registered_partner_id");
        this.router.navigate(["/home"]);
      }
    )
  }

  private signinReq(partner: Partner): Observable<string> {
    let data = JSON.stringify(partner);
    return this.httpWrap.post(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/signinpartner/', data)
      .map((response: Response) => response.text());
  }

  private registerReq(partner: Partner): Observable<string> {
    let data = JSON.stringify(partner);
    return this.httpWrap.post(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/addpartner/', data)
      .map((response: Response) => response.text());
  }

  private logoutReq(id: number): Observable<string> {
    return this.httpWrap.delete(this.myUrl + 'authenticateService/deleteToken/2/' + id + '/' + HttpWrap.getHeaders().get('soso_partner_token'))
      .map((response: Response) => response.text());
  }

 getAndPutToken(partner: Partner): void {
    this.httpWrap.get(this.myUrl + "authenticateService/getToken/2/" + partner.id + "/" + partner.telephone).map(
      (response: Response) => response.text()).subscribe(
      data => {
        let token: string = JSON.parse(data)["createdToken"]["key"];
        HttpWrap.getHeaders().set('token', token);
        localStorage.setItem("soso_partner_token", token);
        HttpWrap.getHeaders().set('partnerId', ConverterUtils.partnerIdFromJson(data));
        localStorage.setItem("soso_registered_partner_id", JSON.stringify(partner.id));
        this.router.navigate(["/partneraccount"], {queryParams: {partnerId: +partner.id}});
      }
    )
  }

}
