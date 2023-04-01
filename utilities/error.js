"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.ErrorResponseStatus = void 0;
var ErrorResponseStatus;
(function (ErrorResponseStatus) {
    ErrorResponseStatus["KO"] = "KO";
    ErrorResponseStatus["OK"] = "OK";
    ErrorResponseStatus["EXIST"] = "EXIST";
})(ErrorResponseStatus = exports.ErrorResponseStatus || (exports.ErrorResponseStatus = {}));
class ErrorResponse {
    constructor(code, description) {
        this.errorCode = ErrorResponseStatus.KO;
        this.errorDescription = '';
        this.errorCode = code;
        this.errorDescription = description;
    }
    clear() {
        this.errorCode = ErrorResponseStatus.KO;
        this.errorDescription = "";
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error.js.map