"use strict";
/**
 * Created by Home on 3/4/2017.
 */
var Partner = (function () {
    function Partner(id, number, telephone, serviceId, username, password, notices, longitute, latitude) {
        this._images = [];
        this._id = id;
        this._name = number;
        this._telephone = telephone;
        this._serviceId = serviceId;
        this._username = username;
        this._password = password;
        this._longitude = longitute;
        this._latitude = latitude;
        this._notices = notices;
    }
    Object.defineProperty(Partner.prototype, "serviceName", {
        get: function () {
            return this._serviceName;
        },
        set: function (value) {
            this._serviceName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "imgpath", {
        get: function () {
            return this._imgpath;
        },
        set: function (value) {
            this._imgpath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "longitude", {
        get: function () {
            return this._longitude;
        },
        set: function (value) {
            this._longitude = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "latitude", {
        get: function () {
            return this._latitude;
        },
        set: function (value) {
            this._latitude = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (value) {
            this._address = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "feedbacks", {
        get: function () {
            return this._feedbacks;
        },
        set: function (value) {
            this._feedbacks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "images", {
        get: function () {
            return this._images;
        },
        set: function (value) {
            this._images = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "notices", {
        get: function () {
            return this._notices;
        },
        set: function (value) {
            this._notices = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "followers", {
        get: function () {
            return this._followers;
        },
        set: function (value) {
            this._followers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "telephone", {
        get: function () {
            return this._telephone;
        },
        set: function (value) {
            this._telephone = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "serviceId", {
        get: function () {
            return this._serviceId;
        },
        set: function (value) {
            this._serviceId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Partner.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    return Partner;
}());
exports.Partner = Partner;
