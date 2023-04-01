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
exports.DaoCategorieChambreService = void 0;
const common_1 = require("@nestjs/common");
const categorie_chambre_1 = require("../models/categorie.chambre");
const dao_generic_service_1 = require("./dao.generic.service");
const prisma_service_1 = require("../../../orm/prisma.service");
let DaoCategorieChambreService = class DaoCategorieChambreService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert categoriechambre set code='', description=${payload.description},prix=${Number(payload.prix)}, status=${1},dateCreate=${new Date()}`,
                this.prisma.$queryRaw `select * from categoriechambre order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        return await this.dao.findAll(new categorie_chambre_1.CategorieChambreModel());
    }
    async find(payload) {
        return await this.dao.findUnique(new categorie_chambre_1.CategorieChambreModel(), payload);
    }
    async update(payload) {
        return await this.dao.update(new categorie_chambre_1.CategorieChambreModel(), payload);
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new categorie_chambre_1.CategorieChambreModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new categorie_chambre_1.CategorieChambreModel(), payload);
    }
};
DaoCategorieChambreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoCategorieChambreService);
exports.DaoCategorieChambreService = DaoCategorieChambreService;
//# sourceMappingURL=dao.categorie.chambre.service.js.map