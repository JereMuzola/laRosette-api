"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpDataResponse = void 0;
const error_1 = require("./error");
class HttpDataResponse {
    constructor() {
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
}
exports.HttpDataResponse = HttpDataResponse;
//# sourceMappingURL=httpDataResponse.js.map