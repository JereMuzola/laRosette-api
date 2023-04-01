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
exports.DaoServiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../orm/prisma.service");
const utilsString_1 = require("../../../utilities/utilsString");
const service_1 = require("../models/service");
const dao_generic_service_1 = require("./dao.generic.service");
let DaoServiceService = class DaoServiceService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert service set code='', nom=${payload.nom.toUpperCase()},status=${true}, description=${utilsString_1.UtilsString.ucFirstLetter(payload.description)}, dateCreate=${new Date()}, fkAgentGerant=${payload.fkAgentGerant},agentGerant=${payload.agentGerant},fkAgent= ${payload.fkAgent},agent=${payload.agent}`,
                this.prisma.$queryRaw `select * from service order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyData(payload) {
        const datas = await this.dao.findWhere(new service_1.ServiceModel(), {
            nom: payload.nom,
            status: true
        });
        if (datas.length == 0) {
            return null;
        }
        return datas[0];
    }
    async findAll() {
        return await this.dao.findAll(new service_1.ServiceModel());
    }
    async find(payload) {
        return await this.dao.findUnique(new service_1.ServiceModel(), payload);
    }
    async findByAgentGerant(fkAgentGerant) {
        return await this.dao.findWhere(new service_1.ServiceModel(), { fkAgentGerant: fkAgentGerant });
    }
    async update(payload) {
        return await this.dao.update(new service_1.ServiceModel(), payload);
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new service_1.ServiceModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new service_1.ServiceModel(), payload);
    }
};
DaoServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoServiceService);
exports.DaoServiceService = DaoServiceService;
//# sourceMappingURL=dao.service.service.js.map