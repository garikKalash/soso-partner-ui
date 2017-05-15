import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {ServiceUrlProvider} from "../_commonServices/mode-resolver.service";
/**
 * Created by Home on 5/1/2017.
 */
@Injectable()
export class ClientService{
  private myUrl:string = ServiceUrlProvider.getClientServiceUrl();

  constructor(private httpWrap:HttpWrap){

  }

  getClientMainDetailsById(clientId: number): Observable<string> {
    return this.httpWrap.get(this.myUrl + "client/clientmaindetails/" + clientId)
      .map((response: Response) => response.text());
  }
}
