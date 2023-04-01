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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const error_1 = require("../../../utilities/error");
const dao_agent_service_1 = require("../dao/dao.agent.service");
const dao_service_service_1 = require("../dao/dao.service.service");
let ServiceService = class ServiceService {
    constructor(dao, daoAgent) {
        this.dao = dao;
        this.daoAgent = daoAgent;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async add(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.verifyData(payload);
            if (obj == null) {
                let agentGerant = await this.daoAgent.find(payload.fkAgentGerant);
                if (agentGerant == null) {
                    payload.fkAgentGerant = null;
                    payload.agentGerant = null;
                }
                else {
                    agentGerant.isGerant = true;
                    agentGerant = await this.daoAgent.update(agentGerant);
                }
                obj = await this.dao.create(payload);
                if (obj == null) {
                    throw 'Il y a un problème';
                }
                this.error.errorCode = error_1.ErrorResponseStatus.OK;
                this.error.errorDescription = "Agence enregistrée avec success";
            }
            else {
                this.error.errorCode = error_1.ErrorResponseStatus.KO;
                this.error.errorDescription = "Agence déjà créée";
                obj = null;
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
    async update(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.update(payload);
            this.error.errorDescription = "Agence mise à jour avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur renvoyée par le serveur";
            console.log(error);
        }
        return obj;
    }
    async find(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.find(payload);
            obj == null ? this.error.errorDescription = "Aucune agence trouvée" : this.error.errorDescription = "Agence trouvé avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteLogic(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.logicDelete(payload);
            obj == null ? this.error.errorDescription = "Aucune agence à supprimer supprimée" : this.error.errorDescription = "Agence supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteDefinitively(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.definitiveDelete(payload);
            obj == null ? this.error.errorDescription = "Aucune agence à supprimer supprimée" : this.error.errorDescription = "Agence supprimée avec success";
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
ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_service_service_1.DaoServiceService, dao_agent_service_1.DaoAgentService])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map