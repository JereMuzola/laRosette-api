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
exports.DaoChambreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../orm/prisma.service");
const constant_1 = require("../../../utilities/constant");
const chambre_1 = require("../models/chambre");
const dao_generic_service_1 = require("./dao.generic.service");
let DaoChambreService = class DaoChambreService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert chambre set code='',numero=${payload.numero},devise=${payload.devise},fkDevise=${payload.fkDevise},description=${payload.description},prix=${payload.prix},fkAgence=${payload.fkAgence},agence=${payload.agence},tel=${payload.tel},etat=${constant_1.EtatChambre.LIBRE},status=${1},dateCreate=${new Date()}`,
                this.prisma.$queryRaw `select * from chambre where fkAgence=${payload.fkAgence} order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyData(payload) {
        const datas = await this.dao.findWhere(new chambre_1.ChambreModel(), {
            numero: payload.numero,
            tel: payload.tel,
            status: true,
            fkAgence: payload.fkAgence
        });
        if (datas.length == 0) {
            return null;
        }
        return datas[0];
    }
    async findAll() {
        return await this.dao.findAll(new chambre_1.ChambreModel());
    }
    async findAllByAgence(fkAgence) {
        return await this.dao.findWhere(new chambre_1.ChambreModel(), { fkAgence: fkAgence, status: true });
    }
    async find(payload) {
        return await this.dao.findUnique(new chambre_1.ChambreModel(), payload);
    }
    async update(payload) {
        return await this.dao.update(new chambre_1.ChambreModel(), payload);
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new chambre_1.ChambreModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new chambre_1.ChambreModel(), payload);
    }
};
DaoChambreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoChambreService);
exports.DaoChambreService = DaoChambreService;
//# sourceMappingURL=dao.chambre.service.js.map