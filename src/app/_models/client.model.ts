export class Client{
  private _id:number;
  private _name:string;
  private _telephone:string;
  private _password:string;


  constructor(id: number,  name: string, telephone: string, password: string) {
    this._id = id;
    this._name = name;
    this._telephone = telephone;
    this._password = password;
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

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

}
