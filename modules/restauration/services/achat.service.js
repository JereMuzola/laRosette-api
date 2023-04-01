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
exports.AchatService = void 0;
const common_1 = require("@nestjs/common");
const app_error_const_1 = require("../../../utilities/app.error.const");
const app_utilities_1 = require("../../../utilities/app.utilities");
const error_1 = require("../../../utilities/error");
const value_data_exception_1 = require("../../../utilities/value.data.exception");
const dao_achat_service_1 = require("../dao/dao.achat.service");
const dao_stock_service_1 = require("../dao/dao.stock.service");
const mouvementStock_1 = require("../models/mouvementStock");
const constant_1 = require("../utilities/constant");
let AchatService = class AchatService {
    constructor(dao, daoStock) {
        this.dao = dao;
        this.daoStock = daoStock;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addCommande(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(payload.montant_total, "Le montant total de la commande doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.fkAgent, "fournir le uid de l'agent créateur de la commande");
            app_utilities_1.AppUtilities.controlValueList(payload.details, "Fournissez les details de la commande");
            if (!payload.dateEdit)
                payload.dateEdit = null;
            if (!payload.code)
                payload.code = null;
            if (payload.code == null) {
                let temp = await this.calculateMontantTotal(payload);
                payload.montant_total = temp.total;
                obj = await this.dao.addCommande(payload);
                console.log("La commande " + obj.code + " a été passée");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la commande");
            }
            else {
                obj = await this.dao.getCommande(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("Cette commande n'existe pas");
                obj = await this.dao.updateCommande(payload);
                console.log("La commande " + obj.code + " a été passée");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la commande");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La commande a été passée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async calculateMontantTotal(payload) {
        let total = 0;
        try {
            for (let i = 0; i < payload.details.length; i++) {
                total = (total) + (Number(payload.details[i].prix_unitaire) * Number(payload.details[i].quantite));
            }
        }
        catch (error) {
            console.log(error);
        }
        return {
            details: payload.details,
            total: total
        };
    }
    async validateCommande(payload) {
        this.getError().clear();
        let obj = null;
        try {
            obj = await this.dao.validateCommande(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la validation de la commande");
            console.log("La commande " + obj.code + " a été validée");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La commande a été validée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async validateCommandeByCoordon(payload) {
        this.getError().clear();
        let obj = null;
        try {
            obj = await this.dao.validateCommandeByCoordon(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la validation de la commande");
            console.log("La commande " + obj.code + " a été validée par le coordon");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La commande a été validée par le coordon avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async annulerCommande(payload) {
        this.getError().clear();
        let obj = null;
        try {
            obj = await this.dao.annulerCommande(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'annulation' de la commande");
            console.log("La commande " + obj.code + " a été annulée");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La commande a été annulée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async decaisserCommande(payload) {
        this.getError().clear();
        let obj = null;
        try {
            obj = await this.dao.decaisserCommande(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors du decaissement de la commande");
            console.log("La commande " + obj.code + " a été comptabilisée");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La commande a été decaissée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getCommande(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de la commande");
            obj = await this.dao.getCommande(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucune commande portant ce numero");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " commande trouvée avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getAllCommande(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllCommande(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllBonDeDecaissement(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllBonDeDecaissement(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucuns bons trouvés" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllBonDeDecaissementByPeriod(fkAgence, debut, fin) {
        let datas = [];
        try {
            datas = await this.dao.getAllBonDeDecaissementByPeriod(fkAgence, debut, fin);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucuns bons trouvés" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllOrdreDeDecaissement(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllOrdreDeDecaissement(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucuns bons trouvés" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllOrdreDeDecaissementByPeriod(fkAgence, debut, fin) {
        let datas = [];
        try {
            datas = await this.dao.getAllOrdreDeDecaissementByPeriod(fkAgence, debut, fin);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucuns bons trouvés" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllCommandeByPeriodAndEtat(fkAgence, debut, fin, etat) {
        let datas = [];
        try {
            datas = await this.dao.getAllCommandeByPeriodAndEtat(fkAgence, etat, debut, fin);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucuns bons trouvés" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getLastCommande(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getLastCommande(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getCommandeByBDD(codeBDD, agence) {
        let datas = [];
        try {
            datas = await this.dao.getCommandeByBDD(codeBDD, agence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllInitCommande(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllInitCommande(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllAnnuleCommande(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllAnnuleCommande(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllValideCommande(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllValideCommande(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllValideCommandeWithoutAgence() {
        let datas = [];
        try {
            datas = await this.dao.getAllValideCommandeWithoutAgence();
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAllDecaisseCommande(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllDecaisseCommande(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            datas.length == 0 ? this.getError().errorDescription = "Aucunes Commande trouvées" : this.getError().errorDescription = "Commande trouvées avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async deleteLogicCommande(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Le code de la commande doit etre fourni et non nul");
            obj = await this.dao.logicDeleteCommande(code);
            if (obj == null)
                throw new value_data_exception_1.ValueDataException("Cette commande n'existe pas");
            console.log("La commande " + obj.code + " a été supprimée");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La commande a été supprimée avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async addAchat(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(payload.montant_total, "Le montant total de l'achat doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.fkAgent, "fournir le uid de l'agent créateur de l'achat");
            app_utilities_1.AppUtilities.controlValueList(payload.details, "Fournissez les details de l'achat");
            if (!payload.dateEdit)
                payload.dateEdit = null;
            if (!payload.code)
                payload.code = null;
            if (payload.code === null) {
                obj = await this.dao.addAchat(payload);
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de l'achat'");
                console.log("L'achat " + obj.code + " a été enregistré");
                for (let i = 0; i < obj.details.length; i++) {
                    let article = await this.daoStock.getArticle(obj.details[i].fkArticle);
                    if (article == null) {
                        throw new value_data_exception_1.ValueDataException("Il n'existe aucun stock pour cet article");
                    }
                    if (article.isArticle) {
                        console.log(article);
                        let mouvementStock = new mouvementStock_1.MouvementStockModel();
                        let stock = await this.daoStock.getStockArticleByArticle(article.code);
                        mouvementStock.fkStock = stock.code;
                        mouvementStock.article = article.designation;
                        mouvementStock.fkArticle = article.code;
                        mouvementStock.fkFournisseur = payload.details[i].fkFournisseur;
                        mouvementStock.fkClient = "";
                        mouvementStock.typeMouvement = constant_1.TypeMouvement.ENTREE;
                        mouvementStock.quantite = payload.details[i].quantite;
                        mouvementStock.prix_unitaire_mouvement = payload.details[i].prix_unitaire;
                        mouvementStock.dateCreate = new Date();
                        mouvementStock.fkAgent = payload.fkAgent;
                        mouvementStock.agence = payload.agence;
                        mouvementStock.fkAgence = payload.fkAgence;
                        mouvementStock.agent = payload.agent;
                        mouvementStock = mouvementStock_1.MouvementStockModel.fromEntity(await this.daoStock.addMouvementStock(mouvementStock));
                        console.log(mouvementStock);
                    }
                }
            }
            else {
                obj = await this.dao.getAchat(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("Cet achat n'existe pas");
                obj = await this.dao.updateAchat(payload);
                console.log("L'achat " + obj.code + " a été mis à jour");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la mise à jour de l'achat");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été enregistré avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async cloturerAchat(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "fournir le code de l'achat");
            let achat = await this.dao.getAchat(code);
            app_utilities_1.AppUtilities.controlValueString(achat.code, "Aucun achat avec ce code");
            obj = await this.dao.clotureAchat(achat);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la cloture de l'achat'");
            console.log("L'achat " + obj.code + " a été cloturé");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été cloturé avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getAchat(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "fournir le code de l'achat");
            obj = await this.dao.getAchat(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun achat avec ce code");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été récupéré avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async logicDeleteAchat(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "fournir le code de l'achat");
            obj = await this.dao.logicDeleteAchat(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun achat avec ce code");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été supprimé avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getAllAchat(fkAgence) {
        this.getError().clear();
        let datas = [];
        try {
            datas = await this.dao.getAllAchat(fkAgence);
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été récupéré avec success";
        }
        catch (ex) {
            console.log(ex);
            datas = [];
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAchatByState(state) {
        this.getError().clear();
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(state, "Renseignez l'état");
            datas = await this.dao.getAchatByState(state);
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été récupéré avec success";
        }
        catch (ex) {
            console.log(ex);
            datas = [];
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAchatByPeriod(debut, fin) {
        this.getError().clear();
        let datas = [];
        try {
            datas = await this.dao.getAchatByPeriod(debut, fin);
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été récupéré avec success";
        }
        catch (ex) {
            console.log(ex);
            datas = [];
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async getAchatByPeriodAndState(debut, fin, state) {
        this.getError().clear();
        let datas = [];
        try {
            datas = await this.dao.getAchatByPeriodAndState(debut, fin, state);
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'achat' a été récupéré avec success";
        }
        catch (ex) {
            console.log(ex);
            datas = [];
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async addFournisseur(payload) {
        this.getError().clear();
        let obj = null;
        try {
            if (!payload.code)
                payload.code = null;
            if (payload.code === null) {
                obj = await this.dao.addFournisseur(payload);
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'ajout du fournisseur");
            }
            else {
                obj = await this.dao.getFournisseur(payload.code);
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun fournisseur trouvé");
                obj = await this.dao.updateFournisseur(payload);
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la mise à jour du fournisseur");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Ok";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getAllFournisseur() {
        this.getError().clear();
        let datas = [];
        try {
            datas = await this.dao.getAllFournisseur();
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Tous les fournisseurs ont été récupérés avec succès";
        }
        catch (ex) {
            console.log(ex);
            datas = [];
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : Fournisseur ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return datas;
    }
    async deleteFournisseur(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "fournir le code du fournisseur");
            obj = await this.dao.deleteFournisseur(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun fourisseur avec ce code");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Le fournisseur a été supprimé avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getFournisseur(code) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "fournir le code du fournisseur");
            obj = await this.dao.getFournisseur(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun fourisseur avec ce code");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Le fournisseur a été trouvé avec success";
        }
        catch (ex) {
            console.log(ex);
            obj = null;
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCommande ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
};
AchatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_achat_service_1.DaoAchatService, dao_stock_service_1.DaoStockService])
], AchatService);
exports.AchatService = AchatService;
//# sourceMappingURL=achat.service.js.map