export class Photo{
  private _id:number;
  private _partner_id:number;
  private _image_path:string;

  constructor(id: number, partner_id: number, image_path: string) {
    this._id = id;
    this._partner_id = partner_id;
    this._image_path = image_path;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get partner_id(): number {
    return this._partner_id;
  }

  set partner_id(value: number) {
    this._partner_id = value;
  }

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }
}
