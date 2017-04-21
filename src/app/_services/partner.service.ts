import {Injectable} from "@angular/core";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
/**
 * Created by Home on 3/4/2017.
 */
@Injectable()
export class PartnerService {

  constructor(private httpWrap: HttpWrap) {

  }

  getPartnerById(partnerId: number): Observable<string> {
    return this.httpWrap.get("http://localhost:8081/partner/partnerRoom?partnerId=" + partnerId)
      .map((response: Response) => response.text());
  }

  getPartnerImage(partnerId: number): Observable<string> {
    return this.httpWrap.get('http://localhost:8081/partner/accountImage?partnerId=' + partnerId)
      .map((response: Response) => response.text());
  }

  getPartnerPhotos(partnerId:number):Observable<string>{
    return this.httpWrap.get('http://localhost:8081/partner/partnerPhotos/' + partnerId)
      .map((response: Response) => response.text());
  }

  savePartnerEditedMainInfo(data: string) {
    return this.httpWrap.post('http://localhost:8081/partner/saveEditedMainInfo', data)
           .map((response: Response) => response.text())
  }

  savePartnerAddress(data: string) {
    return this.httpWrap.post('http://localhost:8081/partner/saveEditedAddress', data)
           .map((response: Response) => response.text())

  }
  savePartnerNotices(data: string) {
    return this.httpWrap.post('http://localhost:8081/partner/saveEditedNotice', data)
           .map((response: Response) => response.text())

  }


}
