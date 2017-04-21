"use strict";
var service_model_1 = require("../_models/service.model");
var countryCode_model_1 = require("../_models/countryCode.model");
/**
 * Created by Garik Kalashyan on 3/4/2017.
 */
var ConverterUtils = (function () {
    function ConverterUtils() {
    }
    ConverterUtils.getTokenFromJsonString = function (jsonString) {
        return JSON.parse(jsonString)["token"];
    };
    ConverterUtils.getServiceUrlFromJsonString = function (jsonString) {
        return JSON.parse(jsonString)["serviceDetail"]["url"];
    };
    ConverterUtils.getAccountImageBase64FromJsonString = function (jsonString) {
        return JSON.parse(jsonString)["accountImage"];
    };
    ConverterUtils.partnerFromJson = function (responseJson) {
        return (JSON.parse(responseJson)["partner"]);
    };
    ConverterUtils.getPartnerPhotosInBase64FromJsonString = function (jsonString) {
        var photosINBase64 = [];
        JSON.parse(jsonString)["photos"]["image"].forEach(function (node) {
            photosINBase64.push(node.toString());
        });
        return photosINBase64;
    };
    ConverterUtils.countryCodesFromJson = function (responseJson) {
        var countryCodeList = [];
        JSON.parse(responseJson)["phoneCodes"].forEach(function (node) {
            countryCodeList.push(new countryCode_model_1.CountryCode(node.id, node.iso, node.nicename, node.iso3, node.name, node.numcode, node.phonecode));
        });
        return countryCodeList;
    };
    ConverterUtils.servicesFromJson = function (responseJson) {
        var serviceList = [];
        JSON.parse(responseJson)["sosoServices"].forEach(function (node) {
            serviceList.push(new service_model_1.Service(node.id, node.serviceName_eng, node.serviceName_arm));
        });
        return serviceList;
    };
    return ConverterUtils;
}());
exports.ConverterUtils = ConverterUtils;
