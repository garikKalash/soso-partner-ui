/**
 * Created by Home on 1/7/2017.
 */


export class CountryCode{
  public id: number;
  public iso: string;
  public nicename: string;
  public iso3: string;
  public name: string;
  public numcode: string;
  public phonecode: string;

  constructor(id: number, iso: string, nicename: string, iso3: string, name: string, numcode: string, phonecode: string) {
    this.id = id;
    this.iso = iso;
    this.nicename = nicename;
    this.iso3 = iso3;
    this.name = name;
    this.numcode = numcode;
    this.phonecode = phonecode;
  }
}
