/**
 * Created by Home on 3/4/2017.
 */

import {Injectable, OnInit} from "@angular/core";
import {ConverterUtils} from "./converter.service";

@Injectable()
export class BaseService implements OnInit{
  private _serviceId:number;
  private _serviceUrl:string;

  constructor(serviceId:number) {
    this._serviceId = serviceId;
  }

  ngOnInit(): void {
    this._serviceUrl = ConverterUtils.getServiceUrlFromJsonString(this.getDetailsServerUrl(this._serviceId));
  }

  private getDetailsServerUrl(...queryParams:Array<string|number>) : string {
    let basePath:string = "http://localhost:9011/serviceDetails";
    let url = basePath;
    for (let queryParam of queryParams) {
      url += "/" + queryParam;
    }
    return url;
  }
}
