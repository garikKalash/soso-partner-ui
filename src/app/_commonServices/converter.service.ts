import {Partner} from "../_models/partner.model";
import {Service} from "../_models/service.model";
import {CountryCode} from "../_models/countryCode.model";
import {Request} from "../_models/request.model";
/**
 * Created by Garik Kalashyan on 3/4/2017.
 */

export class ConverterUtils{
  public static getTokenFromJsonString(jsonString:string):string{
    return <string>JSON.parse(jsonString)["token"];
  }

  public static getServiceUrlFromJsonString(jsonString:string):string{
    return <string>JSON.parse(jsonString)["serviceDetail"]["url"];
  }


  public static getNewReservationIdFromJsonString(jsonString:string):string{
    return <string>JSON.parse(jsonString)["newReservationId"];
  }



  public static getAccountImageUrlFromJsonString(jsonString:string):string{
    return "http://localhost:8081/partner/partnerPhotos/" + <string>JSON.parse(jsonString)["imageId"];
  }

  public static partnerFromJson(responseJson: string): Partner {
    return <Partner>(JSON.parse(responseJson)["partner"]);
  }

  public static getPartnerPhotosUrlsFromJsonString(jsonString:string):string[]{
    let photosINBase64:string[] = [];

    JSON.parse(jsonString)["photos"].forEach((node: any) => {
      photosINBase64.push(node.toString());
    });
    return photosINBase64;
  }

  public static countryCodesFromJson(responseJson: string): CountryCode[] {
    let countryCodeList: CountryCode[] = [];
    JSON.parse(responseJson)["phoneCodes"].forEach((node: any) => {
      countryCodeList.push(new CountryCode(node.id,
        node.iso,
        node.nicename,
        node.iso3,
        node.name,
        node.numcode,
        node.phonecode));
    });
    return countryCodeList;
  }

  public static servicesFromJson(responseJson: string): Service[] {
    let serviceList: Service[] = [];
    JSON.parse(responseJson)["sosoServices"].forEach((node: any) => {
      serviceList.push(new Service(node.id,
        node.serviceName_eng,
        node.serviceName_arm));
    });
    return serviceList;
  }

  public static reservationsFromJson(responseJson: string): Request[] {
    let requestList: Request[] = [];
    JSON.parse(responseJson)["reservations"].forEach((node: any) => {
      let date = new Date(node.startTime);

      requestList.push(new Request(node.id,
                                   node.clientId,
                                    node.partnerId,
                                    date,
                                    node.description,
                                    node.status,
                                    node.responseText,
                                    node.duration));

    });


    return requestList;
  }
}
