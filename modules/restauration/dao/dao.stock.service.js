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
var DaoStockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoStockService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../orm/prisma.service");
const article_1 = require("../models/article");
const app_utilities_1 = require("../../../utilities/app.utilities");
const stockArticle_1 = require("../models/stockArticle");
const mouvementStock_1 = require("../models/mouvementStock");
const constant_1 = require("../utilities/constant");
const categorieArticle_1 = require("../models/categorieArticle");
const composition_1 = require("../models/composition");
let DaoStockService = DaoStockService_1 = class DaoStockService {
    constructor() { }
    static instance() {
        if (!DaoStockService_1._instance) {
            DaoStockService_1._instance = new DaoStockService_1();
            DaoStockService_1._prisma = new prisma_service_1.PrismaService();
        }
        return DaoStockService_1._prisma;
    }
    async addArticle(payload) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `insert article  set code='',designation=${payload.designation},description=${payload.description},isArticle=${payload.isArticle},isDisponible=${payload.isDisponible},isCompose=${payload.isCompose},type=${payload.type},prix_unitaire_vente=${payload.prix_unitaire_vente},devise=${payload.devise},fkDevise=${payload.fkDevise},dateCreate=${new Date()},status=${true},fkAgent = ${payload.fkAgent},fkAgence=${payload.fkAgence},agence=${payload.agence}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where agence=${payload.agence} and isArticle=${payload.isArticle} order by code desc limit 1`);
            obj = article_1.ArticleModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion de l'article");
            if (obj.isArticle) {
                let stock = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `insert stockarticle  set code='',article=${payload.designation},fkArticle=${obj.code},quantite=${0},seuil=${0},dateCreate=${new Date()},fkAgent = ${payload.fkAgent},status=${1}`);
                stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where fkArticle=${obj.code}`);
                stock.length !== 0 ? obj.stockArticle = stockArticle_1.StockArticleModel.fromEntity(stock[0]) : obj.stockArticle = null;
            }
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async updateArticle(payload) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.code, "Fournissez le code l'article");
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update article  set designation=${payload.designation},description=${payload.description},fkDevise=${payload.fkDevise},devise=${payload.devise},isArticle=${payload.isArticle},isDisponible=${payload.isDisponible},type=${payload.type},prix_unitaire_vente=${payload.prix_unitaire_vente},fkAgent = ${payload.fkAgent},fkAgence=${payload.fkAgence},agence=${payload.agence} where code=${payload.code}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where code=${payload.code} `);
            obj = article_1.ArticleModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la récupération de l'article");
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getArticle(code) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where code=${code}`);
            if (result != null && result.length > 0) {
                obj = article_1.ArticleModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async verifyArticle(designation) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where designation=${designation}`);
            if (result != null && result.length > 0) {
                obj = article_1.ArticleModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllArticle(fkAgence) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where fkAgence=${fkAgence} and status=${1} order by designation asc limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getArticleByType(fkAgence, type) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where fkAgence=${fkAgence} and type=${type} order by code DESC limit 100`);
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].isArticle) {
                    let stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where fkArticle=${datas[i].code}`);
                    stock.length !== 0 ? datas[i].stockArticle = stockArticle_1.StockArticleModel.fromEntity(stock[0]) : datas[i].stockArticle = null;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getArticleArticle(fkAgence) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where fkAgence=${fkAgence} and isArticle=${true} and status=${true} order by designation asc limit 100`);
            for (let i = 0; i < datas.length; i++) {
                let stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where fkArticle=${datas[i].code}`);
                stock.length !== 0 ? datas[i].stockArticle = stockArticle_1.StockArticleModel.fromEntity(stock[0]) : datas[i].stockArticle = null;
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getArticleDispo(fkAgence) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select article.code,article.designation,article.description,article.isArticle,article.type,article.prix_unitaire_vente,article.fkDevise,article.devise,article.status,article.dateCreate,article.fkAgent,article.fkAgence,article.agence,stockarticle.fkArticle,stockarticle.quantite from article  inner join stockarticle  on stockarticle.fkArticle=article.code where article.fkAgence=${fkAgence} and isArticle=${true} and article.status=${true} and stockarticle.quantite>${0} order by designation asc limit 100`);
            for (let i = 0; i < datas.length; i++) {
                let stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where fkArticle=${datas[i].code}`);
                stock.length !== 0 ? datas[i].stockArticle = stockArticle_1.StockArticleModel.fromEntity(stock[0]) : datas[i].stockArticle = null;
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getPlat(fkAgence) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where fkAgence=${fkAgence} and isArticle=${false} and status=${true} order by designation asc limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getPlatDisponible(fkAgence) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where fkAgence=${fkAgence} and isArticle=${false} and isDisponible=${true} order by code DESC limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async logicDeleteArticle(code) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update article  set status=${0} where code=${code}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from article  where code=${code}`);
            obj = article_1.ArticleModel.fromEntity(result[0]);
            if (obj.isArticle) {
                let stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `update stockarticle  set status=${0} where fkArticle=${code}`);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async addCompostion(payload) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `insert composition set fkArticleComposant=${payload.fkArticleComposant},articleComposant=${payload.articleComposant},articleCompose=${payload.articleCompose},fkArticleCompose=${payload.fkArticleCompose},quantite=${payload.quantite},dateCreate=${new Date()},status=${true},fkAgent=${payload.fkAgent}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from composition order by code desc limit 1`);
            obj = composition_1.CompositionModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Echec lors de l'insertion de la composition d'article");
        }
        catch (error) {
            console.log(error);
            payload.id = 0;
        }
        return obj;
    }
    async updateComposition(payload) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueNumber(payload.id, "Fournissez l'id la composition");
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update composition set quantite=${payload.quantite} where id=${payload.id}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from composition where id=${payload.id} `);
            obj = composition_1.CompositionModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueNumber(obj.id, 'Echec lors de la récupération de la composition');
        }
        catch (error) {
            console.log(error);
            payload.id = null;
        }
        return obj;
    }
    async getCompositionByArticleCompose(fkCompose) {
        let datas = [];
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from composition where fkCompose=${fkCompose} and status=${true}`);
            if (result.length > 0) {
                datas = result;
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getComposition(id) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from composition where id=${Number(id)} and status=${true}`);
            if (result.length > 0) {
                obj = result[0];
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async deleteCompositionArticle(id) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `delete from composition where id=${id}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where id=${id}`);
            result.length > 0
                ? obj == composition_1.CompositionModel.fromEntity(result[0])
                : (obj = null);
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async addCategorieArticle(payload) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `insert categoriearticle  set code='',description=${payload.description},unite=${payload.unite},dateCreate=${new Date()},status=${true}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  order by code desc limit 1`);
            obj = categorieArticle_1.CategorieArticleModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de l'insertion de la categorie d'article");
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async verifyCategorieArticle(description) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where description=${description} and status=${1}`);
            if (result != null && result.length > 0) {
                obj = categorieArticle_1.CategorieArticleModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async updateCategorieArticle(payload) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.code, 'Fournissez le code la categorie article');
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update categoriearticle  set description=${payload.description},unite=${payload.unite} where code=${payload.code}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where code=${payload.code} `);
            obj = categorieArticle_1.CategorieArticleModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la récupération de l'article");
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getCategorieArticle(code) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where code=${code}`);
            if (result != null && result.length > 0) {
                obj = categorieArticle_1.CategorieArticleModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getAllCategorieArticle() {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where status=${1} order by code DESC limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getCategorieArticleByUnite(unite) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where unite=${unite} and status=${1} order by code DESC limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async logicDeleteCategorieArticle(code) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update categoriearticle  set status=${0} where code=${code}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from categoriearticle  where code=${code}`);
            obj = categorieArticle_1.CategorieArticleModel.fromEntity(result[0]);
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async updateStockArticle(payload) {
        let obj = null;
        try {
            app_utilities_1.AppUtilities.controlValueString(payload.code, "Fournissez le code l'article");
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update stockarticle  set quantite=${payload.quantite},seuil=${payload.seuil} where code=${payload.code}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where code=${payload.code} `);
            obj = stockArticle_1.StockArticleModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueString(obj.code, "Echec lors de la mise à jour du stock de l'article");
        }
        catch (error) {
            console.log(error);
            payload.code = null;
        }
        return obj;
    }
    async getStockArticle(code) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where code=${code}`);
            if (result != null && result.length > 0) {
                obj = stockArticle_1.StockArticleModel.fromEntity(result[0]);
            }
        }
        catch (error) {
            console.log(error);
        }
        return obj;
    }
    async getValeurTotalInStock(fkAgence) {
        let total = 0;
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `SELECT SUM(stockarticle.quantite*article.prix_unitaire_vente) AS 'valeur_in_stock' FROM article  INNER JOIN stockarticle  ON article.code=stockarticle.fkarticle  and article.isArticle=${true} WHERE article.fkAgence=${fkAgence} and article.status=${true}`);
            if (result != null && result.length > 0) {
                total = Number(result[0].valeur_in_stock);
            }
        }
        catch (error) {
            console.log(error);
        }
        return total;
    }
    async getValeurInStockByArticle(fkAgence) {
        let datas = [];
        try {
            let result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `SELECT article.code,article.designation,article.description,article.isArticle,article.fkDevise,article.fkAgent,article.fkAgence,article.agence,article.devise,article.prix_unitaire_vente,stockarticle.quantite,stockarticle.code as 'code_stock',(stockarticle.quantite*article.prix_unitaire_vente) AS 'valeur_in_stock' FROM article  INNER JOIN stockarticle  ON article.code=stockarticle.fkarticle  WHERE article.fkAgence=${fkAgence} and article.isArticle=${true} and article.status=${true} order by article.designation`);
            if (result != null && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    datas.push(article_1.ArticleModel.fromEntity(result[i]));
                    let stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where code=${result[i].code_stock}`);
                    datas[i].stockArticle = stockArticle_1.StockArticleModel.fromEntity(stock[0]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getAllStockArticle() {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  order by code DESC limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getStockArticleByArticle(article) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where fkArticle=${article} order by code DESC limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas[0];
    }
    async getStockArticleAlerted() {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where quantite<seuil order by code DESC limit 100`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async addMouvementStock(payload) {
        let obj = null;
        try {
            let result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `insert mouvementstock set fkStock=${payload.fkStock},article=${payload.article},fkArticle=${payload.fkArticle},fkFournisseur=${payload.fkFournisseur},fkClient=${payload.fkClient},type_mouvement=${payload.typeMouvement},prix_unitaire_mouvement=${payload.prix_unitaire_mouvement},quantite=${payload.quantite},dateFab=${payload.dateFab},dateExp=${payload.dateExp},dateCreate=${new Date()},fkAgent = ${payload.fkAgent},agent=${payload.agent},
        agence=${payload.agence},fkAgence=${payload.fkAgence}`);
            result = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from mouvementstock order by id desc limit 1`);
            obj = mouvementStock_1.MouvementStockModel.fromEntity(result[0]);
            app_utilities_1.AppUtilities.controlValueNumber(obj.id, "Echec lors de l'insertion de l'article");
            if (obj != null) {
                let stock = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from stockarticle  where code=${payload.fkStock}`);
                app_utilities_1.AppUtilities.controlValueString(stock[0].code, "Il n'existe pas de stock pour cet article");
                if (payload.typeMouvement == constant_1.TypeMouvement.ENTREE) {
                    let quantite = Number(stock[0].quantite) + Number(payload.quantite);
                    result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update stockarticle  set quantite=${quantite} where code=${payload.fkStock}`);
                }
                else {
                    let quantite = Number(stock[0].quantite) - Number(payload.quantite);
                    result = await DaoStockService_1.instance().$executeRaw(client_1.Prisma.sql `update stockarticle  set quantite=${quantite} where code=${payload.fkStock} and quantite>${quantite}`);
                }
            }
        }
        catch (error) {
            console.log(error);
            payload.id = null;
        }
        return obj;
    }
    async getMouvementStockByTypeMouvement(fkAgence, type_mouvement, debut, fin) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from mouvementstock where fkAgence=${fkAgence} and type_mouvement=${type_mouvement} and (Date(dateCreate)>=${debut} and Date(dateCreate)<=${fin}) order by id DESC`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getMouvementStockByTypeMouvementGroupedByArticle(fkAgence, type_mouvement, debut, fin) {
        let datas = [];
        try {
            console.log("Debut");
            console.log(debut);
            console.log("Fin");
            console.log(fin);
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select article,sum(quantite) as quantite from mouvementstock where fkAgence=${fkAgence} and type_mouvement=${type_mouvement} and (dateCreate>=${debut} and dateCreate<=${fin}) group by article  order by article  ASC`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getMouvementStockByArticle(article) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from mouvementstock where fkArticle=${article} order by id DESC`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
    async getMouvementStockByTypeMouvementAndArticle(article, type_mouvement) {
        let datas = [];
        try {
            datas = await DaoStockService_1.instance().$queryRaw(client_1.Prisma.sql `select * from mouvementstock where fkArticle=${article} and type_mouvement=${type_mouvement} order by id DESC`);
        }
        catch (error) {
            console.log(error);
        }
        return datas;
    }
};
DaoStockService = DaoStockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DaoStockService);
exports.DaoStockService = DaoStockService;
//# sourceMappingURL=dao.stock.service.js.map