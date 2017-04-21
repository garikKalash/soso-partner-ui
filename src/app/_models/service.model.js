"use strict";
/**
 * Created by Home on 3/4/2017.
 */
var Service = (function () {
    function Service(id, servicename_eng, servicename_arm) {
        this.id = id;
        this.serviceName_eng = servicename_eng;
        this.serviceName_arm = servicename_arm;
    }
    Object.defineProperty(Service.prototype, "_id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "_serviceName_eng", {
        get: function () {
            return this.serviceName_eng;
        },
        set: function (value) {
            this.serviceName_eng = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "_serviceName_arm", {
        get: function () {
            return this.serviceName_arm;
        },
        set: function (value) {
            this.serviceName_arm = value;
        },
        enumerable: true,
        configurable: true
    });
    return Service;
}());
exports.Service = Service;
