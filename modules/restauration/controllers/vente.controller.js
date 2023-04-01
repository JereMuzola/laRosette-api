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
exports.Ventecontroller = void 0;
const common_1 = require("@nestjs/common");
const basicRoute_1 = require("../../../utilities/basicRoute");
const error_1 = require("../../../utilities/error");
const httpDataResponse_1 = require("../../../utilities/httpDataResponse");
const logger_1 = require("../../../utilities/logger");
const vente_1 = require("../models/vente");
const vente_service_1 = require("../services/vente.service");
let Ventecontroller = class Ventecontroller {
    constructor(service, logger) {
        this.service = service;
        this.logger = logger;
    }
    async addVente(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.addVente(obj);
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
    async payerVente(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.payerVente(obj);
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
    async find(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = vente_1.VenteModel.fromEntity(await this.service.getVente(code));
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération de la Vente";
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
    async findByClientAndPeriod(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getVenteByClientAndPeriod(obj);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération de la Vente";
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
    async findAll(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllVente(obj.fkAgence, obj.venteService, obj.debut, obj.fin);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération";
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
    async addTable(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.addTable(obj);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'enregistrement de la table";
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
                httpResponse.error.errorDescription = "Erreur inconnue contactez le support technique";
            }
        }
        return httpResponse;
    }
    async findAllTable(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllTable(fkAgence);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération";
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
    async findAllDataForPieChartArticle(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getDataForPieChartArticle(obj.fkAgence, obj.venteService, obj.debut, obj.fin);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération";
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
    async findAllDataForLineChartVente(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getDataForLineChartVente(obj.fkAgence, obj.venteService, obj.debut, obj.fin);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération";
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
    async findLast(fkAgence, VenteService) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getLastVente(fkAgence, VenteService);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération";
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
    async logicDeleteVente(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.deleteLogicVente(code);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la suppression de la Vente";
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
    (0, common_1.Post)('vente/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "addVente", null);
__decorate([
    (0, common_1.Post)('vente/payer'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "payerVente", null);
__decorate([
    (0, common_1.Get)('vente/find/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "find", null);
__decorate([
    (0, common_1.Post)('vente/findDataByClientAndPeriod'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "findByClientAndPeriod", null);
__decorate([
    (0, common_1.Post)('vente/findAll'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('table/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "addTable", null);
__decorate([
    (0, common_1.Get)('table/findAll/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)("fkAgence")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "findAllTable", null);
__decorate([
    (0, common_1.Post)('vente/findAllForPieChartArticle'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "findAllDataForPieChartArticle", null);
__decorate([
    (0, common_1.Post)('vente/findAllForLineChartVente'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "findAllDataForLineChartVente", null);
__decorate([
    (0, common_1.Get)('vente/findLast/:fkAgence/:venteService'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __param(1, (0, common_1.Param)('venteService')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "findLast", null);
__decorate([
    (0, common_1.Delete)('vente/delete/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Ventecontroller.prototype, "logicDeleteVente", null);
Ventecontroller = __decorate([
    (0, common_1.Controller)(basicRoute_1.URLConst.getBaseUrl()),
    __metadata("design:paramtypes", [vente_service_1.VenteService, logger_1.LoggerService])
], Ventecontroller);
exports.Ventecontroller = Ventecontroller;
//# sourceMappingURL=vente.controller.js.map