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
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const error_1 = require("../../../utilities/error");
const dao_agence_service_1 = require("../dao/dao.agence.service");
const dao_agent_service_1 = require("../dao/dao.agent.service");
const dao_service_service_1 = require("../dao/dao.service.service");
let AgentService = class AgentService {
    constructor(dao, daoAgence, daoService) {
        this.dao = dao;
        this.daoAgence = daoAgence;
        this.daoService = daoService;
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
                if (payload.isGerant) {
                    let service = await this.daoService.find(payload.fkService);
                    obj = await this.dao.create(payload);
                    if (service != null && obj != null) {
                        service.fkAgentGerant = obj.code;
                        service.agentGerant = obj.nom + " " + obj.postnom + " " + obj.prenom;
                        service = await this.daoService.update(service);
                    }
                }
                else {
                    obj = await this.dao.create(payload);
                }
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
            for (let index = 0; index < data.length; index++) {
                data[index].dateCreate = data[index].dateCreate.toLocaleDateString();
            }
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
    async findAllAgentGerant() {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findAllAgentGerant();
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
            let services = [];
            services = await this.daoService.findByAgentGerant(obj.code);
            if (services.length > 0) {
                for (let i = 0; i < services.length; i++) {
                    services[i].agentGerant = obj.nom + " " + obj.postnom + " " + obj.prenom;
                    services[i] = await this.daoService.update(services[i]);
                }
            }
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
            if (obj == null) {
                this.error.errorDescription = "Aucune agence trouvée";
            }
            else {
                this.error.errorDescription = "Agence trouvé avec success";
                obj.agence = await this.daoAgence.find(obj.fkAgence);
                obj.service = await this.daoService.find(obj.fkService);
            }
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
            let services = [];
            services = await this.daoService.findByAgentGerant(obj.code);
            if (services.length > 0) {
                for (let i = 0; i < services.length; i++) {
                    services[i].fkAgentGerant = null;
                    services[i].agentGerant = null;
                    services[i] = await this.daoService.update(services[i]);
                }
            }
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
AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_agent_service_1.DaoAgentService, dao_agence_service_1.DaoAgenceService,
        dao_service_service_1.DaoServiceService])
], AgentService);
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map