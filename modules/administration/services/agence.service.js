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
exports.AgenceService = void 0;
const common_1 = require("@nestjs/common");
const dao_chambre_service_1 = require("../../hebergement/dao/dao.chambre.service");
const dao_stock_service_1 = require("../../restauration/dao/dao.stock.service");
const error_1 = require("../../../utilities/error");
const dao_agence_service_1 = require("../dao/dao.agence.service");
const dao_agent_service_1 = require("../dao/dao.agent.service");
let AgenceService = class AgenceService {
    constructor(dao, daoAgent, daochambre, daoArticle) {
        this.dao = dao;
        this.daoAgent = daoAgent;
        this.daochambre = daochambre;
        this.daoArticle = daoArticle;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addAgence(payload) {
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
            let agents = [];
            let chambres = [];
            let articles = [];
            agents = await this.daoAgent.findByAgence(obj.code);
            chambres = await this.daochambre.findAllByAgence(obj.code);
            articles = await this.daoArticle.getAllArticle(obj.code);
            if (agents.length > 0) {
                for (let i = 0; i < agents.length; i++) {
                    agents[i].agence = obj.description;
                    agents[i] = await this.daoAgent.update(agents[i]);
                }
            }
            if (chambres.length > 0) {
                for (let i = 0; i < chambres.length; i++) {
                    chambres[i].agence = obj.description;
                    chambres[i] = await this.daochambre.update(chambres[i]);
                }
            }
            if (articles.length > 0) {
                for (let i = 0; i < articles.length; i++) {
                    articles[i].agence = obj.description;
                    articles[i] = await this.daoArticle.updateArticle(articles[i]);
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
    async findAgence(payload) {
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
    async deleteLogicAgence(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.logicDelete(payload);
            let agents = [];
            agents = await this.daoAgent.findByAgence(obj.code);
            if (agents.length > 0) {
                for (let i = 0; i < agents.length; i++) {
                    agents[i] = await this.daoAgent.logicDelete(agents[i]);
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
    async deleteDefinitivelyAgence(payload) {
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
AgenceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_agence_service_1.DaoAgenceService, dao_agent_service_1.DaoAgentService,
        dao_chambre_service_1.DaoChambreService, dao_stock_service_1.DaoStockService])
], AgenceService);
exports.AgenceService = AgenceService;
//# sourceMappingURL=agence.service.js.map