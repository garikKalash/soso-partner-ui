/**
 * Created by Home on 3/4/2017.
 */
/**
 * Created by Home on 1/27/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class HttpWrap{
  private static _headers = new Headers({'Content-Type': 'application/json','Accept':'application/json'});
  private static _options = <RequestOptions>{};

  constructor(private http:Http){
    HttpWrap._headers.append('token','');
  }


  get(url: string): Observable<Response> {
    HttpWrap._options = new RequestOptions({headers:HttpWrap._headers});
    return this.http.get(url, HttpWrap._options);
  }
  delete(url: string): Observable<Response> {
    HttpWrap._options = new RequestOptions({headers:HttpWrap._headers});
    return this.http.delete(url, HttpWrap._options);
  }

  put(url: string,body:any): Observable<Response> {
    HttpWrap._options = new RequestOptions({headers:HttpWrap._headers});
    return this.http.put(url, body,HttpWrap._options);
  }
  patch(url: string, body: any): Observable<Response> {
    HttpWrap._options = new RequestOptions({headers:HttpWrap._headers});
    return this.http.patch(url, body, HttpWrap._options);
  }

  post(url: string, body: any): Observable<Response> {
    HttpWrap._options = new RequestOptions({headers:HttpWrap._headers});
    return this.http.post(url, body, HttpWrap._options);
  }


  options(url: string): Observable<Response> {
    HttpWrap._options = new RequestOptions({headers:HttpWrap._headers});
    return this.http.options(url, HttpWrap._options);
  }



  public static getHeaders():Headers{
    return HttpWrap._headers;
  }
}
