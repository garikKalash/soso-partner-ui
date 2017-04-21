import {FormControl} from "@angular/forms";
import {ViewChild, ElementRef, NgZone, Injectable, Input} from "@angular/core";
import {MapsAPILoader, MarkerManager} from "angular2-google-maps/core";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Response, Http, Headers, RequestOptions, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Home on 4/20/2017.
 */

const GET_ADDRESS_OF_MARKER_URL:string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
@Injectable()
export class AddressService{
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl = new FormControl();
  public zoom: number;

  public searchElementRef:ElementRef;

  public _isNeedChangeAddress:boolean = false;


  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private http:Http
              ){

  }

  initMapDetails(searchElementRef:ElementRef, longitude:number, latitude:number):void {
    this.searchElementRef = searchElementRef;
    if(longitude != null && latitude !=null){
      this.latitude = latitude;
      this.longitude = longitude;
      this.zoom = 15;
    }else {
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      //set current position
      this.setCurrentPosition();
    }

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 20;

        });
      });
    });
  }

  private setCurrentPosition() :void{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  getAddressByCoordinates(lat:number,long:number):Observable<string>{
    let data:string;
    let options = new RequestOptions({responseType:ResponseContentType.Json});

     return this.http.get(GET_ADDRESS_OF_MARKER_URL+lat+","+long+"&sensor=true",options).map((response:Response)=>response.text());
  }

}
