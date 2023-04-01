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
exports.DaoGenericService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../orm/prisma.service");
const encryption_1 = require("../../../utilities/encryption");
const agence_1 = require("../models/agence");
const agent_1 = require("../models/agent");
const service_1 = require("../models/service");
const utilisateur_1 = require("../models/utilisateur");
let DaoGenericService = class DaoGenericService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(obj) {
        try {
            switch (obj.constructor) {
                case agence_1.AgenceModel:
                    return await this.prisma.agence.findMany({
                        where: {
                            status: true
                        },
                        orderBy: {
                            code: "desc"
                        }
                    });
                case agent_1.AgentModel:
                    return await this.prisma.agent.findMany({
                        where: {
                            status: true
                        },
                        orderBy: {
                            code: "desc"
                        }
                    });
                case service_1.ServiceModel:
                    return await this.prisma.service.findMany({
                        where: {
                            status: true
                        },
                        orderBy: {
                            code: "desc"
                        }
                    });
                case utilisateur_1.UtilisateurModel:
                    return await this.prisma.utilisateur.findMany({
                        where: {
                            status: true
                        },
                        orderBy: {
                            code: "desc"
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async findUnique(obj, payload) {
        try {
            switch (obj.constructor) {
                case agence_1.AgenceModel:
                    return await this.prisma.agence.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case agent_1.AgentModel:
                    return await this.prisma.agent.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case service_1.ServiceModel:
                    return await this.prisma.service.findUnique({
                        where: {
                            code: payload
                        }
                    });
                case utilisateur_1.UtilisateurModel:
                    return await this.prisma.utilisateur.findUnique({
                        where: {
                            code: payload
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async findWhere(obj, payload) {
        try {
            switch (obj.constructor) {
                case agence_1.AgenceModel:
                    return await this.prisma.agence.findMany({
                        where: payload
                    });
                case agent_1.AgentModel:
                    return await this.prisma.agent.findMany({
                        where: payload
                    });
                case service_1.ServiceModel:
                    return await this.prisma.service.findMany({
                        where: payload
                    });
                case utilisateur_1.UtilisateurModel:
                    return await this.prisma.utilisateur.findMany({
                        where: payload
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(obj, payload) {
        try {
            switch (obj.constructor) {
                case agence_1.AgenceModel:
                    return await this.prisma.agence.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            adresse: payload.adresse,
                            avenue: payload.avenue,
                            commune: payload.commune,
                            description: payload.description,
                            numero: payload.numero,
                            province: payload.province,
                            quartier: payload.quartier,
                            secteur: payload.secteur,
                            territoire: payload.territoire,
                            village: payload.village,
                            ville: payload.ville,
                        }
                    });
                case agent_1.AgentModel:
                    return await this.prisma.agent.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            adresse: payload.adresse,
                            etat_civil: payload.etat_civil,
                            fkAgence: payload.fkAgence,
                            agence: payload.agence,
                            lieu_naissance: payload.lieu_naissance,
                            date_naissance: payload.date.date_naissance,
                            province_origine: payload.province_origine,
                            district_origine: payload.district_origine,
                            territoire_origine: payload.territoire_origine,
                            secteur_origine: payload.secteur_origine,
                            groupement_origine: payload.groupement_origine,
                            village_origine: payload.village_origine,
                            fkService: payload.fkService,
                            fonction: payload.fonction,
                            isGerant: payload.isGerant,
                            mail: payload.mail,
                            nom: payload.nom,
                            postnom: payload.postnom,
                            prenom: payload.prenom,
                            sexe: payload.sexe,
                            telephone: payload.telephone,
                        }
                    });
                case service_1.ServiceModel:
                    console.log(payload);
                    return await this.prisma.service.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            description: payload.description,
                            fkAgentGerant: payload.fkAgentGerant,
                            agentGerant: payload.agentGerant,
                            nom: payload.nom,
                        }
                    });
                case utilisateur_1.UtilisateurModel:
                    return await this.prisma.utilisateur.update({
                        where: {
                            code: payload.code
                        },
                        data: {
                            password: await encryption_1.Encryptor.encrypt(payload.password),
                            username: payload.username,
                            role: payload.role,
                            fkAgence: payload.fkAgence
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async logicDelete(obj, payload) {
        try {
            switch (obj.constructor) {
                case agence_1.AgenceModel:
                    return await this.prisma.agence.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                case agent_1.AgentModel:
                    return await this.prisma.agent.update({
                        where: {
                            code: payload,
                        },
                        data: {
                            status: false
                        }
                    });
                case service_1.ServiceModel:
                    return await this.prisma.service.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                case utilisateur_1.UtilisateurModel:
                    return await this.prisma.utilisateur.update({
                        where: {
                            code: payload
                        },
                        data: {
                            status: false
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async definitiveDelete(obj, payload) {
        try {
            switch (obj.constructor) {
                case agence_1.AgenceModel:
                    return await this.prisma.agence.delete({
                        where: {
                            code: payload
                        }
                    });
                case agent_1.AgentModel:
                    return await this.prisma.agent.delete({
                        where: {
                            code: payload
                        }
                    });
                case service_1.ServiceModel:
                    return await this.prisma.service.delete({
                        where: {
                            code: payload
                        }
                    });
                case utilisateur_1.UtilisateurModel:
                    return await this.prisma.utilisateur.delete({
                        where: {
                            code: payload
                        }
                    });
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
};
DaoGenericService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DaoGenericService);
exports.DaoGenericService = DaoGenericService;
//# sourceMappingURL=dao.generic.service.js.map