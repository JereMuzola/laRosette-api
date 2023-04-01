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
exports.OccupationService = void 0;
const common_1 = require("@nestjs/common");
const paiement_1 = require("../../restauration/models/paiement");
const app_error_const_1 = require("../../../utilities/app.error.const");
const app_utilities_1 = require("../../../utilities/app.utilities");
const constant_1 = require("../../../utilities/constant");
const error_1 = require("../../../utilities/error");
const utilsDate_1 = require("../../../utilities/utilsDate");
const value_data_exception_1 = require("../../../utilities/value.data.exception");
const dao_chambre_service_1 = require("../dao/dao.chambre.service");
const dao_occupation_service_1 = require("../dao/dao.occupation.service");
const detail_facture_1 = require("../models/detail.facture");
const facture_1 = require("../models/facture");
let OccupationService = class OccupationService {
    constructor(dao, daoChambre) {
        this.dao = dao;
        this.daoChambre = daoChambre;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addOccupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            let data = await this.calculateMontantTotal(payload.details, payload);
            obj = await this.dao.create(data.occupation);
            let facture = new facture_1.FactureModel();
            facture.agence = obj.agence;
            facture.fkAgence = obj.fkAgence;
            facture.fkAgent = obj.fkAgent;
            facture.agent = obj.agent;
            facture.clientResponsable = obj.clientResponsable;
            facture.fkClientResponsable = obj.fkClientResponsable;
            facture.fkOccupation = obj.code;
            facture.isPaid = obj.typeOccupation === constant_1.TypeOccupation.PI;
            facture.dateEdit = null;
            facture.montantAPayer = obj.montantAPayer;
            let paiement = new paiement_1.PaiementModel();
            if (obj.typeOccupation === constant_1.TypeOccupation.PD) {
                facture.montantPaye = 0;
                facture.solde = obj.montantAPayer;
                facture = await this.dao.createFacture(facture);
            }
            else {
                facture.solde = 0;
                facture.montantPaye = obj.montantAPayer;
                paiement.agence = facture.agence;
                paiement.agent = facture.agent;
                paiement.deviseConversion = "CDF";
                paiement.fkAgence = facture.fkAgence;
                paiement.fkAgent = facture.fkAgent;
                paiement.fkCompte = "Compte courant";
                paiement.fkTransactionCentre = "AUBEGE";
                paiement.montantConverti = 0;
                paiement.taux = 0;
                paiement.transactionDevise = "USD";
                paiement.transactionMontant = facture.montantPaye;
                paiement.typePaiement = "Liquide";
                facture = await this.dao.createFacture(facture);
                paiement.fkFacture = facture.code;
                paiement.libelle = "paiement de la facture " + facture.code;
                paiement = await this.dao.createPaiement(paiement);
                console.log(paiement);
            }
            obj.details = [];
            obj.facture = facture;
            facture.details = [];
            if (obj == null) {
                throw 'Il y a un problème';
            }
            for (let i = 0; i < data.details.length; i++) {
                let chambre = await this.daoChambre.find(data.details[i].fkChambre);
                let detail = new detail_facture_1.DetailFactureModel();
                if (chambre !== null) {
                    chambre.etat = constant_1.EtatChambre.OCCUPE;
                    chambre = await this.daoChambre.update(chambre);
                    if (chambre === null) {
                        throw "Erreur";
                    }
                    console.log(chambre);
                }
                data.details[i].fkOccupation = obj.code;
                let nbreNuitee = Number(utilsDate_1.UtilDate.differenceDay(new Date(data.details[i].dateDepart), new Date(data.details[i].dateArrive)));
                detail.fkFacture = facture.code;
                detail.clientOccupant = data.details[i].client;
                detail.fkClientOccupant = data.details[i].fkClient;
                detail.fkChambre = data.details[i].fkChambre;
                detail.numChambre = data.details[i].numChambre;
                detail.montant = Number(Number(chambre.prix) * Number(nbreNuitee));
                obj.details.push(await this.dao.addDetailOccupation(data.details[i]));
                facture.details.push(await this.dao.addDetailFacture(detail));
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "occupation enregistrée avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème lors de l'insertion";
            console.log(error);
        }
        return obj;
    }
    async payerOccupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.payerOccupation(payload);
            if (obj === null) {
                this.error.errorCode = error_1.ErrorResponseStatus.KO;
                this.error.errorDescription = "Problème lors du paiement";
            }
            else {
                let details = await this.dao.findAllByOccupation(obj.code);
                let facture = await this.dao.findFactureByOccupation(obj.code);
                obj.details = [];
                for (let j = 0; j < details.length; j++) {
                    let chambre = await this.daoChambre.find(details[j].fkChambre);
                    details[j].chambre = chambre;
                    obj.details.push(details[j]);
                }
                obj.facture = facture[0];
                obj.details.concat(details);
                this.error.errorCode = error_1.ErrorResponseStatus.OK;
                this.error.errorDescription = "Paiement réussi";
            }
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème lors de l'insertion";
            console.log(error);
        }
        return obj;
    }
    async calculateMontantTotal(details, occupation) {
        let detailsOcc = [];
        let occ = occupation;
        let total = 0;
        for (let i = 0; i < details.length; i++) {
            let chambre = await this.daoChambre.find(details[i].fkChambre);
            let nbreNuitee = Number(utilsDate_1.UtilDate.differenceDay(new Date(details[i].dateDepart), new Date(details[i].dateArrive)));
            let affected = detailsOcc.filter((detail) => detail.fkChambre === chambre.code).length === 0;
            affected ? details[i].montantAPayer = Number(Number(chambre.prix) * Number(nbreNuitee)) : details[i].montantAPayer = 0;
            detailsOcc.push(details[i]);
            total = total + Number(details[i].montantAPayer);
            occ.montantAPayer = total;
        }
        let data = { details: detailsOcc, occupation: occupation };
        return data;
    }
    async findAll() {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findAll();
            for (let i = 0; i < data.length; i++) {
                data[i].details = [];
                console.log(await this.dao.findAllByOccupation(data[i].code));
                let details = await this.dao.findAllByOccupation(data[i].code);
                for (let j = 0; j < details.length; j++) {
                    data[i].details.push(details[j]);
                }
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        return data;
    }
    async findAllByAgence(fkAgence, debut, fin) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findAllByAgence(fkAgence, debut, fin);
            for (let i = 0; i < data.length; i++) {
                let details = await this.dao.findAllByOccupation(data[i].code);
                let facture = await this.dao.findFactureByOccupation(data[i].code);
                data[i].details = [];
                for (let j = 0; j < details.length; j++) {
                    let chambre = await this.daoChambre.find(details[j].fkChambre);
                    details[j].chambre = chambre;
                    data[i].details.push(details[j]);
                }
                data[i].facture = facture[0];
                data[i].details.concat(details);
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        return data;
    }
    async findDataAubergeByClientAndPeriod(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findDataAubergeByClientAndPeriod(payload);
            for (let i = 0; i < data.length; i++) {
                let details = await this.dao.findAllByOccupation(data[i].code);
                let facture = await this.dao.findFactureByOccupation(data[i].code);
                data[i].details = [];
                for (let j = 0; j < details.length; j++) {
                    let chambre = await this.daoChambre.find(details[j].fkChambre);
                    details[j].chambre = chambre;
                    data[i].details.push(details[j]);
                }
                data[i].facture = facture[0];
                data[i].details.concat(details);
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        return data;
    }
    async findLast(fkAgence) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findLast(fkAgence);
            for (let i = 0; i < data.length; i++) {
                let details = await this.dao.findAllByOccupation(data[i].code);
                let facture = await this.dao.findFactureByOccupation(data[i].code);
                data[i].details = [];
                for (let j = 0; j < details.length; j++) {
                    let chambre = await this.daoChambre.find(details[j].fkChambre);
                    details[j].chambre = chambre;
                    data[i].details.push(details[j]);
                }
                data[i].facture = facture[0];
                data[i].details.concat(details);
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        console.log(data);
        return data;
    }
    async findCountChambreByState(fkAgence) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let data = [];
        try {
            data = await this.dao.findCountChambreByState(fkAgence);
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Données récupérées avec success";
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Problème dans le serveur";
            console.log(error);
        }
        return data;
    }
    async getDataForLineChartOccupation(fkAgence, debut, fin) {
        let datas = [];
        try {
            let difference = utilsDate_1.UtilDate.differenceDay(new Date(debut), new Date(fin));
            if (difference === 1) {
                datas = await this.dao.getDataForLineChartOccupationDaily(fkAgence, debut, fin);
            }
            if (difference > 1 && difference <= 7) {
                datas = await this.dao.getDataForLineChartOccupationWeekly(fkAgence, debut, fin);
            }
            if (difference > 7 && (difference === 28 || difference === 29 || difference === 30 || difference === 31)) {
                datas = await this.dao.getDataForLineChartOccupationMonthly(fkAgence, debut, fin);
            }
            if (difference > 31) {
                datas = await this.dao.getDataForLineChartOccupationYearly(fkAgence, debut, fin);
            }
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes data trouvées" : this.getError().errorDescription = "Vente trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addVente ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async update(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.update(payload);
            obj !== null ? this.error.errorDescription = "Occupation mise à jour avec success" : this.error.errorDescription = "Erreur lors de la mise à jour";
            obj !== null ? this.error.errorCode = error_1.ErrorResponseStatus.OK : this.error.errorCode = error_1.ErrorResponseStatus.KO;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur renvoyée par le serveur";
            console.log(error);
        }
        return obj;
    }
    async findOccupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.find(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Occupation inexistante");
            obj.details = [];
            obj.details = await this.dao.findAllByOccupation(obj.code);
            this.error.errorDescription = "Occupation trouvée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteLogicOcupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.logicDelete(payload);
            if (obj == null) {
                throw "Erreur";
            }
            let details = await this.dao.findAllByOccupation(obj.code);
            for (let i = 0; i < details.length; i++) {
                let detail = await this.dao.deleteDetailOccupation(details[i].id);
            }
            this.error.errorDescription = "occupation supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteDefinitivelyOccupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.definitiveDelete(payload);
            obj == null ? this.error.errorDescription = "Aucune occupation à supprimer supprimée" : this.error.errorDescription = "Occupation supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
    async deleteDefinitivelyDetailOccupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        let occupation = null;
        try {
            let detail = await this.dao.findDetail(payload);
            occupation = await this.dao.find(detail.fkOccupation);
            occupation.montantAPayer = Number(Number(occupation.montantAPayer) - Number(detail.montantAPayer));
            occupation = await this.dao.update(occupation);
            if (occupation == null) {
                throw "Il y a erreur";
            }
            obj = await this.dao.deleteDetailOccupation(detail.id);
            obj == null ? this.error.errorDescription = "Aucun detail à supprimer supprimée" : this.error.errorDescription = "Detail supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return occupation;
    }
    async updateDetailOccupation(payload) {
        this.error.errorCode = error_1.ErrorResponseStatus.KO;
        let obj = null;
        try {
            obj = await this.dao.updateDetailOccupation(payload);
            obj == null ? this.error.errorDescription = "Aucun detail à supprimer supprimée" : this.error.errorDescription = "Detail supprimée avec success";
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
        }
        catch (error) {
            this.error.errorCode = error_1.ErrorResponseStatus.KO;
            this.error.errorDescription = "Erreur du serveur";
            console.log(error);
        }
        return obj;
    }
};
OccupationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_occupation_service_1.DaoOccupationService, dao_chambre_service_1.DaoChambreService])
], OccupationService);
exports.OccupationService = OccupationService;
//# sourceMappingURL=occupation.service.js.map