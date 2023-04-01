"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockArticleModel = void 0;
class StockArticleModel {
    static fromEntity(snapshot) {
        const obj = new StockArticleModel();
        obj.code = snapshot.code;
        obj.article = snapshot.article;
        obj.fkArticle = snapshot.fkArticle;
        obj.quantite = Number(snapshot.quantite);
        obj.seuil = Number(snapshot.seuil);
        obj.dateCreate = snapshot.dateCreate;
        obj.status = snapshot.status;
        obj.fkAgent = snapshot.fkAgent;
        return obj;
    }
}
exports.StockArticleModel = StockArticleModel;
//# sourceMappingURL=stockArticle.js.map