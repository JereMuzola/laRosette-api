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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const basicRoute_1 = require("../../../utilities/basicRoute");
const error_1 = require("../../../utilities/error");
const httpDataResponse_1 = require("../../../utilities/httpDataResponse");
const logger_1 = require("../../../utilities/logger");
const service_1 = require("../models/service");
const service_service_1 = require("../services/service.service");
let ServiceController = class ServiceController {
    constructor(service, logger) {
        this.service = service;
        this.logger = logger;
    }
    async add(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            obj = service_1.ServiceModel.fromEntity(obj);
            let response = await this.service.add(obj);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'enregistrement de l'utilisateur";
            }
            httpResponse.error = this.service.getError();
            httpResponse.response = response;
        }
        catch (error) {
            console.log(error);
            httpResponse.error.errorCode = error_1.ErrorResponseStatus.KO;
            if (error instanceof String) {
                httpResponse.error.errorDescription = error.toString();
            }
            else {
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support techniqe";
            }
        }
        return httpResponse;
    }
    async findAll() {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.findAll();
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Problème survenue lors de la connexion";
            }
            httpResponse.error = this.service.getError();
            httpResponse.response = response;
        }
        catch (error) {
            console.log(error);
            httpResponse.error.errorCode = error_1.ErrorResponseStatus.KO;
            if (error instanceof String) {
                httpResponse.error.errorDescription = error.toString();
            }
            else {
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support techniqe";
            }
        }
        return httpResponse;
    }
    async find(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.find(code);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Problème survenue lors de la connexion";
            }
            httpResponse.error = this.service.getError();
            httpResponse.response = response;
        }
        catch (error) {
            console.log(error);
            httpResponse.error.errorCode = error_1.ErrorResponseStatus.KO;
            if (error instanceof String) {
                httpResponse.error.errorDescription = error.toString();
            }
            else {
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support techniqe";
            }
        }
        return httpResponse;
    }
    async delete(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.deleteLogic(code);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Problème survenue lors de la connexion";
            }
            httpResponse.error = this.service.getError();
            httpResponse.response = response;
        }
        catch (error) {
            console.log(error);
            httpResponse.error.errorCode = error_1.ErrorResponseStatus.KO;
            if (error instanceof String) {
                httpResponse.error.errorDescription = error.toString();
            }
            else {
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support techniqe";
            }
        }
        return httpResponse;
    }
    async deleteDefinitively(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.deleteDefinitively(code);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Problème survenue lors de la connexion";
            }
            httpResponse.error = this.service.getError();
            httpResponse.response = response;
        }
        catch (error) {
            console.log(error);
            httpResponse.error.errorCode = error_1.ErrorResponseStatus.KO;
            if (error instanceof String) {
                httpResponse.error.errorDescription = error.toString();
            }
            else {
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support techniqe";
            }
        }
        return httpResponse;
    }
    async update(payload) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.update(payload);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Problème survenue lors de la connexion";
            }
            httpResponse.error = this.service.getError();
            httpResponse.response = response;
        }
        catch (error) {
            console.log(error);
            httpResponse.error.errorCode = error_1.ErrorResponseStatus.KO;
            if (error instanceof String) {
                httpResponse.error.errorDescription = error.toString();
            }
            else {
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support techniqe";
            }
        }
        return httpResponse;
    }
};
__decorate([
    (0, common_1.Post)('service/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('service/findAll'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('service/find/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)('service/delete/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('service/delete/definitively/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteDefinitively", null);
__decorate([
    (0, common_1.Put)('service/update'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "update", null);
ServiceController = __decorate([
    (0, common_1.Controller)(basicRoute_1.URLConst.getBaseUrl()),
    __metadata("design:paramtypes", [service_service_1.ServiceService, logger_1.LoggerService])
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map