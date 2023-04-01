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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChambreService = void 0;
const common_1 = require("@nestjs/common");
const app_utilities_1 = require("../../../utilities/app.utilities");
const error_1 = require("../../../utilities/error");
const dao_chambre_service_1 = require("../dao/dao.chambre.service");
let ChambreService = class ChambreService {
    constructor(dao) {
        this.dao = dao;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addChambre(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.verifyData(payload);
            if (obj == null) {
                obj = await this.dao.create(payload);
                if (obj == null) {
                    throw 'Il y a un problème';
                }
                this.error.errorCode = error_1.ErrorResponseStatus.OK;
                this.error.errorDescription = "Chambre enregistrée avec success";
            }
            else {
                obj = await this.dao.update(obj);
                this.error.errorCode = error_1.ErrorResponseStatus.OK;
                this.error.errorDescription = "Chambre enregistrée avec success";
            }
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème lors de l'insertion";
            console.log(error);
        }
        return obj;
    }
    async findAll() {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findAll();
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        return data;
    }
    async findAllByAgence(fkAgence) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findAllByAgence(fkAgence);
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        return data;
    }
    async update(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.update(payload);
            obj !== null ? this.error.errorDescription = "Chambre mise à jour avec success" : this.error.errorDescription = "Erreur lors de la mise à jour";
            obj !== null ? this.error.errorCode = error_1.ErrorResponseStatus.OK : this.error.errorCode = error_1.ErrorResponseStatus.KO;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur renvoyée par le serveur";
            console.log(error);
        }
        return obj;
    }
    async findChambre(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.find(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Chambre inexistante");
            this.error.errorDescription = "Chambre trouvée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteLogicChambre(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.logicDelete(payload);
            obj == null ? this.error.errorDescription = "Aucune chambre à supprimer supprimée" : this.error.errorDescription = "chambre supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteDefinitivelyChambre(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.definitiveDelete(payload);
            obj == null ? this.error.errorDescription = "Aucune chambre à supprimer supprimée" : this.error.errorDescription = "Chambre supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
};
ChambreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_chambre_service_1.DaoChambreService])
], ChambreService);
exports.ChambreService = ChambreService;
//# sourceMappingURL=chambre.service.js.map