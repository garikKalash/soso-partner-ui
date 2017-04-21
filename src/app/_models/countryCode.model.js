/**
 * Created by Home on 1/7/2017.
 */
"use strict";
var CountryCode = (function () {
    function CountryCode(id, iso, nicename, iso3, name, numcode, phonecode) {
        this.id = id;
        this.iso = iso;
        this.nicename = nicename;
        this.iso3 = iso3;
        this.name = name;
        this.numcode = numcode;
        this.phonecode = phonecode;
    }
    return CountryCode;
}());
exports.CountryCode = CountryCode;
