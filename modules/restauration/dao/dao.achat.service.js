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
var DaoAchatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoAchatService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../orm/prisma.service");
const achat_1 = require("../models/achat");
const commande_1 = require("../models/commande");
const detailAchat_1 = require("../models/detailAchat");
const detailCommande_1 = require("../models/detailCommande");
const constant_1 = require("../utilities/constant");
const ordreDeDecaissement_1 = require("../models/toReport/ordreDeDecaissement");
const bonDeDecaissement_1 = require("../models/toReport/bonDeDecaissement");
const fournisseur_1 = require("../models/fournisseur");
let DaoAchatService = DaoAchatService_1 = class DaoAchatService {
    constructor() {
    }
    static instance() {
        if (!DaoAchatService_1._instance) {
            DaoAchatService_1._instance = new DaoAchatService_1();
            DaoAchatService_1._prisma = new prisma_service_1.PrismaService();
        }
        return DaoAchatService_1._prisma;
    }
    async addCommande(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert commande set code='',montant_total=${payload.montant_total},dateCreate=${new Date()},dateEdit=${null},status=${1}, fkAgent = ${payload.fkAgent},agent=${payload.agent},fkAgence=${payload.fkAgence},agence=${payload.agence},etat=${constant_1.CommandeState.INIT},isAuberge=${payload.isAuberge},isTerasse=${payload.isTerasse}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where etat=${constant_1.CommandeState.INIT} order by code desc limit 1`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                obj.details = [];
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert detailcommande  set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},fkFournisseur=${payload.details[i].fkFournisseur},fournisseur=${payload.details[i].fournisseur},fkCommande=${obj.code},prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite}`);
                    detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  order by id desc limit 1`);
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async updateCommande(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set montant_total=${payload.montant_total},dateEdit=${new Date()},status=${1}, fkAgent = ${payload.fkAgent} where code=${payload.code} and etat=${constant_1.CommandeState.INIT}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update detailcommande  set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},fkFournisseur=${payload.details[i].fkFournisseur},fournisseur=${payload.details[i].fournisseur},prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite} where fkCommande=${obj.code} and id=${payload.details[i].id}`);
                    detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code} and id=${payload.details[i].id}`);
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async validateCommande(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set etat=${constant_1.CommandeState.VALIDE}, dateEdit=${new Date()} where code=${payload.code} and status=${true} and etat=${constant_1.CommandeState.INIT}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${payload.code} and etat=${constant_1.CommandeState.VALIDE}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code}`);
                for (let i = 0; i < details.length; i++) {
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(details[i]));
                }
                console.log(payload.ordreDeDecaissement);
                let ordre = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert ordrededecaissement set code='',montant=${obj.montant_total},dateCreate=${new Date()},fkDocumentSoubassement=${obj.code},fkAgentEmitter=${obj.fkAgent},agentEmitter=${obj.agent},fkAgentReceiver=${payload.ordreDeDecaissement.fkAgentReceiver},agentReceiver=${payload.ordreDeDecaissement.agentReceiver},motif=${payload.ordreDeDecaissement.motif},isValidateByCoordon=${false},status=${1}, lieuEmission = ${payload.ordreDeDecaissement.lieuEmission},agence=${obj.agence},fkAgence=${obj.fkAgence},isAuberge=${payload.ordreDeDecaissement.isAuberge},isTerasse=${payload.ordreDeDecaissement.isTerasse}`);
                console.log(ordre);
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async validateCommandeByCoordon(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set etat=${constant_1.CommandeState.VALIDE}, dateEdit=${new Date()} where code=${payload.code} and status=${true} and etat=${constant_1.CommandeState.VALIDE}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${payload.code} and etat=${constant_1.CommandeState.VALIDE}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code}`);
                for (let i = 0; i < details.length; i++) {
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(details[i]));
                }
                let ordSent = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${obj.code}`);
                let ordre = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update ordrededecaissement set isValidateByCoordon=${true} where code=${ordSent[0].code}`);
                ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${obj.code}`);
                obj.ordreDeDecaissement = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(ordre[0]);
                console.log(ordre);
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async annulerCommande(payload) {
        let obj = null;
        try {
            console.log(payload);
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set etat=${constant_1.CommandeState.ANNULE},dateEdit=${new Date()} where code=${payload.code} and status=${true} and (etat=${constant_1.CommandeState.INIT} or etat=${constant_1.CommandeState.VALIDE})`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${payload.code} and etat=${constant_1.CommandeState.ANNULE}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                let detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code}`);
                for (let i = 0; i < detail.length; i++) {
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(detail[i]));
                }
                let bon = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where fkDocSoubassement=${obj.code}`);
                let ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${obj.code}`);
                if (bon.length === 0 && obj.etat === constant_1.CommandeState.DECAISSE) {
                    throw "Aucun bon de decaissement pour cette commande";
                }
                if (ordre.length === 0 && obj.etat === constant_1.CommandeState.VALIDE) {
                    throw "Aucun ordre de decaissement pour cette commande";
                }
                console.log(ordre[0]);
                console.log(bon[0]);
                if (payload.etat === constant_1.CommandeState.DECAISSE) {
                    let bonDeDecaissement = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update bondedecaissement set status=${false} where code=${bon[0].code}`);
                }
                if (payload.etat === constant_1.CommandeState.VALIDE) {
                    let ordreDeDecaissement = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update ordrededecaissement set status=${false} where code=${ordre[0].code}`);
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async decaisserCommande(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set etat=${constant_1.CommandeState.DECAISSE}, dateEdit=${new Date()} where code=${payload.code} and status=${true} and etat=${constant_1.CommandeState.VALIDE}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${payload.code} and etat=${constant_1.CommandeState.DECAISSE}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                obj.details = [];
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code}`);
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(detail[0]));
                }
                let ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${obj.code}`);
                if (ordre == null && ordre.length === 0) {
                    throw "Aucun ordre de decaissement pour cette commande";
                }
                obj.ordreDeDecaissement = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(ordre[0]);
                let bonDeDecaissement = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert bondedecaissement set code='',montant=${obj.montant_total},dateCreate=${new Date()},fkDocSoubassement=${obj.code},fkAgent=${payload.bonDeDecaissement.fkAgent},agent=${payload.bonDeDecaissement.agent},fkAgence=${payload.bonDeDecaissement.fkAgence},agence=${payload.bonDeDecaissement.agence},fkOrdre=${ordre[0].code},motif=${ordre[0].motif},status=${1},etat=${constant_1.BonDeDecaissementState.INIT},isAuberge=${payload.bonDeDecaissement.isAuberge},isTerasse=${payload.bonDeDecaissement.isTerasse}`);
                bonDeDecaissement = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where fkDocSoubassement=${obj.code}`);
                if (bonDeDecaissement === null && bonDeDecaissement.length === 0) {
                    throw "Aucun bon de decaissement pour cette commande";
                }
                obj.bonDeDecaissement = bonDeDecaissement_1.BonDeDecaissementModel.fromEntity(bonDeDecaissement[0]);
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getCommande(code) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${code}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${code}`);
                obj.details.push(result);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getLastCommande(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and year(dateCreate)=year(now()) and etat=${"INIT"} order by code DESC limit 1`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllCommande(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} order by code DESC limit 100`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllInitCommande(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and etat=${constant_1.CommandeState.INIT} order by code DESC limit 50`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    datas[i].ordreDeDecaissement = new ordreDeDecaissement_1.OrdreDeDecaissementModel();
                    datas[i].ordreDeDecaissement.fkDocumentSoubassement = datas[i].code;
                    datas[i].ordreDeDecaissement.agentEmitter = datas[i].agent;
                    datas[i].ordreDeDecaissement.fkAgentEmitter = datas[i].fkAgent;
                    datas[i].ordreDeDecaissement.agentReceiver = "";
                    datas[i].ordreDeDecaissement.fkAgentReceiver = "";
                    datas[i].ordreDeDecaissement.lieuEmission = "";
                    datas[i].ordreDeDecaissement.motif = "";
                    datas[i].ordreDeDecaissement.dateCreate = new Date();
                    datas[i].ordreDeDecaissement.montant = datas[i].montant_total;
                    datas[i].ordreDeDecaissement.status = true;
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllAnnuleCommande(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and etat=${constant_1.CommandeState.ANNULE} order by code DESC limit 50`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    datas[i].ordreDeDecaissement = new ordreDeDecaissement_1.OrdreDeDecaissementModel();
                    datas[i].ordreDeDecaissement.fkDocumentSoubassement = datas[i].code;
                    datas[i].ordreDeDecaissement.agentEmitter = datas[i].agent;
                    datas[i].ordreDeDecaissement.fkAgentEmitter = datas[i].fkAgent;
                    datas[i].ordreDeDecaissement.agentReceiver = "";
                    datas[i].ordreDeDecaissement.fkAgentReceiver = "";
                    datas[i].ordreDeDecaissement.lieuEmission = "";
                    datas[i].ordreDeDecaissement.motif = "";
                    datas[i].ordreDeDecaissement.dateCreate = new Date();
                    datas[i].ordreDeDecaissement.montant = datas[i].montant_total;
                    datas[i].ordreDeDecaissement.status = true;
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllValideCommande(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and etat=${constant_1.CommandeState.VALIDE} order by code DESC limit 100`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${datas[i].code} and status=${1} order by code DESC limit 50`);
                    datas[i].ordreDeDecaissement = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(ordre[0]);
                    let bon = new bonDeDecaissement_1.BonDeDecaissementModel();
                    datas[i].bonDeDecaissement = bon;
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllValideCommandeByPeriod(fkAgence, debut, fin) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and etat=${constant_1.CommandeState.VALIDE} and (Date(commande.dateCreate)>=${debut} and Date(commande.dateCreate)<=${fin}) order by code DESC limit 100`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${datas[i].code} and status=${1} order by code DESC limit 50`);
                    datas[i].ordreDeDecaissement = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(ordre[0]);
                    let bon = new bonDeDecaissement_1.BonDeDecaissementModel();
                    datas[i].bonDeDecaissement = bon;
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllValideCommandeWithoutAgence() {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where status=${1} and etat=${constant_1.CommandeState.VALIDE} order by code DESC limit 50`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${datas[i].code} and status=${1} order by code DESC limit 50`);
                    datas[i].ordreDeDecaissement = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(ordre[0]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
                    for (let j = 0; j < details.length; j++) {
                        datas[i].details.push(details[j]);
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
    async getAllDecaisseCommande(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and etat=${constant_1.CommandeState.DECAISSE} order by code DESC limit 50`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let bonDD = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where fkDocSoubassement=${datas[i].code} and status=${1} order by code DESC limit 50`);
                    datas[i].bonDeDecaissement = bonDeDecaissement_1.BonDeDecaissementModel.fromEntity(bonDD[0]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getAllCommandeByPeriodAndEtat(fkAgence, etat, debut, fin) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where fkAgence=${fkAgence} and status=${1} and etat=${etat} and (Date(commande.dateCreate)>=${debut} and Date(commande.dateCreate)<=${fin}) order by dateCreate DESC limit 100`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let ordre = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkDocumentSoubassement=${datas[i].code} and status=${1} order by code DESC limit 50`);
                    if (ordre.length > 0 && ordre != null) {
                        datas[i].ordreDeDecaissement = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(ordre[0]);
                    }
                    else {
                        datas[i].ordreDeDecaissement = null;
                    }
                    let bonDD = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where fkDocSoubassement=${datas[i].code} and status=${1} order by code DESC limit 50`);
                    if (bonDD.length > 0 && bonDD != null) {
                        datas[i].bonDeDecaissement = bonDeDecaissement_1.BonDeDecaissementModel.fromEntity(bonDD[0]);
                    }
                    else {
                        datas[i].bonDeDecaissement = null;
                    }
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async getCommandeByState(state) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where etat=${state} order by code DESC limit 50`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getCommandeByPeriod(debut, fin) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where dateCreate<=${fin} and dateCreate>=${debut} and status=${1} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getCommandeByPeriodAndState(debut, fin, state) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where etat=${state} and dateCreate<=${fin} and dateCreate>=${debut} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getCommandeByBDD(codeBdd, agence) {
        let datas = [];
        try {
            let bon = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where code=${codeBdd} and fkAgence=${agence} and etat=${"INIT"} order by code desc limit 1`);
            let oDD = null;
            if (bon != null && bon.length > 0) {
                datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${bon[0].fkDocSoubassement}  order by code desc limit 1`);
            }
            if (datas != null && datas.length > 0) {
                oDD = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where code=${bon[0].fkOrdre}  order by code desc limit 1`);
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = commande_1.CommandeModel.fromEntity(datas[i]);
                    datas[i].bonDeDecaissement = bon[0];
                    datas[i].ordreDeDecaissement = oDD[0];
                    datas[i].details = [];
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${datas[i].code}`);
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
    async logicDeleteCommande(code) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set status=${0},etat=${constant_1.CommandeState.ANNULE},dateEdit=${new Date()} where code=${code} and etat={CommandeState.INIT}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${code}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async definitiveDeleteCommande(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update commande set status=${0} where code=${payload.code}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from commande where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = commande_1.CommandeModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code}`);
                    obj.details.push(detailCommande_1.DetailCommandeModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllBonDeDecaissement(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where fkAgence=${fkAgence} and status=${1} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = bonDeDecaissement_1.BonDeDecaissementModel.fromEntity(datas[i]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllBonDeDecaissementByPeriod(fkAgence, debut, fin) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where fkAgence=${fkAgence} and status=${1} and (bondedecaissement.dateCreate>=${debut} and bondedecaissement.dateCreate<=${fin}) order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = bonDeDecaissement_1.BonDeDecaissementModel.fromEntity(datas[i]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllOrdreDeDecaissement(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkAgence=${fkAgence} and status=${1} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(datas[i]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllOrdreDeDecaissementByPeriod(fkAgence, debut, fin) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from ordrededecaissement where fkAgence=${fkAgence} and status=${1} and (Date(ordrededecaissement.dateCreate)>=${debut} and Date(ordrededecaissement.dateCreate)<=${fin}) order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = ordreDeDecaissement_1.OrdreDeDecaissementModel.fromEntity(datas[i]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async addAchat(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert achat set code='',montant_total=${payload.montant_total},dateCreate=${new Date()},dateEdit=${new Date()},status=${1}, fkAgent = ${payload.fkAgent},agent=${payload.agent},agence=${payload.agence},fkAgence=${payload.fkAgence},etat=${constant_1.AchatState.INIT},fkBonDecaissement=${payload.fkBonDecaissement},fkCommande=${payload.fkCommande}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where etat=${constant_1.AchatState.INIT} order by code desc limit 1`);
            if (result != null && result.length > 0) {
                obj = achat_1.AchatModel.fromEntity(result[0]);
                obj.details = [];
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert detailachat  set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},fkFournisseur=${payload.details[i].fkFournisseur},fournisseur=${payload.details[i].fournisseur},fkAchat=${obj.code},prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite}`);
                    detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  order by id desc limit 1`);
                    obj.details.push(detailAchat_1.DetailAchatModel.fromEntity(detail[0]));
                }
                let bon = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from bondedecaissement where code=${payload.fkBonDecaissement} and status=${true}`);
                if (bon.length == 0) {
                    throw "Aucun bon de decaissement pour cette commande";
                }
                bon = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `update bondedecaissement set etat=${constant_1.BonDeDecaissementState.APURE} where code=${bon[0].code}`);
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async updateAchat(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update achat set montant_total=${payload.montant_total},dateEdit=${new Date()},status=${1}, fkAgent = ${payload.fkAgent} where code=${payload.code} and etat=${constant_1.AchatState.INIT}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = achat_1.AchatModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update detailachat  set fkArticle=${payload.details[i].fkArticle},article=${payload.details[i].article},fkFournisseur=${payload.details[i].fkFournisseur},fournisseur=${payload.details[i].fournisseur},prix_unitaire=${payload.details[i].prix_unitaire},quantite=${payload.details[i].quantite} where fkAchat=${obj.code} and id=${payload.details[i].id}`);
                    detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${obj.code} and id=${payload.details[i].id}`);
                    obj.details.push(detailAchat_1.DetailAchatModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async clotureAchat(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update achat set etat=${constant_1.AchatState.CLOTURE} where code=${payload.code} and status=${true}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = achat_1.AchatModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${obj.code} and id=${payload.details[i].id}`);
                    obj.details.push(detailAchat_1.DetailAchatModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getAchat(code) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where code=${code}`);
            if (result != null && result.length > 0) {
                obj = achat_1.AchatModel.fromEntity(result[0]);
                result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${code}`);
                obj.details.push(result);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllAchat(fkAgence) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where fkAgence=${fkAgence} order by code DESC limit 100`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = achat_1.AchatModel.fromEntity(datas[i]);
                    datas[i].details = [];
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${datas[i].code}`);
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
    async getAchatByState(state) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where etat=${state} order by code DESC limit 50`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = achat_1.AchatModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAchatByPeriod(debut, fin) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where dateCreate<=${fin} and dateCreate>=${debut} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = achat_1.AchatModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAchatByPeriodAndState(debut, fin, state) {
        let datas = [];
        try {
            datas = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where etat=${state} and dateCreate<=${fin} and dateCreate>=${debut} order by code`);
            if (datas != null && datas.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    datas[i] = achat_1.AchatModel.fromEntity(datas[i]);
                    let details = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailachat  where fkAchat=${datas[i].code}`);
                    datas[i].details.push(details);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async logicDeleteAchat(code) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update achat set status=${0} where code=${code}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where code=${code}`);
            obj = achat_1.AchatModel.fromEntity(result[0]);
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async definitiveDeleteAchat(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update achat set status=${0} where code=${payload.code}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from achat where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = achat_1.AchatModel.fromEntity(result[0]);
                for (let i = 0; i < payload.details.length; i++) {
                    let detail = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from detailcommande  where fkCommande=${obj.code}`);
                    obj.details.push(detailAchat_1.DetailAchatModel.fromEntity(detail[0]));
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async addFournisseur(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `insert fournisseur set code='',nom=${payload.nom.toUpperCase()},postnom=${payload.postnom.toUpperCase()},prenom=${payload.prenom.toUpperCase()},societe=${payload.societe.toUpperCase()},tel=${payload.tel},mail=${payload.mail},adresse=${payload.adresse},status=${true},dateCreate=${new Date()},rccm=${payload.rccm.toUpperCase()},idNat=${payload.idNat.toUpperCase()}`);
            console.log(result);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur order by code desc limit 1`);
            if (result != null && result.length > 0) {
                obj = fournisseur_1.FournisseurModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        console.log(obj);
        return obj;
    }
    async getFournisseur(code) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur where code=${code} order by code desc limit 1`);
            if (result != null && result.length > 0) {
                obj = fournisseur_1.FournisseurModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllFournisseur() {
        let datas = [];
        try {
            let result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur order by code`);
            if (result != null && result.length > 0) {
                datas = result;
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async deleteFournisseur(code) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update fournisseur set status=${false} where code=${code}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur where code=${code}`);
            if (result != null && result.length > 0) {
                obj = fournisseur_1.FournisseurModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async updateFournisseur(payload) {
        let obj = null;
        try {
            let result = await DaoAchatService_1.instance().$executeRaw(client_1.Prisma.sql `update fournisseur set nom=${payload.nom === "" ? null : payload.nom},postnom=${payload.postnom === "" ? null : payload.postnom},prenom=${payload.prenom === "" ? null : payload.prenom},societe=${payload.societe === "" ? null : payload.societe},tel=${payload.tel === "" ? null : payload.tel},adresse=${payload.adresse} where code=${payload.code}`);
            result = await DaoAchatService_1.instance().$queryRaw(client_1.Prisma.sql `select * from fournisseur where code=${payload.code}`);
            if (result != null && result.length > 0) {
                obj = fournisseur_1.FournisseurModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
};
DaoAchatService = DaoAchatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DaoAchatService);
exports.DaoAchatService = DaoAchatService;
//# sourceMappingURL=dao.achat.service.js.map