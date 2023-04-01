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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const app_error_const_1 = require("../../../utilities/app.error.const");
const app_utilities_1 = require("../../../utilities/app.utilities");
const error_1 = require("../../../utilities/error");
const value_data_exception_1 = require("../../../utilities/value.data.exception");
const dao_achat_service_1 = require("../dao/dao.achat.service");
const dao_stock_service_1 = require("../dao/dao.stock.service");
const article_1 = require("../models/article");
let StockService = class StockService {
    constructor(dao, daoAchat) {
        this.dao = dao;
        this.daoAchat = daoAchat;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addArticle(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(payload.prix_unitaire_vente, "Le prix de vente doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.fkAgent, "fournir le uid de l'agent créateur de l'article");
            if (!payload.dateCreate)
                payload.dateCreate = null;
            if (!payload.code)
                payload.code = null;
            if (payload.code == null) {
                obj = await this.dao.addArticle(payload);
                console.log("L'article " + obj.code + " a été enregistré");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de l'article");
            }
            else {
                obj = await this.dao.getArticle(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("l'article n'existe pas");
                obj = await this.dao.updateArticle(payload);
                console.log("L'article " + obj.code + " a été passé");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de l'article'");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "L'article a été enregistré avec success";
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
    async addMouvementStock(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(payload.quantite, "Le prix de vente doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.fkAgent, "fournir le uid de l'agent créateur du mouvement");
            if (!payload.dateCreate)
                payload.dateCreate = null;
            if (!payload.fkArticle)
                payload.fkArticle = null;
            obj = await this.dao.addMouvementStock(payload);
            console.log("Le mouvement " + obj.id + " a été enregistré");
            app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Echec lors de l'enregistrement du mouvement stock");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Le mouvement a été enregistré avec success";
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
    async getArticle(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de l'article");
            obj = await this.dao.getArticle(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun article  portant ce numero");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " artcle trouvé avec succès";
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
    async getAllArticle(fkAgence) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            datas = await this.dao.getAllArticle(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async getArticleByType(fkAgence, type) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            app_utilities_1.AppUtilities.controlValueString(type, "Fournissez le type de l'article");
            datas = await this.dao.getArticleByType(fkAgence, type);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async getArticleArticle(fkAgence) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            datas = await this.dao.getArticleArticle(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async getArticleDispo(fkAgence) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            datas = await this.dao.getArticleDispo(fkAgence);
            for (let i = 0; i < datas.length; i++) {
                datas[i] = article_1.ArticleModel.fromEntity(datas[i]);
            }
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async getValeurTotalInStock(fkAgence) {
        let total = 0;
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            total = await this.dao.getValeurTotalInStock(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
        return total;
    }
    async getValeurInStockByArticle(fkAgence) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            datas = await this.dao.getValeurInStockByArticle(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async getPlat(fkAgence) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkAgence, "Fournissez le code de l'agence");
            datas = await this.dao.getPlat(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async logicDeleteArticle(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de l'article");
            obj = await this.dao.logicDeleteArticle(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun article supprimé");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " artcle supprimé avec succès";
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
    async addComposition(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(payload.quantite, "La quantité de la composante doit etre fourni et non nul");
            if (!payload.dateCreate)
                payload.dateCreate = null;
            if (!payload.id)
                payload.id = null;
            if (payload.id == null) {
                obj = await this.dao.addCompostion(payload);
                console.log("La composition " + obj.id + " a été enregistré");
                app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Echec lors de la création de la composition");
            }
            else {
                obj = await this.dao.getComposition(payload.id);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("la composition n'existe pas");
                obj = await this.dao.updateComposition(payload);
                console.log("La composition " + obj.fkArticleComposant + " a été mise à jour");
                app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Echec lors de la mise à jour de la composition de l'article'");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La composition a été enregistrée avec success";
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
    async getComposition(id) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(id, "Fournissez l'id de composition du composant de l'article");
            obj = await this.dao.getComposition(id);
            app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Cette composition n'existe pas");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Composition trouvée avec succès";
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
    async getCompositionByArticleCompose(fkArticleCompose) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(fkArticleCompose, "Fournissez le code de l'article composant");
            datas = await this.dao.getCompositionByArticleCompose(fkArticleCompose);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async deleteComposition(id) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(id, "Fournissez l'id de la composition de l'article");
            obj = await this.dao.deleteCompositionArticle(id);
            app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Aucun composition supprimé");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " composition supprimé avec succès";
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
    async addCategorieArticle(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.description, "Le nom de la categorie doit etre fourni et non nul");
            if (!payload.dateCreate)
                payload.dateCreate = null;
            if (!payload.code)
                payload.code = null;
            if (payload.code == null) {
                obj = await this.dao.verifyCategorieArticle(payload.description);
                if (obj != null) {
                    throw "Categorie article déjà existante";
                }
                obj = await this.dao.addCategorieArticle(payload);
                console.log("La categorie article " + obj.code + " a été enregistré");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la categorie d'article");
            }
            else {
                obj = await this.dao.getCategorieArticle(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("cette categorie d'article n'existe pas");
                obj = await this.dao.updateCategorieArticle(payload);
                console.log("L'article " + obj.code + " a été passé");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la categorie d'article");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La categorie d'article a été enregistré avec success";
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
    async getCategorieArticle(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de la categorie");
            obj = await this.dao.getCategorieArticle(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucune categorie portant ce numero");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " categorie trouvée avec succès";
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
    async getAllCategorieArticle() {
        let datas = [];
        try {
            datas = await this.dao.getAllCategorieArticle();
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Categories Artcles trouvées avec succès";
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
    async getCategorieArticleByUnite(unite) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(unite, "Fournissez l'unite de référence de la categorie");
            datas = await this.dao.getCategorieArticleByUnite(unite);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Artcles trouvés avec succès";
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
    async logicDeleteCategorieArticle(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de la categorie");
            obj = await this.dao.logicDeleteCategorieArticle(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucune catégorie supprimée");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " artcle supprimé avec succès";
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
    async updateStockArticle(payload) {
        let obj = null;
        try {
            obj = await this.dao.updateStockArticle(payload);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun stock mis à jour");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " stock mis à jour avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : updateStock ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getStockArticle(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code du stock l'article");
            obj = await this.dao.getStockArticle(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun stock trouvé");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " stock trouvé avec succès";
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
    async getAllStockArticle() {
        let datas = [];
        try {
            datas = await this.dao.getAllStockArticle();
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Stocks trouvés avec succès";
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
    async getStockArticleByArticle(fkArticle) {
        let datas = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(fkArticle, "Fournissez le code de l'article");
            datas = await this.dao.getStockArticleByArticle(fkArticle);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Stock trouvé avec succès";
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
    async getStockArticleAlerted() {
        let datas = [];
        try {
            datas = await this.dao.getStockArticleAlerted();
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Stocks trouvés avec succès";
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
    async getMouvementStockByTypeMouvement(fkAgence, type_mouvement, debut, fin) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(type_mouvement, "Fournissez le type de mouvement");
            datas = await this.dao.getMouvementStockByTypeMouvement(fkAgence, type_mouvement, debut, fin);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Stock trouvé avec succès";
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
    async getMouvementByTypeMouvementGroupedByArticle(fkAgence, type_mouvement, debut, fin) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(type_mouvement, "Fournissez le type de mouvement");
            datas = await this.dao.getMouvementStockByTypeMouvementGroupedByArticle(fkAgence, type_mouvement, debut, fin);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Stock trouvé avec succès";
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
    async getMouvementStockByArticle(article) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(article, "Fournissez le code de l'article");
            datas = await this.dao.getMouvementStockByArticle(article);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Stock trouvé avec succès";
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
    async getMouvementStockByArticleAndTypeMouvement(article, type_mouvement) {
        let datas = [];
        try {
            app_utilities_1.AppUtilities.controlValueString(article, "Fournissez le code de l'article");
            app_utilities_1.AppUtilities.controlValueString(type_mouvement, "Fournissez le type de mouvement");
            datas = await this.dao.getMouvementStockByTypeMouvementAndArticle(article, type_mouvement);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Mouvements trouvés avec succès";
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
};
StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_stock_service_1.DaoStockService, dao_achat_service_1.DaoAchatService])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map