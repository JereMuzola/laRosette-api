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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeLog = exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
let LoggerService = class LoggerService {
    constructor(logger) {
        this.logger = logger;
    }
    log(type, message) {
        switch (type) {
            case TypeLog.DEBUG:
                this.logger.debug(message);
                break;
            case TypeLog.ERROR:
                this.logger.error(message);
                break;
            case TypeLog.INFO:
                this.logger.info(message);
                break;
            default:
                break;
        }
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [winston_1.Logger])
], LoggerService);
exports.LoggerService = LoggerService;
var TypeLog;
(function (TypeLog) {
    TypeLog[TypeLog["DEBUG"] = 0] = "DEBUG";
    TypeLog[TypeLog["ERROR"] = 1] = "ERROR";
    TypeLog[TypeLog["INFO"] = 2] = "INFO";
})(TypeLog = exports.TypeLog || (exports.TypeLog = {}));
//# sourceMappingURL=logger.js.map