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
exports.DaoUtilisateurService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../orm/prisma.service");
const utilisateur_1 = require("../models/utilisateur");
const dao_generic_service_1 = require("./dao.generic.service");
const encryption_1 = require("../../../utilities/encryption");
let DaoUtilisateurService = class DaoUtilisateurService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert utilisateur set code='', username=${payload.username},password=${await encryption_1.Encryptor.encrypt(payload.password)},status=${true}, dateCreate=${new Date()},fkAgent=${payload.fkAgent}, fkAgentCreate=${payload.fkAgentCreate},role=${payload.role},fkAgence=${payload.fkAgence}`,
                this.prisma.$queryRaw `select * from utilisateur order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyData(payload) {
        const datas = await this.dao.findWhere(new utilisateur_1.UtilisateurModel(), {
            username: payload.username,
            status: true
        });
        if (datas.length == 0) {
            return null;
        }
        return datas[0];
    }
    async findAll() {
        return await this.dao.findAll(new utilisateur_1.UtilisateurModel());
    }
    async find(payload) {
        return await this.dao.findUnique(new utilisateur_1.UtilisateurModel(), payload);
    }
    async login(username) {
        console.log("username : " + username);
        const datas = await this.dao.findWhere(new utilisateur_1.UtilisateurModel(), { username: username });
        console.log(datas);
        if (datas.length == 0) {
            return null;
        }
        return datas[0];
    }
    async update(payload) {
        return await this.dao.update(new utilisateur_1.UtilisateurModel(), payload);
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new utilisateur_1.UtilisateurModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new utilisateur_1.UtilisateurModel(), payload);
    }
};
DaoUtilisateurService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoUtilisateurService);
exports.DaoUtilisateurService = DaoUtilisateurService;
//# sourceMappingURL=dao.utilisateur.service.js.map