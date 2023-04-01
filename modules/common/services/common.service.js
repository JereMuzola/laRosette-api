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
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const app_error_const_1 = require("../../../utilities/app.error.const");
const app_utilities_1 = require("../../../utilities/app.utilities");
const error_1 = require("../../../utilities/error");
const value_data_exception_1 = require("../../../utilities/value.data.exception");
const dao_common_servise_1 = require("../dao/dao.common.servise");
let CommonService = class CommonService {
    constructor(dao) {
        this.dao = dao;
        this.error = new error_1.ErrorResponse(error_1.ErrorResponseStatus.KO, "");
    }
    getError() {
        return this.error;
    }
    async addDevise(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.description, "Le nom de la devise doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.diminutif, "Le diminutif de la devise doit etre fourni et non nul");
            if (!payload.dateCreate)
                payload.dateCreate = null;
            if (!payload.code)
                payload.code = null;
            if (payload.code == null) {
                obj = await this.dao.addDevise(payload);
                console.log("La Devise " + obj.code + " a été enregistré");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création de la Devise");
            }
            else {
                obj = await this.dao.getDevise(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("la Devise n'existe pas");
                obj = await this.dao.updateDevise(payload);
                console.log("La Devise " + obj.code + " a été mise à jour");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la mise à jour de la Devise de l'article'");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "La Devise a été enregistrée avec success";
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
    async getDevise(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez l'id de Devise du composant de l'article");
            obj = await this.dao.getDevise(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Cette Devise n'existe pas");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Devise trouvée avec succès";
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
    async getAllDevise() {
        let datas = [];
        try {
            datas = await this.dao.getAllDevise();
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Devises trouvés avec succès";
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
    async deleteDevise(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code de la Devise de l'article");
            obj = await this.dao.deleteDevise(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucune Devise supprimé");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Devise supprimée avec succès";
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
    async addClient(payload) {
        this.getError().clear();
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.nom, "Le nom du client doit etre fourni et non nul");
            app_utilities_1.AppUtilities.controlValueString(payload.postnom, "Le postnom du client doit etre fourni et non nul");
            if (!payload.dateCreate)
                payload.dateCreate = null;
            if (!payload.code)
                payload.code = null;
            if (payload.code == null) {
                obj = await this.dao.addClient(payload);
                console.log("Le client " + obj.code + " a été enregistré");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création du client");
            }
            else {
                obj = await this.dao.getClient(payload.code);
                if (obj == null)
                    throw new value_data_exception_1.ValueDataException("le client n'existe pas");
                obj = await this.dao.updateClient(payload);
                console.log("Le client " + obj.code + " a été mise à jour");
                app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la mise à jour du client");
            }
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Le client a été enregistré avec success";
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
    async getClient(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code du client");
            obj = await this.dao.getClient(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Ce client n'existe pas");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Client trouvé avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCLient ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getClientByNoms(nom, postnom, prenom) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(nom, "Fournissez le code du client");
            obj = await this.dao.getClientByNoms(nom, postnom, prenom);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Ce client n'existe pas");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Client trouvé avec succès";
        }
        catch (ex) {
            console.log(ex);
            this.getError().errorCode = error_1.ErrorResponseStatus.KO;
            if (ex instanceof value_data_exception_1.ValueDataException) {
                this.getError().errorDescription = ex.message;
            }
            else {
                console.log("iHotel : addCLient ---->\n" + ex);
                this.getError().errorDescription = app_error_const_1.AppErrorConst.ERR_UNKNOW;
            }
        }
        return obj;
    }
    async getAllClient(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllClient(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Clients trouvés avec succès";
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
    async getAllClientHosted(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllClientHosted(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Clients trouvés avec succès";
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
    async getAllClientNoHosted(fkAgence) {
        let datas = [];
        try {
            datas = await this.dao.getAllClientNoHosted(fkAgence);
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Clients trouvés avec succès";
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
    async deleteClient(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code du client");
            obj = await this.dao.deleteClient(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Aucun client supprimé");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Client supprimé avec succès";
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
    async addTauxChange(payload) {
        this.getError().clear();
        let obj = null;
        try {
            obj = await this.dao.addTauxChange(payload);
            console.log("Le taux " + obj.code + " a été enregistré");
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la création du taux");
            this.error.errorCode = error_1.ErrorResponseStatus.OK;
            this.error.errorDescription = "Le taux a été enregistrée avec success";
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
    async getTaux(code) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(code, "Fournissez le code du taux");
            obj = await this.dao.getTaux(code);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Ce taux n'existe pas");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Taux trouvé avec succès";
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
    async getTauxToApply() {
        let obj = null;
        try {
            obj = await this.dao.getTauxToApply();
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Ce taux n'existe pas");
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Taux trouvé avec succès";
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
    async getAllTaux() {
        let datas = [];
        try {
            datas = await this.dao.getAllTauxChange();
            this.getError().errorCode = error_1.ErrorResponseStatus.OK;
            this.getError().errorDescription = " Devises trouvés avec succès";
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
CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dao_common_servise_1.DaoCommonService])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map