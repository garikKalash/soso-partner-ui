import {Feedback} from "./feedback.model";
import {Client} from "./client.model";
import {PartnerServiceDetail} from "./partner-service-detail.model";
import {Photo} from "./photo.model";
/**
 * Created by Home on 3/4/2017.
 */
export class Partner {
  private _id: number;
  private _name: string;
  private _telephone: string;
  private _serviceId: number;
  private _serviceName:string;
  private _username: string;
  private _password: string;
  private _address: string;
  private _feedbacks: Feedback[];
  private _photoDtos: Photo[] = [];
  private _notices: string;
  private _followers: string[];
  private _longitude: number;
  private _latitude: number;
  private _imgpath: string;
  private _imgId: number;
  private _reservable:boolean;
  private _services:PartnerServiceDetail[] = [];

  constructor(id: number,
              number: string,
              telephone: string,
              serviceId: number,
              username: string,
              password: string,
              notices:string,
              longitute: number,
              latitude:number,
              reservable:boolean) {
    this._id = id;
    this._name = number;
    this._telephone = telephone;
    this._serviceId = serviceId;
    this._username = username;
    this._password = password;
    this._longitude = longitute;
    this._latitude = latitude;
    this._notices = notices;
    this._reservable = reservable;
  }

  get reservable(): boolean {
    return this._reservable;
  }

  set reservable(value: boolean) {
    this._reservable = value;
  }
  get serviceName(): string {
    return this._serviceName;
  }

  set serviceName(value: string) {
    this._serviceName = value;
  }

  get services(): PartnerServiceDetail[] {
    return this._services;
  }

  set services(value: PartnerServiceDetail[]) {
    this._services = value;
  }

  get imgpath(): string {
    return this._imgpath;
  }

  set imgpath(value: string) {
    this._imgpath = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  get imgId(): number {
    return this._imgId;
  }

  set imgId(value: number) {
    this._imgId = value;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get feedbacks(): Feedback[] {
    return this._feedbacks;
  }

  set feedbacks(value: Feedback[]) {
    this._feedbacks = value;
  }


  get photoDtos(): Photo[] {
    return this._photoDtos;
  }

  set photoDtos(value: Photo[]) {
    this._photoDtos = value;
  }

  get notices(): string {
    return this._notices;
  }

  set notices(value: string) {
    this._notices = value;
  }

  get followers(): string[] {
    return this._followers;
  }

  set followers(value: string[]) {
    this._followers = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }

  get serviceId(): number {
    return this._serviceId;
  }

  set serviceId(value: number) {
    this._serviceId = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
