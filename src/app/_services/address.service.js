"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
/**
 * Created by Home on 4/20/2017.
 */
var GET_ADDRESS_OF_MARKER_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var AddressService = (function () {
    function AddressService(mapsAPILoader, ngZone, http) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.http = http;
        this.searchControl = new forms_1.FormControl();
        this._isNeedChangeAddress = false;
    }
    AddressService.prototype.initMapDetails = function (searchElementRef, longitude, latitude) {
        var _this = this;
        this.searchElementRef = searchElementRef;
        if (longitude != null && latitude != null) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.zoom = 15;
        }
        else {
            //set google maps defaults
            this.zoom = 4;
            this.latitude = 39.8282;
            this.longitude = -98.5795;
            //set current position
            this.setCurrentPosition();
        }
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 20;
                });
            });
        });
    };
    AddressService.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    AddressService.prototype.getAddressByCoordinates = function (lat, long) {
        var data;
        var options = new http_1.RequestOptions({ responseType: http_1.ResponseContentType.Json });
        return this.http.get(GET_ADDRESS_OF_MARKER_URL + lat + "," + long + "&sensor=true", options).map(function (response) { return response.text(); });
    };
    AddressService = __decorate([
        core_1.Injectable()
    ], AddressService);
    return AddressService;
}());
exports.AddressService = AddressService;
