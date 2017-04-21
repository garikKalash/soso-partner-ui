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
/**
 * Created by Home on 12/28/2016.
 */
var core_1 = require("@angular/core");
var index_1 = require("../../_services/index");
var UserTypeItems_1 = require("./utilities/UserTypeItems");
var authentication_service_1 = require("../../_services/authentication.service");
var LoginComponent = (function () {
    function LoginComponent(clientService, authenticationService) {
        this.clientService = clientService;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.userTypeProvider = new UserTypeItems_1.UserTypeItems();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userTypeProvider.initItems();
    };
    LoginComponent.prototype.login = function () {
        this.loading = true;
        this.userTypeProvider.isCLient ? this.clientLogin() : {};
    };
    LoginComponent.prototype.clientLogin = function () {
        var _this = this;
        this.clientService.signin(this.model)
            .subscribe(function (responseString) {
            _this.authenticationService.login(responseString, true);
        });
    };
    LoginComponent.prototype.getUserTypes = function () {
        return this.userTypeProvider.items;
    };
    LoginComponent.prototype.getStartIndexOfUserTypes = function () {
        return this.userTypeProvider._activeIndex;
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './login.component.html',
            selector: 'login-component',
            styleUrls: ['login.component.css']
        }),
        __metadata('design:paramtypes', [index_1.ClientService, authentication_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login-component.component.js.map
