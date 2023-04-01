"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailFactureRestaurentModel = void 0;
class DetailFactureRestaurentModel {
    static fromEntity(snapshot) {
        let obj = new DetailFactureRestaurentModel();
        obj.id = snapshot.id;
        obj.fkFactureRestaurent = snapshot.fkFactureRestaurent;
        obj.article = snapshot.article;
        obj.fkArticle = snapshot.fkArticle;
        obj.quantite = Number(snapshot.quantite);
        obj.prix_unitaire = Number(snapshot.prix_unitaire);
        return obj;
    }
}
exports.DetailFactureRestaurentModel = DetailFactureRestaurentModel;
//# sourceMappingURL=detailFactureRestaurent.js.map