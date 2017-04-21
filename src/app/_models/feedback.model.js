"use strict";
var Feedback = (function () {
    function Feedback() {
    }
    Object.defineProperty(Feedback.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Feedback.prototype, "fromClientName", {
        get: function () {
            return this._fromClientName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Feedback.prototype, "rate", {
        get: function () {
            return this._rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Feedback.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    return Feedback;
}());
exports.Feedback = Feedback;
