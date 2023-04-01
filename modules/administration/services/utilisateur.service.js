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
exports.UtilisateurService = void 0;
const common_1 = require("@nestjs/common");
const encryption_1 = require("../../../utilities/encryption");
const error_1 = require("../../../utilities/error");
const dao_agent_service_1 = require("../dao/dao.agent.service");
const dao_utilisateur_service_1 = require("../dao/dao.utilisateur.service");
const dao_agence_service_1 = require("../dao/dao.agence.service");
let UtilisateurService = class UtilisateurService {
    constructor(daoUtilisateur, daoAgent, daoAgence) {
        this.daoUtilisateur = daoUtilisateur;
        this.daoAgent = daoAgent;
        this.daoAgence = daoAgence;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async login(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.daoUtilisateur.login(payload.username);
            console.log(obj);
            if (obj == null) {
                this.error.errorCode = error_1.ErrorResponseStatus.KO;
                this.error.errorDescription = "Aucun compte existant avec ce nom d'utilisateur";
            }
            else {
                if (await encryption_1.Encryptor.decrypt(payload.password, obj.password)) {
                    obj.password = payload.password;
                    obj.agentCreate = await this.daoAgent.find(obj.fkAgentCreate);
                    obj.agent = await this.daoAgent.find(obj.fkAgent);
                    obj.agence = await this.daoAgence.find(obj.fkAgence);
                    this.error.errorCode = error_1.ErrorResponseStatus.OK;
                    this.error.errorDescription = "Utilisateur trouvé";
                }
                else {
                    this.error.errorCode = error_1.ErrorResponseStatus.KO;
                    this.error.errorDescription = "Le mot de passe fourni est incorrect";
                    obj = null;
                }
            }
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Nom d'utilisateur ou mot de passe incorrects";
            console.log(error);
        }
        return obj;
    }
    async register(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.daoUtilisateur.verifyData(payload);
            if (obj == null) {
                obj = await this.daoUtilisateur.create(payload);
                if (obj == null) {
                    throw 'Il y a un problème';
                }
                this.error.errorCode = error_1.ErrorResponseStatus.OK;
                this.error.errorDescription = "Utilisateur enregistré avec success";
            }
            else {
                this.error.errorCode = error_1.ErrorResponseStatus.KO;
                this.error.errorDescription = "Utilisateur existant";
                obj = null;
            }
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Nom d'utilisateur ou mot de passe incorrects";
            console.log(error);
        }
        return obj;
    }
    async findAll() {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.daoUtilisateur.findAll();
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
            obj = await this.daoUtilisateur.update(payload);
            this.error.errorDescription = "Utilisateur mis à jour avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur renvoyée par le serveur";
            console.log(error);
        }
        return obj;
    }
    async findUtilisateur(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.daoUtilisateur.find(payload);
            obj == null ? this.error.errorDescription = "Aucun Utilisateur trouvée" : this.error.errorDescription = "Utilisateur trouvé avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteLogicUtilisateur(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.daoUtilisateur.logicDelete(payload);
            obj == null ? this.error.errorDescription = "Aucun utilisateur à supprimer" : this.error.errorDescription = "utilisateur supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteDefinitivelyUtilisateur(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.daoUtilisateur.definitiveDelete(payload);
            obj == null ? this.error.errorDescription = "Aucun utilisateur à supprimer" : this.error.errorDescription = "Utilisateur supprimé avec success";
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
UtilisateurService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_utilisateur_service_1.DaoUtilisateurService, dao_agent_service_1.DaoAgentService,
        dao_agence_service_1.DaoAgenceService])
], UtilisateurService);
exports.UtilisateurService = UtilisateurService;
//# sourceMappingURL=utilisateur.service.js.map