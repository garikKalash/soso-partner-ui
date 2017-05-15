import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {ServiceUrlProvider} from "../_commonServices/mode-resolver.service";
/**
 * Created by Home on 3/4/2017.
 */

@Injectable()
export class ClassifierService {
  private myUrl:string = ServiceUrlProvider.getCommonDataServiceUrl();

  constructor(private httpWrap: HttpWrap) {
  }

  public getGeneralServices(): Observable<string> {
    return this.httpWrap.get(this.myUrl + 'commonData/getSosoServices/-1')
      .map((response: Response) => response.text());
  }

  public getServicesByParent(parentId:number): Observable<string> {
    return this.httpWrap.get(this.myUrl + 'commonData/getSosoServices/'+ parentId)
      .map((response: Response) => response.text());
  }


}
