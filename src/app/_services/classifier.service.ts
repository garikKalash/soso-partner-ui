import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Injectable} from "@angular/core";
/**
 * Created by Home on 3/4/2017.
 */

@Injectable()
export class ClassifierService {

  constructor(private httpWrap: HttpWrap) {
  }

  public getServices(): Observable<string> {
    return this.httpWrap.get('http://localhost:8001/commonData/getSosoServices')
      .map((response: Response) => response.text());
  }

}
