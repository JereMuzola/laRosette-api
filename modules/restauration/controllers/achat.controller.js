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
exports.AchatController = void 0;
const common_1 = require("@nestjs/common");
const basicRoute_1 = require("../../../utilities/basicRoute");
const error_1 = require("../../../utilities/error");
const httpDataResponse_1 = require("../../../utilities/httpDataResponse");
const logger_1 = require("../../../utilities/logger");
const achat_1 = require("../models/achat");
const commande_1 = require("../models/commande");
const fournisseur_1 = require("../models/fournisseur");
const achat_service_1 = require("../services/achat.service");
let AchatController = class AchatController {
    constructor(service, logger) {
        this.service = service;
        this.logger = logger;
    }
    async addCommande(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            obj = commande_1.CommandeModel.fromEntity(obj);
            let response = await this.service.addCommande(obj);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'enregistrement de la commande";
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
            let response = commande_1.CommandeModel.fromEntity(await this.service.getCommande(code));
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération de la commande";
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
    async findByBDD(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getCommandeByBDD(obj.codeBDD, obj.agence);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération de la commande";
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
    async validateCommande(payload) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.validateCommande(payload);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la validation de la commande";
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
    async validateCommandeByCoordon(payload) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.validateCommandeByCoordon(payload);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la validation de la commande";
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
    async annulerCommande(payload) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            console.log(payload);
            let response = await this.service.annulerCommande(payload);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'annulation de la commande";
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
    async decaisserCommande(payload) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.decaisserCommande(payload);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors du décaissement de la commande";
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
    async findAll(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllCommande(fkAgence);
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
    async findAllBonDeDecaissement(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllBonDeDecaissement(fkAgence);
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
    async findAllBonDeDecaissementByPeriod(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllBonDeDecaissementByPeriod(obj.fkAgence, obj.debut, obj.fin);
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
    async findAllOrdreDeDecaissement(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllOrdreDeDecaissement(fkAgence);
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
    async findAllOrdreDeDecaissementByPeriod(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllOrdreDeDecaissementByPeriod(obj.fkAgence, obj.debut, obj.fin);
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
    async findAllCommandeByPeriodAndEtat(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllCommandeByPeriodAndEtat(obj.fkAgence, obj.debut, obj.fin, obj.etat);
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
    async findLast(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getLastCommande(fkAgence);
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
    async findAllInit(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllInitCommande(fkAgence);
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
    async findAllAnnule(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllAnnuleCommande(fkAgence);
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
    async findAllValide(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllValideCommande(fkAgence);
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
    async findAllValideWithoutAgence() {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllValideCommandeWithoutAgence();
            console.log(response);
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
    async findAllDecaisse(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllDecaisseCommande(fkAgence);
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
    async logicDeleteCommande(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.deleteLogicCommande(code);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la suppression de la commande";
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
    async addAchat(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            obj = achat_1.AchatModel.fromEntity(obj);
            let response = await this.service.addAchat(obj);
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
    async cloturerAchat(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.cloturerAchat(code);
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
    async findAchat(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAchat(code);
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
    async findAllAchat(fkAgence) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllAchat(fkAgence);
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
    async deleteAchat(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.logicDeleteAchat(code);
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
    async addFournisseur(obj) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            obj = fournisseur_1.FournisseurModel.fromEntity(obj);
            let response = await this.service.addFournisseur(obj);
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de l'enregistrement du fournisseur";
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
    async findFournisseur(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = fournisseur_1.FournisseurModel.fromEntity(await this.service.getFournisseur(code));
            if (this.service.getError().errorCode == error_1.ErrorResponseStatus.KO) {
                throw "Une erreur lors de la récupération du fournisseur";
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
    async findAllFournisseur() {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.getAllFournisseur();
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
    async deleteFournisseur(code) {
        let httpResponse = new httpDataResponse_1.HttpDataResponse();
        try {
            let response = await this.service.deleteFournisseur(code);
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
};
__decorate([
    (0, common_1.Post)('commande/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "addCommande", null);
__decorate([
    (0, common_1.Get)('commande/find/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "find", null);
__decorate([
    (0, common_1.Post)('commande/findByBDD'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findByBDD", null);
__decorate([
    (0, common_1.Put)('commande/validate'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commande_1.CommandeModel]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "validateCommande", null);
__decorate([
    (0, common_1.Put)('commande/validateByCoordon'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commande_1.CommandeModel]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "validateCommandeByCoordon", null);
__decorate([
    (0, common_1.Put)('commande/annuler'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commande_1.CommandeModel]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "annulerCommande", null);
__decorate([
    (0, common_1.Put)('commande/decaisser'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commande_1.CommandeModel]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "decaisserCommande", null);
__decorate([
    (0, common_1.Get)('commande/findAll/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('bonDeDecaissement/findAll/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllBonDeDecaissement", null);
__decorate([
    (0, common_1.Post)('bonDeDecaissement/findAllByPeriod'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllBonDeDecaissementByPeriod", null);
__decorate([
    (0, common_1.Get)('ordreDeDecaissement/findAll/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllOrdreDeDecaissement", null);
__decorate([
    (0, common_1.Post)('ordreDeDecaissement/findAllByPeriod'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllOrdreDeDecaissementByPeriod", null);
__decorate([
    (0, common_1.Post)('commande/findAllByPeriodAndEtat'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllCommandeByPeriodAndEtat", null);
__decorate([
    (0, common_1.Get)('commande/findLast/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findLast", null);
__decorate([
    (0, common_1.Get)('commande/findAllInit/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllInit", null);
__decorate([
    (0, common_1.Get)('commande/findAllAnnule/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllAnnule", null);
__decorate([
    (0, common_1.Get)('commande/findAllValide/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllValide", null);
__decorate([
    (0, common_1.Get)('commande/findAllValideWithoutAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllValideWithoutAgence", null);
__decorate([
    (0, common_1.Get)('commande/findAllDecaisse/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllDecaisse", null);
__decorate([
    (0, common_1.Delete)('commande/delete/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "logicDeleteCommande", null);
__decorate([
    (0, common_1.Post)('achat/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "addAchat", null);
__decorate([
    (0, common_1.Put)('achat/cloturer/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "cloturerAchat", null);
__decorate([
    (0, common_1.Get)('achat/find/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAchat", null);
__decorate([
    (0, common_1.Get)('achat/findAll/:fkAgence'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('fkAgence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllAchat", null);
__decorate([
    (0, common_1.Get)('achat/delete/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "deleteAchat", null);
__decorate([
    (0, common_1.Post)('fournisseur/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "addFournisseur", null);
__decorate([
    (0, common_1.Get)('fournisseur/find/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findFournisseur", null);
__decorate([
    (0, common_1.Get)('fournisseur/findAll'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "findAllFournisseur", null);
__decorate([
    (0, common_1.Delete)('fournisseur/delete/:code'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AchatController.prototype, "deleteFournisseur", null);
AchatController = __decorate([
    (0, common_1.Controller)(basicRoute_1.URLConst.getBaseUrl()),
    __metadata("design:paramtypes", [achat_service_1.AchatService, logger_1.LoggerService])
], AchatController);
exports.AchatController = AchatController;
//# sourceMappingURL=achat.controller.js.map