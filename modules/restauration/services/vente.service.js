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
exports.VenteService = void 0;
const common_1 = require("@nestjs/common");
const app_error_const_1 = require("../../../utilities/app.error.const");
const app_utilities_1 = require("../../../utilities/app.utilities");
const error_1 = require("../../../utilities/error");
const utilsDate_1 = require("../../../utilities/utilsDate");
const value_data_exception_1 = require("../../../utilities/value.data.exception");
const dao_achat_service_1 = require("../dao/dao.achat.service");
const dao_stock_service_1 = require("../dao/dao.stock.service");
const dao_vente_service_1 = require("../dao/dao.vente.service");
const mouvementStock_1 = require("../models/mouvementStock");
const constant_1 = require("../utilities/constant");
let VenteService = class VenteService {
    constructor(dao, daoStock, daoAchat) {
        this.dao = dao;
        this.daoStock = daoStock;
        this.daoAchat = daoAchat;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addVente(payload) {
        this.getError().clear();
        let obj = null;
        try {
            payload.montant_total = await this.montantTotalCalcul(payload.details);
            app_utilities_1.AppUtilities.controlValueNumber(payload.montant_total, "Le montant total de la Vente doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.fkAgent, "fournir le uid de l'agent créateur de la Vente");
            app_utilities_1.AppUtilities.controlValueList(payload.details, "Fournissez les details de la Vente");
            if (!payload.code)
                payload.code = null;
            if (payload.code == null) {
                obj = await this.dao.addVente(payload);
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la Vente");
                console.log("La Vente " + obj.code + " a été passée");
                for (let i = 0; i < obj.details.length; i++) {
                    let article = await this.daoStock.getArticle(obj.details[i].fkArticle);
                    if (article == null) {
                        throw new value_data_exception_1.ValueDataException("Il n'existe aucun stock pour cet article");
                    }
                    if (article.isArticle) {
                        let mouvementStock = new mouvementStock_1.MouvementStockModel();
                        let stock = await this.daoStock.getStockArticleByArticle(article.code);
                        if (stock != null) {
                            mouvementStock.fkStock = stock.code;
                            mouvementStock.article = article.designation;
                            mouvementStock.fkArticle = article.code;
                            mouvementStock.fkFournisseur = null;
                            mouvementStock.fkClient = obj.fkClient;
                            mouvementStock.typeMouvement = constant_1.TypeMouvement.SORTIE;
                            mouvementStock.quantite = payload.details[i].quantite;
                            mouvementStock.prix_unitaire_mouvement = payload.details[i].prix_unitaire;
                            mouvementStock.dateCreate = new Date();
                            mouvementStock.fkAgent = payload.fkAgent;
                            mouvementStock.agent = payload.agent;
                            mouvementStock.agence = payload.agence;
                            mouvementStock.fkAgence = payload.fkAgence;
                            mouvementStock = mouvementStock_1.MouvementStockModel.fromEntity(await this.daoStock.addMouvementStock(mouvementStock));
                        }
                    }
                }
            }
            else {
                obj = await this.dao.getVente(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("Cette Vente n'existe pas");
                obj = await this.dao.updateVente(payload);
                console.log("La Vente " + obj.code + " a été passée");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la Vente");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La Vente a été passée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addVente ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getVente(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de la Vente");
            obj = await this.dao.getVente(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucune Vente portant ce numero");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Vente trouvée avec succès";
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
        return obj;
    }
    async getVenteByClientAndPeriod(param) {
        let datas = [];
        try {
            datas = await this.dao.getVenteByClientOrPeriod(param.client, param.fkAgence, param.dateDebut, param.dateFin);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Vente trouvée avec succès";
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
    async payerVente(payload) {
        let obj = null;
        try {
            obj = await this.dao.payerVente(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucune Vente portant ce numero");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Vente payée avec succès";
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
        return obj;
    }
    async montantTotalCalcul(details) {
        let total = 0;
        for (let i = 0; i < details.length; i++) {
            total += (Number(details[i].prix_unitaire) * Number(details[i].quantite));
        }
        return total;
    }
    async getAllVente(fkAgence, venteService, debut, fin) {
        let datas = [];
        try {
            datas = await this.dao.getAllVente(fkAgence, venteService, debut, fin);
            for (let i = 0; i < datas.length; i++) {
                datas[i].facture = await this.dao.getFactureRestaurentByVente(datas[i].code);
            }
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Vente trouvées" : this.getError().errorDescription = "Vente trouvées avec succès";
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
    async getDataForPieChartArticle(fkAgence, venteService, debut, fin) {
        let datas = [];
        try {
            datas = await this.dao.getDataForPieChartArticle(fkAgence, venteService, debut, fin);
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
    async getDataForLineChartVente(fkAgence, venteService, debut, fin) {
        let datas = [];
        try {
            let difference = utilsDate_1.UtilDate.differenceDay(new Date(debut), new Date(fin));
            if (difference === 1) {
                datas = await this.dao.getDataForLineChartVenteDaily(fkAgence, venteService, debut, fin);
            }
            if (difference > 1 && difference <= 7) {
                datas = await this.dao.getDataForLineChartVenteWeekly(fkAgence, venteService, debut, fin);
            }
            if (difference > 7 && (difference === 28 || difference === 29 || difference === 30 || difference === 31)) {
                datas = await this.dao.getDataForLineChartVenteMonthly(fkAgence, venteService, debut, fin);
            }
            if (difference > 31) {
                datas = await this.dao.getDataForLineChartVenteYearly(fkAgence, venteService, debut, fin);
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
    async getLastVente(fkAgence, venteService) {
        let datas = [];
        try {
            datas = await this.dao.getLastVente(fkAgence, venteService);
            for (let i = 0; i < datas.length; i++) {
                datas[i].facture = await this.dao.getFactureRestaurentByVente(datas[i].code);
            }
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Vente trouvées" : this.getError().errorDescription = "Vente trouvées avec succès";
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
    async deleteLogicVente(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Le code de la Vente doit etre fourni et non nul");
            obj = await this.dao.logicDeleteVente(code);
            if (obj == null)
                throw new value_data_exception_1.ValueDataException("Cette Vente n'existe pas");
            console.log("La Vente " + obj.code + " a été supprimée");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La Vente a été supprimée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addVente ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async addTable(payload) {
        this.getError().clear();
        let obj = null;
        try {
            obj = await this.dao.addTable(payload);
            console.log("La table " + obj.code + " a été enregistrée");
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la table");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La table a été enregistrée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addArticle ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getAllTable(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllTable(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes tables trouvées" : this.getError().errorDescription = "Tables trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addTable ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
};
VenteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_vente_service_1.DaoVenteService, dao_stock_service_1.DaoStockService, dao_achat_service_1.DaoAchatService])
], VenteService);
exports.VenteService = VenteService;
//# sourceMappingURL=vente.service.js.map