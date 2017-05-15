export class Event{
  private _id:number;
  private _partnerId:number;
  private _clientId:number;
  private _requestId:number;
  private _isSeen:boolean;
  private _seenTime:Date;



  constructor(id: number, partnerId: number, clientId: number, requestId: number, isSeen: boolean, seenTime: Date) {
    this._id = id;
    this._partnerId = partnerId;
    this._clientId = clientId;
    this._requestId = requestId;
    this._isSeen = isSeen;
    this._seenTime = seenTime;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get partnerId(): number {
    return this._partnerId;
  }

  set partnerId(value: number) {
    this._partnerId = value;
  }

  get clientId(): number {
    return this._clientId;
  }

  set clientId(value: number) {
    this._clientId = value;
  }

  get requestId(): number {
    return this._requestId;
  }

  set requestId(value: number) {
    this._requestId = value;
  }

  get isSeen(): boolean {
    return this._isSeen;
  }

  set isSeen(value: boolean) {
    this._isSeen = value;
  }

  get seenTime(): Date {
    return this._seenTime;
  }

  set seenTime(value: Date) {
    this._seenTime = value;
  }

  public  toJsonString(): string {
    let json = JSON.stringify(this);
    Object.keys(this).filter(key => key[0] === "_").forEach(key => {
      json = json.replace(key, key.substring(1));
    });

    return json;
  }

}
