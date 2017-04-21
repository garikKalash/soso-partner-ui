/**
 * Created by Home on 3/4/2017.
 */
/**
 * Created by Home on 1/27/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HttpWrap = (function () {
    function HttpWrap(http) {
        this.http = http;
        HttpWrap._headers.append('token', '');
    }
    HttpWrap.prototype.get = function (url) {
        HttpWrap._options = new http_1.RequestOptions({ headers: HttpWrap._headers });
        return this.http.get(url, HttpWrap._options);
    };
    HttpWrap.prototype.delete = function (url) {
        HttpWrap._options = new http_1.RequestOptions({ headers: HttpWrap._headers });
        return this.http.delete(url, HttpWrap._options);
    };
    HttpWrap.prototype.put = function (url, body) {
        HttpWrap._options = new http_1.RequestOptions({ headers: HttpWrap._headers });
        return this.http.put(url, body, HttpWrap._options);
    };
    HttpWrap.prototype.patch = function (url, body) {
        HttpWrap._options = new http_1.RequestOptions({ headers: HttpWrap._headers });
        return this.http.patch(url, body, HttpWrap._options);
    };
    HttpWrap.prototype.post = function (url, body) {
        HttpWrap._options = new http_1.RequestOptions({ headers: HttpWrap._headers });
        return this.http.post(url, body, HttpWrap._options);
    };
    HttpWrap.prototype.options = function (url) {
        HttpWrap._options = new http_1.RequestOptions({ headers: HttpWrap._headers });
        return this.http.options(url, HttpWrap._options);
    };
    HttpWrap.getHeaders = function () {
        return HttpWrap._headers;
    };
    HttpWrap._headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    HttpWrap._options = {};
    HttpWrap = __decorate([
        core_1.Injectable()
    ], HttpWrap);
    return HttpWrap;
}());
exports.HttpWrap = HttpWrap;
