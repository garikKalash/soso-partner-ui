"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
/**
 * Created by Home on 3/4/2017.
 */
var PartnerService = (function () {
    function PartnerService(httpWrap) {
        this.httpWrap = httpWrap;
    }
    PartnerService.prototype.getPartnerById = function (partnerId) {
        return this.httpWrap.get("http://localhost:8081/partner/partnerRoom?partnerId=" + partnerId)
            .map(function (response) { return response.text(); });
    };
    PartnerService.prototype.getPartnerImage = function (partnerId) {
        return this.httpWrap.get('http://localhost:8081/partner/accountImage?partnerId=' + partnerId)
            .map(function (response) { return response.text(); });
    };
    PartnerService.prototype.getPartnerPhotos = function (partnerId) {
        return this.httpWrap.get('http://localhost:8081/partner/partnerPhotos/' + partnerId)
            .map(function (response) { return response.text(); });
    };
    PartnerService.prototype.savePartnerEditedMainInfo = function (data) {
        return this.httpWrap.post('http://localhost:8081/partner/saveEditedMainInfo', data)
            .map(function (response) { return response.text(); });
    };
    PartnerService.prototype.savePartnerAddress = function (data) {
        return this.httpWrap.post('http://localhost:8081/partner/saveEditedAddress', data)
            .map(function (response) { return response.text(); });
    };
    PartnerService.prototype.savePartnerNotices = function (data) {
        return this.httpWrap.post('http://localhost:8081/partner/saveEditedNotice', data)
            .map(function (response) { return response.text(); });
    };
    PartnerService = __decorate([
        core_1.Injectable()
    ], PartnerService);
    return PartnerService;
}());
exports.PartnerService = PartnerService;
