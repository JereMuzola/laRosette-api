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
exports.DaoAgenceService = void 0;
const common_1 = require("@nestjs/common");
const agence_1 = require("../models/agence");
const dao_generic_service_1 = require("./dao.generic.service");
const prisma_service_1 = require("../../../orm/prisma.service");
let DaoAgenceService = class DaoAgenceService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            console.log(payload);
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert agence set code='', description=${payload.description},numero=${payload.numero}, adresse=${payload.adresse}, commune=${payload.commune.toUpperCase()}, province=${payload.province.toUpperCase()}, status=${1}
                ,ville=${payload.ville.toUpperCase()},quartier=${payload.quartier.toUpperCase()},territoire=${payload.territoire.toUpperCase()},secteur=${payload.secteur.toUpperCase()},village=${payload.village.toUpperCase()},avenue=${payload.avenue.toUpperCase()},dateCreate=${new Date()}`,
                this.prisma.$queryRaw `select * from agence order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyData(payload) {
        const datas = await this.dao.findWhere(new agence_1.AgenceModel(), {
            description: payload.description,
            status: true
        });
        if (datas.length == 0) {
            return null;
        }
        return datas[0];
    }
    async findAll() {
        return await this.dao.findWhere(new agence_1.AgenceModel(), { status: true });
    }
    async find(payload) {
        return await this.dao.findUnique(new agence_1.AgenceModel(), payload);
    }
    async update(payload) {
        return await this.dao.update(new agence_1.AgenceModel(), payload);
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new agence_1.AgenceModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new agence_1.AgenceModel(), payload);
    }
};
DaoAgenceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoAgenceService);
exports.DaoAgenceService = DaoAgenceService;
//# sourceMappingURL=dao.agence.service.js.map