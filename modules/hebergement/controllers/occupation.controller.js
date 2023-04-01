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
exports.OccupationController = void 0;
const common_1 = require("@nestjs/common");
const basicRoute_1 = require("../../../utilities/basicRoute");
const error_1 = require("../../../utilities/error");
const httpDataResponse_1 = require("../../../utilities/httpDataResponse");
const logger_1 = require("../../../utilities/logger");
const occupation_service_1 = require("../services/occupation.service");
let OccupationController = class OccupationController {
    constructor(service, logger) {
        this.service = service;
        this.logger = logger;
    }
    async add(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.addOccupation(obj);
            console.log(response);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'enregistrement de la chambre";
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
    async payerOccupation(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.payerOccupation(obj);
            console.log(response);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'enregistrement de la chambre";
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
    async findAllByAgence(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.findAllByAgence(obj.fkAgence, obj.debut, obj.fin);
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
    async findDataAubergeByClient(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.findAllByAgence(obj.fkAgence, obj.debut, obj.fin);
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
    async findDataAubergeByClientAndPeriod(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.findDataAubergeByClientAndPeriod(obj);
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
    async findLast(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.findLast(fkAgence);
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
    async findCountChambreByState(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.findCountChambreByState(fkAgence);
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
    async findDataForLineChartOccupation(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getDataForLineChartOccupation(obj.fkAgence, obj.debut, obj.fin);
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
            let response = await this.service.findOccupation(code);
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
            let response = await this.service.deleteLogicOcupation(code);
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
            let response = await this.service.deleteLogicOcupation(code);
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
    async deleteDefinitivelyDetail(id) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.deleteDefinitivelyDetailOccupation(id);
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
    (0, common_1.Post)('occupation/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('occupation/payer'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "payerOccupation", null);
__decorate([
    (0, common_1.Get)('occupation/findAll'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('occupation/findAllByAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findAllByAgence", null);
__decorate([
    (0, common_1.Post)('occupation/findAllByAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findDataAubergeByClient", null);
__decorate([
    (0, common_1.Post)('occupation/findDataAubergeByClientAndPeriod'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findDataAubergeByClientAndPeriod", null);
__decorate([
    (0, common_1.Get)('occupation/findLast/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findLast", null);
__decorate([
    (0, common_1.Get)('auberge/findCountChambreByState/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findCountChambreByState", null);
__decorate([
    (0, common_1.Post)('occupation/findDataForLineChartOccupation'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "findDataForLineChartOccupation", null);
__decorate([
    (0, common_1.Get)('occupation/find/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)('occupation/delete/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('occupation/delete/definitively/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "deleteDefinitively", null);
__decorate([
    (0, common_1.Delete)('occupation/detail/delete/definitively/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "deleteDefinitivelyDetail", null);
__decorate([
    (0, common_1.Put)('occupation/update'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OccupationController.prototype, "update", null);
OccupationController = __decorate([
    (0, common_1.Controller)(basicRoute_1.URLConst.getBaseUrl()),
    __metadata("design:paramtypes", [occupation_service_1.OccupationService, logger_1.LoggerService])
], OccupationController);
exports.OccupationController = OccupationController;
//# sourceMappingURL=occupation.controller.js.map