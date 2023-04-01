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
var DaoCommonService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoCommonService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../orm/prisma.service");
const app_utilities_1 = require("../../../utilities/app.utilities");
const client_2 = require("../models/client");
const devise_1 = require("../models/devise");
const taux_change_1 = require("../models/taux.change");
let DaoCommonService = DaoCommonService_1 = class DaoCommonService {
    constructor() { }
    static instance() {
        if (!DaoCommonService_1._instance) {
            DaoCommonService_1._instance = new DaoCommonService_1();
            DaoCommonService_1._prisma = new prisma_service_1.PrismaService();
        }
        return DaoCommonService_1._prisma;
    }
    async addDevise(payload) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `insert Devise set description=${payload.description},symbole=${payload.symbole},diminutif=${payload.diminutif},dateCreate=${new Date()},status=${true}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from Devise order by code desc limit 1`);
            obj = devise_1.DeviseModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion de la Devise d'article");
        }
        catch (error) {
            console.log(error);
            payload.code = '';
        }
        return obj;
    }
    async updateDevise(payload) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.code, "Fournissez le code");
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `update devise set description=${payload.description},symbole=${payload.symbole},diminutif=${payload.diminutif} where code=${payload.code}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from devise where code=${payload.code} `);
            obj = devise_1.DeviseModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, 'Echec lors de la récupération de la Devise');
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getAllDevise() {
        let datas = [];
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from devise where status=${true}`);
            datas = result;
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getDevise(code) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from devise where code=${code} and status=${true}`);
            if (result.length > 0) {
                obj = result[0];
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async deleteDevise(code) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `delete from devise where code=${code}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categorieArticle where code=${code}`);
            result.length > 0
                ? obj == devise_1.DeviseModel.fromEntity(result[0])
                : (obj = null);
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async addTauxChange(payload) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `insert tauxchange set taux=${Number(payload.taux)},fkDeviseOrigine=${payload.fkDeviseOrigine},
            deviseOrigine=${payload.deviseOrigine},fkDeviseDestination=${payload.fkDeviseDestination},
            deviseDestination=${payload.deviseDestination},
            dateCreate=${new Date()},status=${true},
            fkAgent= ${payload.fkAgent},
            agent=${payload.agent}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tauxchange order by code desc limit 1`);
            obj = taux_change_1.TauxChangeModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion du taux de change");
        }
        catch (error) {
            console.log(error);
            payload.code = '';
        }
        return obj;
    }
    async getAllTauxChange() {
        let datas = [];
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tauxchange where status=${1} order by code desc limit 500`);
            datas = result;
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getTauxToApply() {
        let data = null;
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tauxchange where status=${1} order by code desc limit 1`);
            data = result[0];
        }
        catch (error) {
            console.log(error);
        }
        return data;
    }
    async getTaux(code) {
        let data = null;
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tauxchange where code=${code} order by code desc limit 1`);
            data = result[0];
        }
        catch (error) {
            console.log(error);
        }
        return data;
    }
    async addClient(payload) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `insert client set nom=${payload.nom.toUpperCase()},postnom=${payload.postnom.toUpperCase()},prenom=${payload.prenom.toUpperCase()},sexe=${payload.sexe},tel=${payload.tel},adresse_mail=${payload.adresse_mail},nationalite=${payload.nationalite},piece_identite=${payload.piece_identite},num_piece_identite=${payload.num_piece_identite},adresse=${payload.adresse},etat=${payload.etat},provenance=${payload.provenance},destination=${payload.destination},status=${1}, fkAgence=${payload.fkAgence},agence=${payload.agence},dateCreate=${new Date()},motifVoyage=${payload.motifVoyage},isAdult=${payload.isAdult}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from client where fkAgence=${payload.fkAgence} order by code desc limit 1`);
            obj = client_2.ClientModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion du client");
        }
        catch (error) {
            console.log(error);
            payload.code = '';
        }
        return obj;
    }
    async updateClient(payload) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.code, "Fournissez le code");
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `update client set nom=${payload.nom},postnom=${payload.postnom},prenom=${payload.prenom},sexe=${payload.sexe},tel=${payload.tel},adresse_mail=${payload.adresse_mail},nationalite=${payload.nationalite},piece_identite=${payload.piece_identite},num_piece_identite=${payload.num_piece_identite},adresse=${payload.adresse},etat=${payload.etat},provenance=${payload.provenance},destination=${payload.destination}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from client where code=${payload.code}`);
            obj = client_2.ClientModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, 'Echec lors de la récupération du client');
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async deleteClient(code) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$executeRaw(client_1.Prisma.sql `update client set status=${false} where code=${code}`);
            result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from client where code=${code}`);
            result.length > 0
                ? obj == client_2.ClientModel.fromEntity(result[0])
                : (obj = null);
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllClient(fkAgence) {
        let datas = [];
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from client where status=${true} and fkAgence=${fkAgence} order by nom`);
            datas = result;
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllClientHosted(fkAgence) {
        let datas = [];
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `SELECT client.nom,client.postnom,client.prenom,client.sexe,client.tel,client.provenance,client.destination FROM client INNER JOIN detailoccupation ON client.code=detailoccupation.fkClient WHERE detailoccupation.dateArrive<=${new Date()} and detailoccupation.dateDepart>=${new Date()} and fkAgence=${fkAgence} order by client.nom;`);
            datas = result;
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllClientNoHosted(fkAgence) {
        let datas = [];
        try {
            let dateT = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `SELECT * FROM client WHERE client.code NOT IN (SELECT detailoccupation.fkClient FROM detailoccupation WHERE detailoccupation.dateArrive<=${dateT} and detailoccupation.dateDepart>=${dateT}) and fkAgence=${fkAgence} order by client.nom;`);
            datas = result;
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getClient(code) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from client where code=${code} and status=${true}`);
            if (result.length > 0) {
                obj = result[0];
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getClientByNoms(nom, postnom, prenom) {
        let obj = null;
        try {
            let result = await DaoCommonService_1.instance().$queryRaw(client_1.Prisma.sql `select * from client where nom=${nom} or postnom=${postnom} or prenom=${prenom} and status=${true}`);
            if (result.length > 0) {
                obj = result[0];
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
};
DaoCommonService = DaoCommonService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DaoCommonService);
exports.DaoCommonService = DaoCommonService;
//# sourceMappingURL=dao.common.servise.js.map