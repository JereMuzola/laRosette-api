"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
class ArticleModel {
    static fromEntity(snapshot) {
        const obj = new ArticleModel();
        obj.code = snapshot.code;
        obj.designation = snapshot.designation;
        obj.description = snapshot.description;
        obj.isArticle = snapshot.isArticle;
        obj.isDisponible = snapshot.isDisponible;
        obj.type = snapshot.type;
        obj.prix_unitaire_vente = Number(snapshot.prix_unitaire_vente);
        obj.status = snapshot.status;
        obj.dateCreate = snapshot.dateCreate;
        obj.fkAgent = snapshot.fkAgent;
        obj.agence = snapshot.agence;
        obj.devise = snapshot.devise;
        snapshot.stockArticle ? obj.stockArticle = snapshot.stockArticle : obj.stockArticle = null;
        obj.fkDevise = snapshot.fkDevise;
        obj.isCompose = snapshot.isCompose;
        obj.fkAgence = snapshot.fkAgence;
        return obj;
    }
}
exports.ArticleModel = ArticleModel;
//# sourceMappingURL=article.js.map