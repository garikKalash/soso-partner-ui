"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var provider_service_1 = require("../../_services/provider.service");
var classifier_service_1 = require("../../_services/classifier.service");
var ConnectToSystemComponent = (function () {
    function ConnectToSystemComponent(router, providerService, classifierService) {
        this.router = router;
        this.providerService = providerService;
        this.classifierService = classifierService;
        this.model = {};
        this.loading = false;
        this.services = [];
    }
    ConnectToSystemComponent.prototype.ngOnInit = function () {
        this.services = this.classifierService.getAllServices();
        this.selectedService = this.labelForService(this.services[0]);
    };
    ConnectToSystemComponent.prototype.labelForService = function (item) {
        return item.name;
    };
    ConnectToSystemComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.providerService.create(this.model)
            .subscribe(function (data) {
            _this.router.navigate(['/']);
        });
    };
    ConnectToSystemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './connectToSystem.component.html',
            selector: 'connect-to-system-component',
            styleUrls: ['connectToSystem.component.css']
        }),
        __metadata('design:paramtypes', [router_1.Router, provider_service_1.ProviderService, classifier_service_1.ClassifierService])
    ], ConnectToSystemComponent);
    return ConnectToSystemComponent;
}());
exports.ConnectToSystemComponent = ConnectToSystemComponent;
//# sourceMappingURL=register-partner-component.component.js.map
