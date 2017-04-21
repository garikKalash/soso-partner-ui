"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var converter_service_1 = require("../../_commonServices/converter.service");
require("rxjs/add/operator/map");
var ng2_file_upload_1 = require("ng2-file-upload");
var http_1 = require("@angular/http");
var PartnerAccountComponent = (function () {
    function PartnerAccountComponent(router, partnerService, classifierService, activatedRoute, httpWrap, sanitizer, addressService) {
        this.router = router;
        this.partnerService = partnerService;
        this.classifierService = classifierService;
        this.activatedRoute = activatedRoute;
        this.httpWrap = httpWrap;
        this.sanitizer = sanitizer;
        this.addressService = addressService;
        this._partner = {};
        this._editedPartner = {};
        this._averageRate = 2.5;
        this._isEditingPartnerMainDetails = false;
        this._isEditingPartnerNoticeDetails = false;
        this.services = [];
        this.serviceSelectItems = [];
    }
    PartnerAccountComponent.prototype.safeImage = function (imgBase64) {
        if (imgBase64 === undefined || imgBase64 === null) {
            return this.sanitizer.sanitize(core_1.SecurityContext.URL, "/src/loading-25x25.gif");
        }
        return this.sanitizer.sanitize(core_1.SecurityContext.URL, "data:image/jpg;base64," + imgBase64);
    };
    PartnerAccountComponent.prototype.mapLongitude = function () {
        return this.addressService.longitude;
    };
    PartnerAccountComponent.prototype.mapLatitude = function () {
        return this.addressService.latitude;
    };
    PartnerAccountComponent.prototype.mapZoom = function () {
        return this.addressService.zoom;
    };
    PartnerAccountComponent.prototype.mapSearchControl = function () {
        return this.addressService.searchControl;
    };
    PartnerAccountComponent.prototype.changeAddress = function () {
        this.addressService._isNeedChangeAddress = true;
    };
    PartnerAccountComponent.prototype.editNotices = function () {
        this._isEditingPartnerNoticeDetails = true;
        this.clonePartnerNoticesDetails();
    };
    PartnerAccountComponent.prototype.cancelNotices = function () {
        this._isEditingPartnerNoticeDetails = false;
        this._editedPartner.notices = null;
    };
    PartnerAccountComponent.prototype.saveNotice = function () {
        var _this = this;
        var data = JSON.stringify(this._editedPartner);
        this.partnerService.savePartnerNotices(data).subscribe(function (data) {
            _this._partner.notices = _this._editedPartner.notices;
            _this._isEditingPartnerNoticeDetails = false;
        });
    };
    PartnerAccountComponent.prototype.saveAddress = function () {
        var _this = this;
        this._editedPartner.id = this._partner.id;
        this._editedPartner.longitude = this.mapLongitude();
        this._editedPartner.latitude = this.mapLatitude();
        var data = JSON.stringify(this._editedPartner);
        this.partnerService.savePartnerAddress(data)
            .subscribe(function (data) {
            _this.addressService._isNeedChangeAddress = false;
            _this.addressService.zoom = 15;
            _this._partner.address = _this._editedPartner.address;
            _this._partner.longitude = _this.mapLongitude();
            _this._partner.latitude = _this.mapLatitude();
        });
    };
    PartnerAccountComponent.prototype.needChangeAddress = function () {
        return this.addressService._isNeedChangeAddress;
    };
    PartnerAccountComponent.prototype.ngOnInit = function () {
        this.initPartner();
    };
    PartnerAccountComponent.prototype.initPartner = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            var partnerId = +params['partnerId'];
            _this.partnerService.getPartnerById(partnerId).subscribe(function (responeJson) {
                _this._partner = converter_service_1.ConverterUtils.partnerFromJson(responeJson);
                _this.setServiceNameById(_this._partner.serviceId);
                _this.initFileUploader();
                _this.initPartnerPhotoUploader();
                _this.setAccountLogo();
                _this.getPartnerPhotos();
                _this.addressService.initMapDetails(_this._searchElementRef, _this._partner.longitude, _this._partner.latitude);
            });
        });
    };
    PartnerAccountComponent.prototype.initFileUploader = function () {
        var _this = this;
        this.accountImageUploader = new ng2_file_upload_1.FileUploader({
            url: "http://localhost:8081/partner/uploadAccountImage",
            additionalParameter: { "id": this._partner.id }
        });
        this.accountImageUploader.onCompleteAll = function () {
            _this.setAccountLogo();
        };
        this.accountImageUploader.onAfterAddingFile = function () {
            _this.uploadAccountImage();
        };
    };
    PartnerAccountComponent.prototype.initPartnerPhotoUploader = function () {
        var _this = this;
        this.partnerPhotoUploader = new ng2_file_upload_1.FileUploader({
            url: "http://localhost:8081/partner/addImageToPartnier",
            additionalParameter: { "id": this._partner.id },
            removeAfterUpload: true,
        });
        this.partnerPhotoUploader.onCompleteAll = function () {
            _this.getPartnerPhotos();
        };
        this.partnerPhotoUploader.onAfterAddingFile = function () {
            _this.uploadNewPhoto();
        };
    };
    PartnerAccountComponent.prototype.uploadNewPhoto = function () {
        for (var _i = 0, _a = this.partnerPhotoUploader.queue; _i < _a.length; _i++) {
            var item = _a[_i];
            item.headers = new http_1.Headers({ "Content-Type": "multipart/form-data" });
            item.upload();
        }
    };
    PartnerAccountComponent.prototype.setAccountLogo = function () {
        var _this = this;
        this.partnerService.getPartnerImage(this._partner.id)
            .subscribe(function (responseJson) {
            _this._partner.imgpath = converter_service_1.ConverterUtils.getAccountImageBase64FromJsonString(responseJson);
        });
    };
    PartnerAccountComponent.prototype.getPartnerPhotos = function () {
        var _this = this;
        this.partnerService.getPartnerPhotos(this._partner.id)
            .subscribe(function (responseJson) {
            _this._partner.images = converter_service_1.ConverterUtils.getPartnerPhotosInBase64FromJsonString(responseJson);
            _this.partnerPhotoUploader.clearQueue();
        });
    };
    PartnerAccountComponent.prototype.setServiceNameById = function (id) {
        var _this = this;
        this.classifierService.getServices().subscribe(function (servicesJsonString) {
            _this.services = converter_service_1.ConverterUtils.servicesFromJson(servicesJsonString);
            _this.services.forEach(function (service) {
                if (service._id === id) {
                    _this._partner.serviceName = service._serviceName_arm;
                }
            });
        });
    };
    PartnerAccountComponent.prototype.initServices = function () {
        var _this = this;
        this.classifierService.getServices()
            .subscribe(function (servicesJsonString) {
            _this.services = converter_service_1.ConverterUtils.servicesFromJson(servicesJsonString);
            _this.initServiceSelectItems();
        });
    };
    PartnerAccountComponent.prototype.initServiceSelectItems = function () {
        var _this = this;
        this.serviceSelectItems.push({ label: '--Select Service--', value: null });
        this.services.forEach(function (service) {
            _this.serviceSelectItems.push({ label: service._serviceName_arm, value: service });
        });
    };
    PartnerAccountComponent.prototype.editPartnerMainInfo = function () {
        this._isEditingPartnerMainDetails = true;
        this.clonePartnerMainDetails();
    };
    PartnerAccountComponent.prototype.cancelEditingMainInfo = function () {
        this._isEditingPartnerMainDetails = false;
        this.clearEditedMainInfo();
    };
    PartnerAccountComponent.prototype.clearEditedMainInfo = function () {
        this._editedPartner.address = '';
        this._editedPartner.telephone = '';
    };
    PartnerAccountComponent.prototype.saveMainInfo = function () {
        this._isEditingPartnerMainDetails = false;
        this.saveEditedMainInfo();
    };
    PartnerAccountComponent.prototype.saveEditedMainInfo = function () {
        var _this = this;
        this._editedPartner.id = this._partner.id;
        var data = JSON.stringify(this._editedPartner);
        this.partnerService.savePartnerEditedMainInfo(data)
            .subscribe(function (data) {
            _this.loadEditedMainInfoIntoPartner();
        });
    };
    PartnerAccountComponent.prototype.clonePartnerMainDetails = function () {
        this._editedPartner.address = this._partner.address;
        this._editedPartner.telephone = this._partner.telephone;
    };
    PartnerAccountComponent.prototype.clonePartnerNoticesDetails = function () {
        this._editedPartner.id = this._partner.id;
        this._editedPartner.notices = this._partner.notices;
    };
    PartnerAccountComponent.prototype.loadEditedMainInfoIntoPartner = function () {
        this._partner.address = this._editedPartner.address;
        this._partner.telephone = this._editedPartner.telephone;
    };
    PartnerAccountComponent.prototype.uploadAccountImage = function () {
        for (var _i = 0, _a = this.accountImageUploader.queue; _i < _a.length; _i++) {
            var item = _a[_i];
            item.upload();
        }
    };
    PartnerAccountComponent.prototype.addressMarkerDragEnd = function (event) {
        var _this = this;
        this.addressService.longitude = event.coords.lng;
        this.addressService.latitude = event.coords.lat;
        this.addressService.getAddressByCoordinates(event.coords.lat, event.coords.lng)
            .subscribe(function (data) {
            for (var _i = 0, _a = JSON.parse(data)["results"]; _i < _a.length; _i++) {
                var node = _a[_i];
                _this._editedPartner.address = node.formatted_address;
                break;
            }
        });
    };
    Object.defineProperty(PartnerAccountComponent.prototype, "partner", {
        get: function () {
            return this._partner;
        },
        set: function (value) {
            this._partner = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild("search")
    ], PartnerAccountComponent.prototype, "_searchElementRef", void 0);
    PartnerAccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './partner-account.component.html',
            selector: 'partner-account',
            styleUrls: ['partner-account.component.css']
        })
    ], PartnerAccountComponent);
    return PartnerAccountComponent;
}());
exports.PartnerAccountComponent = PartnerAccountComponent;
