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
exports.DaoOccupationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../orm/prisma.service");
const constant_1 = require("../../../utilities/constant");
const utilsDate_1 = require("../../../utilities/utilsDate");
const detail_facture_1 = require("../models/detail.facture");
const detail_occupation_1 = require("../models/detail.occupation");
const facture_1 = require("../models/facture");
const occupation_1 = require("../models/occupation");
const dao_generic_service_1 = require("./dao.generic.service");
let DaoOccupationService = class DaoOccupationService {
    constructor(dao, prisma) {
        this.dao = dao;
        this.prisma = prisma;
    }
    async create(payload) {
        try {
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert occupation set code='',montantAPayer=${payload.montantAPayer},typeOccupation=${payload.typeOccupation},fkClientResponsable=${payload.fkClientResponsable},clientResponsable=${payload.clientResponsable},fkReservation=${payload.fkReservation},fkAgence=${payload.fkAgence},agence=${payload.agence},fkAgent=${payload.fkAgent},agent=${payload.agent},etat=${constant_1.EtatOccupation.ENCOURS},status=${1},dateCreate=${new Date()}`,
                this.prisma.$queryRaw `select * from occupation where fkAgence=${payload.fkAgence} order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async createPaiement(payload) {
        try {
            let tauxChange = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from tauxchange order by code desc limit 1`);
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert paiement set libelle=${payload.libelle},transactionDate=${new Date()},transactionMontant=${payload.transactionMontant},transactionDevise=${"USD"},montantConverti=${Number(payload.transactionMontant) * Number(tauxChange[0].taux)},deviseConversion=${"CDF"},typePaiement=${"Liquide"},taux=${tauxChange[0].taux},fkAgent=${payload.fkAgent},agent=${payload.agent},fkAgence=${payload.fkAgence},agence=${payload.agence},fkFacture=${payload.fkFacture},fkCompte=${"Compte courant"},fkTransanctionCentre=${payload.fkTransactionCentre},status=${1}`,
                this.prisma.$queryRaw `select * from paiement where fkAgence=${payload.fkAgence} order by id DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async payerOccupation(payload) {
        let obj = null;
        try {
            let tauxChange = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from tauxchange order by code desc limit 1`);
            if (!payload.occupation.facture.isPaid) {
                let result = await this.prisma.$executeRaw(client_1.Prisma.sql `update facture set isPaid=${payload.occupation.facture.solde <= payload.montant ? 1 : 0} where code=${payload.occupation.facture.code} and status=${1}`);
                result = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from occupation where code=${payload.occupation.code}`);
                let solde = Number(payload.occupation.facture.solde) - Number(payload.montant);
                let cummul = Number(payload.occupation.facture.montantPaye) + Number(payload.montant);
                let facture = await this.prisma.$executeRaw(client_1.Prisma.sql `update facture set montantPaye=${cummul},date_edit=${new Date()},solde=${solde},status=${1} where code=${payload.occupation.facture.code} and status=${1}`);
            }
            let result = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from occupation where code=${payload.occupation.code}`);
            if (result != null && result.length > 0) {
                obj = occupation_1.OccupationModel.fromEntity(result[0]);
                let factureObj = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from facture where fkOccupation=${obj.code}`);
                let paiement = await this.prisma.$executeRaw(client_1.Prisma.sql `insert paiement set numTransaction='',libelle=${"Paiement de " + payload.montant + " de la facture " + factureObj[0].code},transactionDate=${new Date()},status=${1},transactionMontant=${payload.montant},transactionDevise=${"USD"},montantConverti=${Number(payload.montant) * Number(tauxChange[0].taux)},deviseConversion=${"CDF"},typePaiement=${"Liquide"},taux=${tauxChange[0].taux},fkAgent=${obj.fkAgent},agent=${obj.agent},fkAgence=${obj.fkAgence},agence=${obj.agence},fkFacture=${factureObj[0].code},fkCompte=${"Compte Courant"},fkTransanctionCentre=${"AUBERGE"}`);
                obj.facture = facture_1.FactureModel.fromEntity(factureObj[0]);
                obj.details = [];
                for (let i = 0; i < payload.occupation.details.length; i++) {
                    let detail = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from detailOccupation where fkOccupation=${obj.code} and id=${payload.occupation.details[i].id}`);
                    for (let j = 0; j < detail.length; j++) {
                        obj.details.push(detail_occupation_1.DetailOccupationModel.fromEntity(detail[j]));
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        console.log(obj);
        return obj;
    }
    async getDataForLineChartOccupationDaily(fkAgence, debut, fin) {
        let datas = [];
        let datasHeure = [];
        try {
            datas = await this.prisma.$queryRaw(client_1.Prisma.sql `select hour(occupation.dateCreate) as 'heure',SUM(detailoccupation.montantAPayer) as 'montant' from detailoccupation,occupation where detailoccupation.fkOccupation=occupation.code and occupation.fkAgence=${fkAgence} and status=${1} and (Date(occupation.dateCreate)>=${debut} and Date(occupation.dateCreate)<=${fin}) GROUP BY hour(occupation.dateCreate) order by heure ASC`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasHeure[i] = Number(datas[i].heure);
                }
                for (let i = 0; i < 24; i++) {
                    if (!datasHeure.includes(i)) {
                        datas.push({
                            heure: i + " h",
                            montant: 0,
                        });
                    }
                    else {
                        let data = datas.find((el) => el.heure == i);
                        datas = datas.filter((el) => el.heure != i);
                        datas.push({
                            heure: i + " h",
                            montant: Number(data.montant),
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getDataForLineChartOccupationWeekly(fkAgence, debut, fin) {
        let datas = [];
        let datasDate = [];
        try {
            datas = await this.prisma.$queryRaw(client_1.Prisma.sql `select Date(occupation.dateCreate) as 'dateOccupation', sum(detailoccupation.montantAPayer) as 'montant' from occupation,detailoccupation where detailoccupation.fkOccupation=occupation.code and occupation.fkAgence=${fkAgence} and status=${1} and (Date(occupation.dateCreate)>=${debut} and Date(occupation.dateCreate)<=${fin}) GROUP BY Date(occupation.dateCreate) order by dateOccupation ASC`);
            let arrayDate = [];
            arrayDate = utilsDate_1.UtilDate.getDatesInRange(debut, fin);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasDate[i] = datas[i].dateOccupation;
                }
                for (let i = 0; i < arrayDate.length; i++) {
                    let data = datas.find((el) => new Date(el.dateOccupation).getDate() === new Date(arrayDate[i]).getDate());
                    if (data) {
                        datas = datas.filter((el) => new Date(el.dateOccupation).getDate() !== new Date(data.dateOccupation).getDate());
                        datas.push({
                            date: arrayDate[i].toLocaleDateString(),
                            montant: Number(data.montant)
                        });
                    }
                    else {
                        datas.push({
                            date: arrayDate[i].toLocaleDateString(),
                            montant: 0
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getDataForLineChartOccupationMonthly(fkAgence, debut, fin) {
        let datas = [];
        let datasDate = [];
        try {
            datas = await this.prisma.$queryRaw(client_1.Prisma.sql `select date(occupation.dateCreate) as 'dateOccupation', sum(detailoccupation.montantAPayer) as 'montant' from occupation,detailoccupation where detailoccupation.fkOccupation=occupation.code and occupation.fkAgence=${fkAgence} and status=${1} and (Date(occupation.dateCreate)>=${debut} and Date(occupation.dateCreate)<=${fin}) GROUP BY Date(occupation.dateCreate) order by dateOccupation ASC`);
            let arrayDate = [];
            arrayDate = utilsDate_1.UtilDate.getDatesInRange(debut, fin);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasDate[i] = datas[i].dateOccupation;
                }
                for (let i = 0; i < arrayDate.length; i++) {
                    let data = datas.find((el) => new Date(el.dateOccupation).getDate() === new Date(arrayDate[i]).getDate());
                    if (data) {
                        datas = datas.filter((el) => new Date(el.dateOccupation).getDate() !== new Date(data.dateOccupation).getDate());
                        datas.push({
                            date: arrayDate[i].getDate() + "/" + Number(arrayDate[i].getMonth() + 1).toString(),
                            montant: Number(data.montant)
                        });
                    }
                    else {
                        datas.push({
                            date: arrayDate[i].getDate() + "/" + Number(arrayDate[i].getMonth() + 1).toString(),
                            montant: 0
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getDataForLineChartOccupationYearly(fkAgence, debut, fin) {
        let datas = [];
        let datasMois = [];
        try {
            datas = await this.prisma.$queryRaw(client_1.Prisma.sql `select month(occupation.dateCreate) as 'mois',SUM(detailoccupation.montantAPayer) as 'montant' from detailoccupation,occupation where detailoccupation.fkOccupation=occupation.code and occupation.fkAgence=${fkAgence} and status=${1} and (Date(occupation.dateCreate)>=${debut} and Date(occupation.dateCreate)<=${fin}) GROUP BY month(occupation.dateCreate) order by mois ASC`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasMois[i] = Number(datas[i].mois);
                }
                for (let i = 1; i < 13; i++) {
                    if (!datasMois.includes(i)) {
                        datas.push({
                            mois: utilsDate_1.mois[i - 1],
                            montant: 0,
                        });
                    }
                    else {
                        let data = datas.find((el) => el.mois == i);
                        datas = datas.filter((el) => el.mois != i);
                        datas.push({
                            mois: utilsDate_1.mois[i - 1],
                            montant: Number(data.montant),
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async createFacture(payload) {
        try {
            const [result, results] = await this.prisma.$transaction([
                this.prisma.$executeRaw `insert facture set code='',montantAPayer=${payload.montantAPayer},montantPaye=${payload.montantPaye},solde=${payload.solde},fkClientResponsable=${payload.fkClientResponsable},clientResponsable=${payload.clientResponsable},fkOccupation=${payload.fkOccupation},fkAgence=${payload.fkAgence},agence=${payload.agence},fkAgent=${payload.fkAgent},agent=${payload.agent},isPaid=${payload.isPaid},status=${1},dateCreate=${new Date()},date_edit=${payload.dateEdit}`,
                this.prisma.$queryRaw `select * from facture where fkAgence=${payload.fkAgence} order by code DESC limit 1`
            ]);
            return results[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async findLast(fkAgence) {
        let datas = [];
        try {
            const result = await this.prisma.$queryRaw(client_1.Prisma.sql `select * from occupation where fkAgence=${fkAgence} order by code DESC limit 1`);
            console.log(result);
            if (result != null && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    datas.push(result[i]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async findCountChambreByState(fkAgence) {
        let datas = [];
        try {
            const result = await this.prisma.$queryRaw(client_1.Prisma.sql `SELECT chambre.etat, COUNT(chambre.etat) as 'nombre' FROM chambre WHERE fkAgence=${fkAgence} GROUP BY chambre.etat`);
            console.log(result);
            if (result != null && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    datas.push({
                        etat: result[i].etat,
                        nombre: Number(result[i].nombre),
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async addDetailOccupation(payload) {
        return await this.dao.add(new detail_occupation_1.DetailOccupationModel(), payload);
    }
    async addDetailFacture(payload) {
        return await this.dao.add(new detail_facture_1.DetailFactureModel(), payload);
    }
    async updateDetailOccupation(payload) {
        return await this.dao.update(new detail_occupation_1.DetailOccupationModel(), payload);
    }
    async updateDetailFacture(payload) {
        return await this.dao.update(new detail_facture_1.DetailFactureModel(), payload);
    }
    async deleteDetailOccupation(payload) {
        return await this.dao.definitiveDelete(new detail_occupation_1.DetailOccupationModel(), payload);
    }
    async findAllByOccupation(fkOccupation) {
        return await this.dao.findWhere(new detail_occupation_1.DetailOccupationModel(), { fkOccupation: fkOccupation });
    }
    async findAllByFacture(fkFacture) {
        return await this.dao.findWhere(new detail_facture_1.DetailFactureModel(), { fkFacture: fkFacture });
    }
    async findAll() {
        return await this.dao.findAll(new occupation_1.OccupationModel());
    }
    async findAllByAgence(fkAgence, debut, fin) {
        return await this.dao.findWhere(new occupation_1.OccupationModel(), { fkAgence: fkAgence, status: true, dateCreate: { gte: debut, lte: fin } });
    }
    async find(payload) {
        return await this.dao.findUnique(new occupation_1.OccupationModel(), payload);
    }
    async findFacture(payload) {
        return await this.dao.findUnique(new facture_1.FactureModel(), payload);
    }
    async findFactureByOccupation(payload) {
        return await this.dao.findWhere(new facture_1.FactureModel(), { fkOccupation: payload });
    }
    async findDetail(payload) {
        return await this.dao.findUnique(new detail_occupation_1.DetailOccupationModel(), payload);
    }
    async findDetailFacture(payload) {
        return await this.dao.findUnique(new detail_facture_1.DetailFactureModel(), payload);
    }
    async findDataAubergeByClientAndPeriod(payload) {
        return await this.dao.findWhere(new occupation_1.OccupationModel(), { clientResponsable: payload.client, fkAgence: payload.fkAgence, dateCreate: { gte: payload.dateDebut, lte: payload.dateFin } });
    }
    async update(payload) {
        return await this.dao.update(new occupation_1.OccupationModel(), payload);
    }
    async updateFacture(payload) {
        return await this.dao.update(new facture_1.FactureModel(), payload);
    }
    async logicDelete(payload) {
        return await this.dao.logicDelete(new occupation_1.OccupationModel(), payload);
    }
    async definitiveDelete(payload) {
        return await this.dao.definitiveDelete(new occupation_1.OccupationModel(), payload);
    }
};
DaoOccupationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_generic_service_1.DaoGenericService, prisma_service_1.PrismaService])
], DaoOccupationService);
exports.DaoOccupationService = DaoOccupationService;
//# sourceMappingURL=dao.occupation.service.js.map