import {Injectable} from "@angular/core";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Partner} from "../_models/partner.model";
import {AuthenticationService} from "./authentication.service";
import {PartnerServiceDetail} from "../_models/partner-service-detail.model";
import {ServiceUrlProvider} from "../_commonServices/mode-resolver.service";
/**
 * Created by Home on 3/4/2017.
 */
@Injectable()
export class PartnerService {
  private myUrl:string = ServiceUrlProvider.getPartnerServiceUrl();

  constructor(private httpWrap: HttpWrap, private authenticationService: AuthenticationService) {

  }

  getPartnerById(partnerId: number): Observable<string> {
    return this.httpWrap.get(this.myUrl + "partner/partnerRoom/" + partnerId)
      .map((response: Response) => response.text());
  }

  getPartnerImage(partnerId: number): Observable<string> {
    return this.httpWrap.get(this.myUrl + 'partner/accountImage/' + partnerId)
      .map((response: Response) => response.text());
  }

  getPartnerPhotos(partnerId: number): Observable<string> {
    return this.httpWrap.get(this.myUrl + 'partner/partnerPhotos/' + partnerId)
      .map((response: Response) => response.text());
  }

  getPartnerServiceDetails(partnerId: number): Observable<string> {
    return this.httpWrap.get(this.myUrl + 'partner/getservicedetailsforpartner/' + partnerId)
      .map((response: Response) => response.text());
  }

  savePartnerServiceDetails(partnerServiceDetail:PartnerServiceDetail): Observable<string> {
    let trueObj:PartnerServiceDetail = new PartnerServiceDetail(partnerServiceDetail.id,partnerServiceDetail.serviceId,partnerServiceDetail.partnerId,partnerServiceDetail.defaultduration,partnerServiceDetail.price)
    let data = trueObj.toJsonString();
    return this.httpWrap.post(this.myUrl + 'partner/addservicedetailtopartner',data)
      .map((response: Response) => response.text());
  }

  updatePartnerServiceDetails(partnerServiceDetail:PartnerServiceDetail): Observable<string> {
    let data = partnerServiceDetail.toJsonString();
    return this.httpWrap.post(this.myUrl + 'partner/updateservicedetailtopartner',data)
      .map((response: Response) => response.text());
  }

  deletePartnerServiceDetails(itemId: number): Observable<string> {
    return this.httpWrap.delete(this.myUrl + 'partner/deleteservicedetailtopartner/' + itemId)
      .map((response: Response) => response.text());
  }

  deletePartnerPhoto(photoId:number):Observable<string>{
    return this.httpWrap.delete(this.myUrl + 'partner/deletephotofrompartner/' + photoId)
      .map((response: Response) => response.text());

  }



  savePartnerEditedMainInfo(data: string) {
    return this.httpWrap.post(this.myUrl + 'partner/saveEditedMainInfo', data)
      .map((response: Response) => response.text())
  }

  savePartnerAddress(data: string) {
    return this.httpWrap.post(this.myUrl + 'partner/saveEditedAddress', data)
      .map((response: Response) => response.text())

  }

  savePartnerNotices(data: string) {
    return this.httpWrap.post(this.myUrl + 'partner/saveEditedNotice', data)
      .map((response: Response) => response.text())

  }


  signin(partner: Partner): Observable<string> {
    return this.authenticationService.signin(partner);
  }

  register(partner: Partner): Observable<string> {
  return  this.authenticationService.signup(partner);
  }

  logout(id: number): void {
    this.authenticationService.logout(id);
  }

  getAndPutToken(partner:Partner){
    this.authenticationService.getAndPutToken(partner);
  }


}
