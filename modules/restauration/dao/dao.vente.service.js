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
var DaoVenteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoVenteService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const dao_common_servise_1 = require("../../common/dao/dao.common.servise");
const prisma_service_1 = require("../../../orm/prisma.service");
const constant_1 = require("../../../utilities/constant");
const utilsDate_1 = require("../../../utilities/utilsDate");
const app_utilities_1 = require("../../../utilities/app.utilities");
const detailVente_1 = require("../models/detailVente");
const factureRestaurent_1 = require("../models/factureRestaurent");
const fournisseur_1 = require("../models/fournisseur");
const vente_1 = require("../models/vente");
const constant_2 = require("../utilities/constant");
const table_1 = require("../models/table");
let DaoVenteService = DaoVenteService_1 = class DaoVenteService {
    constructor() { }
    static instance() {
        if (!DaoVenteService_1._instance) {
            DaoVenteService_1._instance = new DaoVenteService_1();
            DaoVenteService_1._prisma = new prisma_service_1.PrismaService();
            DaoVenteService_1._daoCommonService = new dao_common_servise_1.DaoCommonService();
        }
        return DaoVenteService_1._prisma;
    }
    async addVente(payload) {
        let obj = null;
        try {
            let tauxChange = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tauxchange order by code desc limit 1`);
            let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert vente  set code='',dateCreate=${new Date()},typeVente=${payload.typeVente},nombre_personne=${payload.nombre_personne},
            fkClient=${payload.fkClient},client=${payload.client},montant_total=${payload.montant_total},fkAgence=${payload.fkAgence},agence=${payload.agence},isPaid=${payload.typeVente === constant_1.TypeVente.COMPTANT ? true : false},
            fkAgent=${payload.fkAgent},agent=${payload.agent},status=${1},venteService=${payload.venteService},
            fkTable=${payload.fkTable},designation_table=${payload.designation_table}`);
            result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where agence=${payload.agence} order by code desc limit 1`);
            obj = vente_1.VenteModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion de la vente");
            let tva = (Number(obj.montant_total) * constant_2.TAUX.tauxTva) / 100;
            if (obj.typeVente === constant_1.TypeVente.COMPTANT) {
                let facture = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert facturerestaurent set code='',dateCreate=${new Date()},status=${1},montantHorsTaxe=${obj.montant_total},tva=${tva},montantTTC=${obj.montant_total},montantPaye=${obj.montant_total},solde=${0},fkVente=${obj.code},fkAgent=${obj.fkAgent},agent=${obj.agent},fkAgence=${payload.fkAgence},agence=${payload.agence},venteService=${obj.venteService},fkTaux=${tauxChange[0].code},taux=${tauxChange[0].taux}`);
                facture = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkAgence=${payload.fkAgence} and fkVente=${obj.code} order by code desc limit 1`);
                let paiement = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert paiement set numTransaction='',libelle=${"Paiement de " + facture[0].montantHorsTaxe + " de la facture " + facture[0].code},transactionDate=${new Date()},status=${1},transactionMontant=${facture[0].montantHorsTaxe},transactionDevise=${"CDF"},montantConverti=${Number(facture[0].montantHorsTaxe) / Number(tauxChange[0].taux)},deviseConversion=${"USD"},typePaiement=${"Liquide"},taux=${tauxChange[0].taux},fkAgent=${obj.fkAgent},agent=${obj.agent},fkAgence=${obj.fkAgence},agence=${obj.agence},fkFacture=${facture[0].code},fkCompte=${"Compte Courant"},fkTransanctionCentre=${obj.venteService}`);
                obj.facture = factureRestaurent_1.factureRestaurentModel.fromEntity(facture[0]);
            }
            else {
                let facture = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert facturerestaurent set code='',dateCreate=${new Date()},status=${1},montantHorsTaxe=${obj.montant_total},tva=${tva},montantTTC=${obj.montant_total},montantPaye=${0},solde=${obj.montant_total},fkVente=${obj.code},fkAgent=${obj.fkAgent},agent=${obj.agent},fkAgence=${payload.fkAgence},agence=${payload.agence},venteService=${obj.venteService},fkTaux=${tauxChange[0].code},taux=${tauxChange[0].taux}`);
                facture = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkAgence=${payload.fkAgence} order by code desc limit 1`);
                obj.facture = factureRestaurent_1.factureRestaurentModel.fromEntity(facture[0]);
            }
            if (payload.details.length > 0) {
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert detailvente set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},fkVente=${obj.code},
                    prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite}`);
                    let detailFact = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert detailfacturerestaurent set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},fkFacture=${obj.facture === null ? "" : obj.facture.code},
                    prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite}`);
                    detail = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente order by id desc limit 1`);
                    obj.details.push(detailVente_1.DetailVenteModel.fromEntity(detail[0]));
                }
            }
            console.log(obj);
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async updateVente(payload) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update vente  set montant_total=${payload.montant_total},status=${1}, fkAgent = ${payload.fkAgent} where code=${payload.code} and status=${1},isPaid=${payload.isPaid}`);
            result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = vente_1.VenteModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update detailvente set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite} where fkVente=${obj.code} and id=${payload.details[i].id}`);
                    detail = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${obj.code} and id=${payload.details[i].id}`);
                    obj.details.push(detailVente_1.DetailVenteModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async payerVente(payload) {
        let obj = null;
        try {
            let tauxChange = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tauxchange order by code desc limit 1`);
            if (!payload.vente.isPaid) {
                let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update vente  set isPaid=${payload.vente.facture.solde <= payload.montant ? 1 : 0} where code=${payload.vente.code} and status=${1}`);
                result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where code=${payload.vente.code}`);
                let solde = Number(payload.vente.facture.solde) - Number(payload.montant);
                let cummul = Number(payload.vente.facture.montantPaye) + Number(payload.montant);
                let facture = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update facturerestaurent set montantPaye=${cummul},dateEdit=${new Date()},solde=${solde},status=${1} where code=${payload.vente.facture.code} and status=${1}`);
            }
            let result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where code=${payload.vente.code}`);
            if (result != null && result.length > 0) {
                obj = vente_1.VenteModel.fromEntity(result[0]);
                let factureObj = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkVente=${obj.code}`);
                let paiement = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert paiement set numTransaction='',libelle=${"Paiement de " + payload.montant + " de la facture " + factureObj[0].code},transactionDate=${new Date()},status=${1},transactionMontant=${payload.montant},transactionDevise=${"CDF"},montantConverti=${Number(payload.montant) / Number(tauxChange[0].taux)},deviseConversion=${"USD"},typePaiement=${"Liquide"},taux=${tauxChange[0].taux},fkAgent=${obj.fkAgent},agent=${obj.agent},fkAgence=${obj.fkAgence},agence=${obj.agence},fkFacture=${factureObj[0].code},fkCompte=${"Compte Courant"},fkTransanctionCentre=${obj.venteService}`);
                obj.facture = factureRestaurent_1.factureRestaurentModel.fromEntity(factureObj[0]);
                obj.details = [];
                for (let i = 0; i < payload.vente.details.length; i++) {
                    let detail = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update detailvente set fkArticle=${payload.vente.details[i].fkArticle},article=${payload.vente.details[i].article},prix_unitaire=${payload.vente.details[i].prix_unitaire},quantite=${payload.vente.details[i].quantite} where fkVente=${obj.code} and id=${payload.vente.details[i].id}`);
                    detail = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${obj.code} and id=${payload.vente.details[i].id}`);
                    obj.details.push(detailVente_1.DetailVenteModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getVente(code) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where code=${code}`);
            if (result != null && result.length > 0) {
                obj = vente_1.VenteModel.fromEntity(result[0]);
                result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${code}`);
                obj.details.push(result);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getVenteByClientOrPeriod(client, fkAgence, dateDebut, dateFin) {
        let datas = [];
        try {
            dateDebut = new Date(dateDebut);
            dateFin = new Date(dateFin);
            dateDebut = new Date(dateDebut.getFullYear(), dateDebut.getMonth(), dateDebut.getDate(), 0, 0, 0);
            dateFin = new Date(dateFin.getFullYear(), dateFin.getMonth(), dateFin.getDate(), 23, 59, 59);
            console.log(dateDebut, dateFin);
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where client=${client} and fkAgence=${fkAgence} and status=${true} and (dateCreate>=${dateDebut} and dateCreate<=${dateFin}) order by code DESC LIMIT 100`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    let details = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${datas[i].code}`);
                    let facture = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkVente=${datas[i].code}`);
                    datas[i].facture = factureRestaurent_1.factureRestaurentModel.fromEntity(facture[0]);
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    for (let j = 0; j < details.length; j++) {
                        let detail = detailVente_1.DetailVenteModel.fromEntity(details[j]);
                        datas[i].details.push(detail);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        console.log(datas);
        return datas;
    }
    async getAllVente(fkAgence, venteService, debut, fin) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where fkAgence=${fkAgence} and venteService=${venteService} and status=${1} and (Date(dateCreate)>=${debut} and Date(dateCreate)<=${fin}) order by code DESC limit 200`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    let details = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${datas[i].code}`);
                    let facture = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkVente=${datas[i].code}`);
                    datas[i].facture = factureRestaurent_1.factureRestaurentModel.fromEntity(facture[0]);
                    for (let j = 0; j < details.length; j++) {
                        datas[i].details.push(details[j]);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getDataForPieChartArticle(fkAgence, venteService, debut, fin) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select detailvente.article,SUM(detailvente.quantite) as 'quantite' from detailvente,vente  where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin}) GROUP BY detailvente.article order by detailvente.article DESC limit 200`);
            if (datas != null && datas.length > 0) {
                let totalQuery = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select SUM(detailvente.quantite) as 'total' from detailvente,vente  where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin})`);
                let total = Number(totalQuery[0].total);
                for (let i = 0; i < datas.length; i++) {
                    datas[i].quantite = Number(datas[i].quantite);
                    datas[i].percent = (Number(datas[i].quantite) * total) / 100;
                    datas[i].total = total;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getDataForLineChartVenteDaily(fkAgence, venteService, debut, fin) {
        let datas = [];
        let datasHeure = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select hour(vente.dateCreate) as 'heure',SUM(detailvente.quantite*detailvente.prix_unitaire) as 'montant' from detailvente,vente  where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin}) GROUP BY hour(vente.dateCreate) order by heure ASC`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasHeure[i] = Number(datas[i].heure);
                }
                let totalQuery = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select SUM(detailvente.quantite) as 'total' from detailvente,vente  where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin})`);
                let total = Number(totalQuery[0].total);
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
    async getDataForLineChartVenteWeekly(fkAgence, venteService, debut, fin) {
        let datas = [];
        let datasDate = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select Date(vente.dateCreate) as 'dateVente', sum(detailvente.quantite*detailvente.prix_unitaire) as 'montant' from vente,detailvente where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin}) GROUP BY Date(vente.dateCreate) order by datevente  ASC`);
            let arrayDate = [];
            arrayDate = utilsDate_1.UtilDate.getDatesInRange(debut, fin);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasDate[i] = datas[i].dateVente;
                }
                for (let i = 0; i < arrayDate.length; i++) {
                    let data = datas.find((el) => new Date(el.dateVente).getDate() === new Date(arrayDate[i]).getDate());
                    if (data) {
                        datas = datas.filter((el) => new Date(el.dateVente).getDate() !== new Date(data.dateVente).getDate());
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
    async getDataForLineChartVenteMonthly(fkAgence, venteService, debut, fin) {
        let datas = [];
        let datasDate = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select date(vente.dateCreate) as 'dateVente', sum(detailvente.quantite*detailvente.prix_unitaire) as 'montant' from vente,detailvente where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin}) GROUP BY Date(vente.dateCreate) order by datevente  ASC`);
            let arrayDate = [];
            arrayDate = utilsDate_1.UtilDate.getDatesInRange(debut, fin);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasDate[i] = datas[i].dateVente;
                }
                for (let i = 0; i < arrayDate.length; i++) {
                    let data = datas.find((el) => new Date(el.dateVente).getDate() === new Date(arrayDate[i]).getDate());
                    if (data) {
                        datas = datas.filter((el) => new Date(el.dateVente).getDate() !== new Date(data.dateVente).getDate());
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
    async getDataForLineChartVenteYearly(fkAgence, venteService, debut, fin) {
        let datas = [];
        let datasMois = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select month(vente.dateCreate) as 'mois',SUM(detailvente.quantite*detailvente.prix_unitaire) as 'montant' from detailvente,vente  where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin}) GROUP BY month(vente.dateCreate) order by mois ASC`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datasMois[i] = Number(datas[i].mois);
                }
                let totalQuery = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select SUM(detailvente.quantite) as 'total' from detailvente,vente  where detailvente.fkVente=vente.code and vente.fkAgence=${fkAgence} and vente.venteService=${venteService} and status=${1} and (Date(vente.dateCreate)>=${debut} and Date(vente.dateCreate)<=${fin})`);
                let total = Number(totalQuery[0].total);
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
    async getLastVente(fkAgence, venteService) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where fkAgence=${fkAgence} and venteService=${venteService} and status=${1} order by code DESC limit 1`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    let details = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${datas[i].code}`);
                    let facture = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkVente=${datas[i].code}`);
                    datas[i].facture = factureRestaurent_1.factureRestaurentModel.fromEntity(facture[0]);
                    for (let j = 0; j < details.length; j++) {
                        datas[i].details.push(details[j]);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllVentePaid(fkAgence) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where fkAgence=${fkAgence} and status=${1} and isPaid=${1} order by code DESC limit 200`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    let details = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllVenteNoPaid(fkAgence) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where fkAgence=${fkAgence} and status=${1} and isPaid=${0} order by code DESC limit 200`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    let details = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getVenteByPeriod(debut, fin) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where dateCreate<=${fin} and dateCreate>=${debut} and status=${1} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = vente_1.VenteModel.fromEntity(datas[i]);
                    let details = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async logicDeleteVente(code) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update vente  set status=${0} where code=${code}`);
            result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where code=${code}`);
            if (result != null && result.length > 0) {
                obj = vente_1.VenteModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async definitiveDeleteVente(payload) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `update vente  set status=${0} where code=${payload.code}`);
            result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from vente  where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = vente_1.VenteModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailvente where fkVente=${obj.code}`);
                    obj.details.push(detailVente_1.DetailVenteModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getFactureRestaurentByVente(fkVente) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from facturerestaurent where fkVente=${fkVente}`);
            obj = result.length !== 0 ? factureRestaurent_1.factureRestaurentModel.fromEntity(result[0]) : null;
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async addFournisseur(payload) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert fournisseur set code='',nom=${payload.nom},postnom=${payload.postnom},
              prenom=${payload.prenom},societe=${payload.societe},tel=${payload.tel},mail=${payload.mail},
              adresse=${payload.adresse}`);
            result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur order by code desc limit 1`);
            if (result === null || result.length === 0) {
                throw "Erreur";
            }
            obj = fournisseur_1.FournisseurModel.fromEntity(result[0]);
            return obj;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAllFournisseur() {
        let datas = [];
        try {
            let result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur order by code desc limit`);
            datas = result;
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async addTable(payload) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$executeRaw(client_1.Prisma.sql `insert tablehotel  set code='',designation='',dateCreate=${new Date()},status=${true},fkAgent = ${payload.fkAgent},agent = ${payload.agent},fkAgence=${payload.fkAgence},agence=${payload.agence}`);
            result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tablehotel  where agence=${payload.agence} order by code desc limit 1`);
            obj = table_1.TableModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion de l'article");
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getTable(code) {
        let obj = null;
        try {
            let result = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tablehotel  where code=${code}`);
            if (result != null && result.length > 0) {
                obj = table_1.TableModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllTable(fkAgence) {
        let datas = [];
        try {
            datas = await DaoVenteService_1.instance().$queryRaw(client_1.Prisma.sql `select * from tablehotel  where fkAgence=${fkAgence} and status=${1} order by designation asc limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
};
DaoVenteService = DaoVenteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DaoVenteService);
exports.DaoVenteService = DaoVenteService;
//# sourceMappingURL=dao.vente.service.js.map