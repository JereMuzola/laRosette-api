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
exports.DaoAgentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../orm/prisma.service");
const utilsString_1 = require("../../../utilities/utilsString");
const agent_1 = require("../models/agent");
const dao_generic_service_1 = require("./dao.generic.service");
const utilsDate_1 = require("../../../utilities/utilsDate");
let DaoAgentService = class DaoAgentService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            console.log(payload);
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert agent set code='', 
                nom=${payload.nom.toUpperCase()},
                postnom=${payload.postnom.toUpperCase()}, 
                prenom=${utilsString_1.UtilsString.ucFirstLetter(payload.prenom)}, 
                sexe=${payload.sexe}, 
                telephone=${payload.telephone},
                mail=${payload.mail},
                agence=${payload.agence.toUpperCase()},
                service=${payload.service.toUpperCase()},
                adresse=${payload.adresse},
                etat_civil=${payload.etat_civil.toUpperCase()},
                fonction=${payload.fonction.toUpperCase()},
                isGerant=${payload.isGerant},
                fkAgence=${payload.fkAgence},
                fkService=${payload.fkService},
                dateCreate=${new Date()},
                status=${1},
                province_origine=${payload.province_origine.toUpperCase()},
                district_origine=${payload.district_origine.toUpperCase()},
                territoire_origine=${payload.territoire_origine.toUpperCase()},
                village_origine=${payload.village_origine},
                lieu_naissance=${payload.lieu_naissance.toUpperCase()},
                date_naissance=${utilsDate_1.UtilDate.parseDate(payload.date_naissance)},
                secteur_origine=${payload.secteur_origine.toUpperCase()},
                groupement_origine=${payload.groupement_origine.toUpperCase()}`,
                this.prisma.$queryRaw `select * from agent order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async verifyData(payload) {
        const datas = await this.dao.findWhere(new agent_1.AgentModel(), {
            nom: payload.nom,
            postnom: payload.postnom,
            prenom: payload.prenom,
            sexe: payload.sexe,
            status: true
        });
        if (datas.length == 0) {
            return null;
        }
        return datas[0];
    }
    async findAll() {
        return await this.dao.findAll(new agent_1.AgentModel());
    }
    async findAllAgentGerant() {
        return await this.dao.findWhere(new agent_1.AgentModel, { isGerant: true, status: true });
    }
    async findByAgence(fkAgence) {
        return await this.dao.findWhere(new agent_1.AgentModel, { fkAgence: fkAgence, status: true });
    }
    async find(payload) {
        return await this.dao.findUnique(new agent_1.AgentModel(), payload);
    }
    async update(payload) {
        const result = await this.dao.update(new agent_1.AgentModel(), payload);
        return result;
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new agent_1.AgentModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new agent_1.AgentModel(), payload);
    }
};
DaoAgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoAgentService);
exports.DaoAgentService = DaoAgentService;
//# sourceMappingURL=dao.agent.service.js.map