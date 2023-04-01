"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailVenteModel = void 0;
class DetailVenteModel {
    static fromEntity(snapshot) {
        let obj = new DetailVenteModel();
        obj.id = snapshot.id;
        obj.fkVente = snapshot.fkVente;
        obj.article = snapshot.article;
        obj.fkArticle = snapshot.fkArticle;
        obj.quantite = Number(snapshot.quantite);
        obj.prix_unitaire = Number(snapshot.prix_unitaire);
        return obj;
    }
}
exports.DetailVenteModel = DetailVenteModel;
//# sourceMappingURL=detailVente.js.map