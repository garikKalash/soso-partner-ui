
import {Service} from "./service.model";
export class PartnerServiceDetail{
  private _id:number;
  private _serviceId:number;
  private _service:Service;
  private _partnerId:number;
  private _defaultduration:number;
  private _price:number;
  private _isEditing:boolean = false;

  constructor(id: number, serviceId: number, partnerId: number, defaaultduration: number, price: number) {
    this._id = id;
    this._serviceId = serviceId;
    this._partnerId = partnerId;
    this._defaultduration = defaaultduration;
    this._price = price;
  }


  get isEditing(): boolean {
    return this._isEditing;
  }

  set isEditing(value: boolean) {
    this._isEditing = value;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }


  get service(): Service {
    return this._service;
  }

  set service(value: Service) {
    this._service = value;
  }

  get serviceId(): number {
    return this._serviceId;
  }

  set serviceId(value: number) {
    this._serviceId = value;
  }

  get partnerId(): number {
    return this._partnerId;
  }

  set partnerId(value: number) {
    this._partnerId = value;
  }

  get defaultduration(): number {
    return this._defaultduration;
  }

  set defaultduration(value: number) {
    this._defaultduration = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  public  toJsonString(): string {
  let json = JSON.stringify(this);
  Object.keys(this).filter(key => key[0] === "_").forEach(key => {
    json = json.replace(key, key.substring(1));
  });

  return json;
}
}
